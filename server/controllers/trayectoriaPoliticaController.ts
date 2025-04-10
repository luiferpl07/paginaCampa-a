import { NextFunction, Request, Response } from 'express';
import { PrismaClient, TrayectoriaPolitica } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all trayectorias políticas
export const getAllTrayectoriasPoliticas = async (req: Request, res: Response<TrayectoriaPolitica[] | ErrorResponse>) => {
  try {
    const trayectorias = await prisma.trayectoriaPolitica.findMany({
      orderBy: {
        orden: 'asc'
      }
    });
    res.json(trayectorias);
  } catch (error: any) {
    console.error('Error getting trayectorias políticas:', error);
    res.status(500).json({ message: 'Error al obtener trayectorias políticas', error: error.message });
  }
};

// Get trayectoria política by ID
export const getTrayectoriaPoliticaById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.trayectoriaPolitica.findUnique({
      where: { id: Number(id) }
    })
    .then(trayectoria => {    
    if (!trayectoria) {
      return res.status(404).json({ message: 'Trayectoria política no encontrada' });
    }
    
    return res.json(trayectoria);
  })
  } catch (error: any) {
    console.error('Error getting trayectoria política by ID:', error);
    res.status(500).json({ message: 'Error al obtener trayectoria política', error: error.message });
  }
};

// Create new trayectoria política
export const createTrayectoriaPolitica = async (req: Request, res: Response<TrayectoriaPolitica | ErrorResponse>) => {
  try {
    const { cargo, institucion, descripcion, fechaInicio, fechaFin, imagenUrl, orden } = req.body;
    
    const newTrayectoria = await prisma.trayectoriaPolitica.create({
      data: {
        cargo,
        institucion,
        descripcion,
        fechaInicio: new Date(fechaInicio),
        fechaFin: fechaFin ? new Date(fechaFin) : null,
        imagenUrl,
        orden
      }
    });
    
    res.status(201).json(newTrayectoria);
  } catch (error: any) {
    console.error('Error creating trayectoria política:', error);
    res.status(500).json({ message: 'Error al crear trayectoria política', error: error.message });
  }
};

// Update trayectoria política
export const updateTrayectoriaPolitica = async (req: Request, res: Response<TrayectoriaPolitica | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { cargo, institucion, descripcion, fechaInicio, fechaFin, imagenUrl, orden } = req.body;
    
    const updatedTrayectoria = await prisma.trayectoriaPolitica.update({
      where: { id: Number(id) },
      data: {
        cargo,
        institucion,
        descripcion,
        fechaInicio: new Date(fechaInicio),
        fechaFin: fechaFin ? new Date(fechaFin) : null,
        imagenUrl,
        orden
      }
    });
    
    res.json(updatedTrayectoria);
  } catch (error: any) {
    console.error('Error updating trayectoria política:', error);
    res.status(500).json({ message: 'Error al actualizar trayectoria política', error: error.message });
  }
};

// Delete trayectoria política
export const deleteTrayectoriaPolitica = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.trayectoriaPolitica.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Trayectoria política eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting trayectoria política:', error);
    res.status(500).json({ message: 'Error al eliminar trayectoria política', error: error.message });
  }
};
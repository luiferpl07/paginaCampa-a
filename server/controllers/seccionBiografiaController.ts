import { NextFunction, Request, Response } from 'express';
import { PrismaClient, SeccionBiografia } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all secciones de biografía
export const getAllSeccionesBiografia = async (req: Request, res: Response<SeccionBiografia[] | ErrorResponse>) => {
  try {
    const secciones = await prisma.seccionBiografia.findMany({
      include: {
        historias: true
      },
      orderBy: {
        orden: 'asc'
      }
    });
    res.json(secciones);
  } catch (error: any) {
    console.error('Error getting secciones de biografía:', error);
    res.status(500).json({ message: 'Error al obtener secciones de biografía', error: error.message });
  }
};

// Get seccion biografia by ID
export const getSeccionBiografiaById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.seccionBiografia.findUnique({
      where: { id: Number(id) },
      include: {
        historias: {
          orderBy: {
            orden: 'asc'
          }
        }
      }
    })
    .then(seccion =>{    
    if (!seccion) {
      return res.status(404).json({ message: 'Sección de biografía no encontrada' });
    }
    
    return res.json(seccion);
})
  } catch (error: any) {
    console.error('Error getting seccion biografia by ID:', error);
    res.status(500).json({ message: 'Error al obtener sección de biografía', error: error.message });
  }
};

// Create new seccion biografia
export const createSeccionBiografia = async (req: Request, res: Response<SeccionBiografia | ErrorResponse>) => {
  try {
    const { titulo, descripcion, orden } = req.body;
    
    const newSeccion = await prisma.seccionBiografia.create({
      data: {
        titulo,
        descripcion,
        orden
      }
    });
    
    res.status(201).json(newSeccion);
  } catch (error: any) {
    console.error('Error creating seccion biografia:', error);
    res.status(500).json({ message: 'Error al crear sección de biografía', error: error.message });
  }
};

// Update seccion biografia
export const updateSeccionBiografia = async (req: Request, res: Response<SeccionBiografia | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, orden } = req.body;
    
    const updatedSeccion = await prisma.seccionBiografia.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descripcion,
        orden
      }
    });
    
    res.json(updatedSeccion);
  } catch (error: any) {
    console.error('Error updating seccion biografia:', error);
    res.status(500).json({ message: 'Error al actualizar sección de biografía', error: error.message });
  }
};

// Delete seccion biografia
export const deleteSeccionBiografia = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.seccionBiografia.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Sección de biografía eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting seccion biografia:', error);
    res.status(500).json({ message: 'Error al eliminar sección de biografía', error: error.message });
  }
};
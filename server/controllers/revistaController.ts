import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Revista } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all revistas
export const getAllRevistas = async (req: Request, res: Response<Revista[] | ErrorResponse>) => {
  try {
    const revistas = await prisma.revista.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(revistas);
  } catch (error: any) {
    console.error('Error getting revistas:', error);
    res.status(500).json({ message: 'Error al obtener revistas', error: error.message });
  }
};

// Get revista by ID
export const getRevistaById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.revista.findUnique({
      where: { id: Number(id) }
    })
    .then(revista =>{    
    if (!revista) {
      return res.status(404).json({ message: 'Revista no encontrada' });
    }
    
    return res.json(revista);
})
  } catch (error: any) {
    console.error('Error getting revista by ID:', error);
    res.status(500).json({ message: 'Error al obtener revista', error: error.message });
  }
};

// Create new revista
export const createRevista = async (req: Request, res: Response<Revista | ErrorResponse>) => {
  try {
    const { titulo, edicion, portadaUrl, archivoUrl, fecha } = req.body;
    
    const newRevista = await prisma.revista.create({
      data: {
        titulo,
        edicion,
        portadaUrl,
        archivoUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newRevista);
  } catch (error: any) {
    console.error('Error creating revista:', error);
    res.status(500).json({ message: 'Error al crear revista', error: error.message });
  }
};

// Update revista
export const updateRevista = async (req: Request, res: Response<Revista | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, edicion, portadaUrl, archivoUrl, fecha } = req.body;
    
    const updatedRevista = await prisma.revista.update({
      where: { id: Number(id) },
      data: {
        titulo,
        edicion,
        portadaUrl,
        archivoUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedRevista);
  } catch (error: any) {
    console.error('Error updating revista:', error);
    res.status(500).json({ message: 'Error al actualizar revista', error: error.message });
  }
};

// Delete revista
export const deleteRevista = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.revista.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Revista eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting revista:', error);
    res.status(500).json({ message: 'Error al eliminar revista', error: error.message });
  }
};
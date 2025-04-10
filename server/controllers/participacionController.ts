import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Participacion } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all participaciones
export const getAllParticipaciones = async (req: Request, res: Response<Participacion[] | ErrorResponse>) => {
  try {
    const participaciones = await prisma.participacion.findMany();
    res.json(participaciones);
  } catch (error: any) {
    console.error('Error getting participaciones:', error);
    res.status(500).json({ message: 'Error al obtener participaciones', error: error.message });
  }
};

// Get participacion by ID
export const getParticipacionById =( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.participacion.findUnique({
      where: { id: Number(id) }
    })
    .then(participacion => {
    if (!participacion) {
      return res.status(404).json({ message: 'Participación no encontrada' });
    }
    
    res.json(participacion);
  })
  } catch (error: any) {
    console.error('Error getting participacion by ID:', error);
    res.status(500).json({ message: 'Error al obtener participación', error: error.message });
  }
};

// Create new participacion
export const createParticipacion = async (req: Request, res: Response<Participacion | ErrorResponse>) => {
  try {
    const { titulo, descripcion, iconoNombre } = req.body;
    
    const newParticipacion = await prisma.participacion.create({
      data: {
        titulo,
        descripcion,
        iconoNombre
      }
    });
    
    res.status(201).json(newParticipacion);
  } catch (error: any) {
    console.error('Error creating participacion:', error);
    res.status(500).json({ message: 'Error al crear participación', error: error.message });
  }
};

// Update participacion
export const updateParticipacion = async (req: Request, res: Response<Participacion | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, iconoNombre } = req.body;
    
    const updatedParticipacion = await prisma.participacion.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descripcion,
        iconoNombre
      }
    });
    
    res.json(updatedParticipacion);
  } catch (error: any) {
    console.error('Error updating participacion:', error);
    res.status(500).json({ message: 'Error al actualizar participación', error: error.message });
  }
};

// Delete participacion
export const deleteParticipacion = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.participacion.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Participación eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting participacion:', error);
    res.status(500).json({ message: 'Error al eliminar participación', error: error.message });
  }
};
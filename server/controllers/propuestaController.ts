import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Propuesta } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all propuestas
export const getAllPropuestas = async (req: Request, res: Response<Propuesta[] | ErrorResponse>) => {
  try {
    const propuestas = await prisma.propuesta.findMany();
    res.json(propuestas);
  } catch (error: any) {
    console.error('Error getting propuestas:', error);
    res.status(500).json({ message: 'Error al obtener propuestas', error: error.message });
  }
};

// Get propuesta by ID
export const getPropuestaById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.propuesta.findUnique({
      where: { id: Number(id) }
    })
    .then(propuesta =>{    
    if (!propuesta) {
      return res.status(404).json({ message: 'Propuesta no encontrada' });
    }
    
    return res.json(propuesta);
    })
  } catch (error: any) {
    console.error('Error getting propuesta by ID:', error);
    res.status(500).json({ message: 'Error al obtener propuesta', error: error.message });
  }
};

// Create new propuesta
export const createPropuesta = async (req: Request, res: Response<Propuesta | ErrorResponse>) => {
  try {
    const { titulo, descripcion, iconoNombre } = req.body;
    
    const newPropuesta = await prisma.propuesta.create({
      data: {
        titulo,
        descripcion,
        iconoNombre
      }
    });
    
    res.status(201).json(newPropuesta);
  } catch (error: any) {
    console.error('Error creating propuesta:', error);
    res.status(500).json({ message: 'Error al crear propuesta', error: error.message });
  }
};

// Update propuesta
export const updatePropuesta = async (req: Request, res: Response<Propuesta | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, iconoNombre } = req.body;
    
    const updatedPropuesta = await prisma.propuesta.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descripcion,
        iconoNombre
      }
    });
    
    res.json(updatedPropuesta);
  } catch (error: any) {
    console.error('Error updating propuesta:', error);
    res.status(500).json({ message: 'Error al actualizar propuesta', error: error.message });
  }
};

// Delete propuesta
export const deletePropuesta = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.propuesta.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Propuesta eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting propuesta:', error);
    res.status(500).json({ message: 'Error al eliminar propuesta', error: error.message });
  }
};
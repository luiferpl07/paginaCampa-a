import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Relato } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all relatos
export const getAllRelatos = async (req: Request, res: Response<Relato[] | ErrorResponse>) => {
  try {
    const relatos = await prisma.relato.findMany();
    res.json(relatos);
  } catch (error: any) {
    console.error('Error getting relatos:', error);
    res.status(500).json({ message: 'Error al obtener relatos', error: error.message });
  }
};

// Get relato by ID
export const getRelatoById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.relato.findUnique({
      where: { id: Number(id) }
    })
    .then(relato => {    
    if (!relato) {
      return res.status(404).json({ message: 'Relato no encontrado' });
    }
    
    return res.json(relato);
  })
  } catch (error: any) {
    console.error('Error getting relato by ID:', error);
    res.status(500).json({ message: 'Error al obtener relato', error: error.message });
  }
};

// Create new relato
export const createRelato = async (req: Request, res: Response<Relato | ErrorResponse>) => {
  try {
    const { nombre, ocupacion, testimonio, imagenUrl } = req.body;
    
    const newRelato = await prisma.relato.create({
      data: {
        nombre,
        ocupacion,
        testimonio,
        imagenUrl
      }
    });
    
    res.status(201).json(newRelato);
  } catch (error: any) {
    console.error('Error creating relato:', error);
    res.status(500).json({ message: 'Error al crear relato', error: error.message });
  }
};

// Update relato
export const updateRelato = async (req: Request, res: Response<Relato | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { nombre, ocupacion, testimonio, imagenUrl } = req.body;
    
    const updatedRelato = await prisma.relato.update({
      where: { id: Number(id) },
      data: {
        nombre,
        ocupacion,
        testimonio,
        imagenUrl
      }
    });
    
    res.json(updatedRelato);
  } catch (error: any) {
    console.error('Error updating relato:', error);
    res.status(500).json({ message: 'Error al actualizar relato', error: error.message });
  }
};

// Delete relato
export const deleteRelato = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.relato.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Relato eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting relato:', error);
    res.status(500).json({ message: 'Error al eliminar relato', error: error.message });
  }
};
import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Perfil } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all perfiles
export const getAllPerfiles = async (req: Request, res: Response<Perfil[] | ErrorResponse>) => {
  try {
    const perfiles = await prisma.perfil.findMany();
    res.json(perfiles);
  } catch (error: any) {
    console.error('Error getting perfiles:', error);
    res.status(500).json({ message: 'Error al obtener perfiles', error: error.message });
  }
};

// Get perfil by ID
export const getPerfilById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.perfil.findUnique({
      where: { id: Number(id) }
    })
    .then(perfil =>{ 
    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    
    return res.json(perfil);
  })
  } catch (error: any) {
    console.error('Error getting perfil by ID:', error);
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

// Create new perfil
export const createPerfil = async (req: Request, res: Response<Perfil | ErrorResponse>) => {
  try {
    const { titulo, subtitulo, descripcion, fechaInicio, fechaFin } = req.body;
    
    const newPerfil = await prisma.perfil.create({
      data: {
        titulo,
        subtitulo,
        descripcion,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin)
      }
    });
    
    res.status(201).json(newPerfil);
  } catch (error: any) {
    console.error('Error creating perfil:', error);
    res.status(500).json({ message: 'Error al crear perfil', error: error.message });
  }
};

// Update perfil
export const updatePerfil = async (req: Request, res: Response<Perfil | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, subtitulo, descripcion, fechaInicio, fechaFin } = req.body;
    
    const updatedPerfil = await prisma.perfil.update({
      where: { id: Number(id) },
      data: {
        titulo,
        subtitulo,
        descripcion,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin)
      }
    });
    
    res.json(updatedPerfil);
  } catch (error: any) {
    console.error('Error updating perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
};

// Delete perfil
export const deletePerfil = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.perfil.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Perfil eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting perfil:', error);
    res.status(500).json({ message: 'Error al eliminar perfil', error: error.message });
  }
};
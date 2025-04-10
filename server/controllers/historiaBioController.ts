import { NextFunction, Request, Response } from 'express';
import { PrismaClient, HistoriaBio } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all historias
export const getAllHistoriasBio = async (req: Request, res: Response<HistoriaBio[] | ErrorResponse>) => {
  try {
    const historias = await prisma.historiaBio.findMany({
      include: {
        seccion: true
      },
      orderBy: {
        orden: 'asc'
      }
    });
    res.json(historias);
  } catch (error: any) {
    console.error('Error getting historias bio:', error);
    res.status(500).json({ message: 'Error al obtener historias biográficas', error: error.message });
  }
};

// Get historia by ID
export const getHistoriaBioById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.historiaBio.findUnique({
      where: { id: Number(id) },
      include: {
        seccion: true
      }
    })
    .then(historia =>{    
    if (!historia) {
      return res.status(404).json({ message: 'Historia biográfica no encontrada' });
    }
    
    return res.json(historia);
    })
  } catch (error: any) {
    console.error('Error getting historia bio by ID:', error);
    res.status(500).json({ message: 'Error al obtener historia biográfica', error: error.message });
  }
};

// Get historias by seccion ID
export const getHistoriasBySeccionId = async (req: Request, res: Response<HistoriaBio[] | ErrorResponse>) => {
  try {
    const { seccionId } = req.params;
    const historias = await prisma.historiaBio.findMany({
      where: {
        seccionId: Number(seccionId)
      },
      orderBy: {
        orden: 'asc'
      }
    });
    
    res.json(historias);
  } catch (error: any) {
    console.error('Error getting historias by seccion ID:', error);
    res.status(500).json({ message: 'Error al obtener historias por sección', error: error.message });
  }
};

// Create new historia bio
export const createHistoriaBio = async (req: Request, res: Response<HistoriaBio | ErrorResponse>) => {
  try {
    const { titulo, contenido, imagenUrl, fecha, orden, seccionId } = req.body;
    
    const newHistoria = await prisma.historiaBio.create({
      data: {
        titulo,
        contenido,
        imagenUrl,
        fecha: fecha ? new Date(fecha) : null,
        orden,
        seccionId: Number(seccionId)
      }
    });
    
    res.status(201).json(newHistoria);
  } catch (error: any) {
    console.error('Error creating historia bio:', error);
    res.status(500).json({ message: 'Error al crear historia biográfica', error: error.message });
  }
};

// Update historia bio
export const updateHistoriaBio = async (req: Request, res: Response<HistoriaBio | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, imagenUrl, fecha, orden, seccionId } = req.body;
    
    const updatedHistoria = await prisma.historiaBio.update({
      where: { id: Number(id) },
      data: {
        titulo,
        contenido,
        imagenUrl,
        fecha: fecha ? new Date(fecha) : null,
        orden,
        seccionId: Number(seccionId)
      }
    });
    
    res.json(updatedHistoria);
  } catch (error: any) {
    console.error('Error updating historia bio:', error);
    res.status(500).json({ message: 'Error al actualizar historia biográfica', error: error.message });
  }
};

// Delete historia bio
export const deleteHistoriaBio = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.historiaBio.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Historia biográfica eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting historia bio:', error);
    res.status(500).json({ message: 'Error al eliminar historia biográfica', error: error.message });
  }
};
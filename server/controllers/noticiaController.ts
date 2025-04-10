import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Noticia } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all noticias
export const getAllNoticias = async (req: Request, res: Response<Noticia[] | ErrorResponse>) => {
  try {
    const noticias = await prisma.noticia.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(noticias);
  } catch (error: any) {
    console.error('Error getting noticias:', error);
    res.status(500).json({ message: 'Error al obtener noticias', error: error.message });
  }
};

// Get noticia by ID
export const getNoticiaById =( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.noticia.findUnique({
      where: { id: Number(id) }
    })
    .then (noticia =>{    
    if (!noticia) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    
    return res.json(noticia);
  })
  } catch (error: any) {
    console.error('Error getting noticia by ID:', error);
    res.status(500).json({ message: 'Error al obtener noticia', error: error.message });
  }
};

// Create new noticia
export const createNoticia = async (req: Request, res: Response<Noticia | ErrorResponse>) => {
  try {
    const { titulo, resumen, contenido, imagenUrl, fecha } = req.body;
    
    const newNoticia = await prisma.noticia.create({
      data: {
        titulo,
        resumen,
        contenido,
        imagenUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newNoticia);
  } catch (error: any) {
    console.error('Error creating noticia:', error);
    res.status(500).json({ message: 'Error al crear noticia', error: error.message });
  }
};

// Update noticia
export const updateNoticia = async (req: Request, res: Response<Noticia | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, resumen, contenido, imagenUrl, fecha } = req.body;
    
    const updatedNoticia = await prisma.noticia.update({
      where: { id: Number(id) },
      data: {
        titulo,
        resumen,
        contenido,
        imagenUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedNoticia);
  } catch (error: any) {
    console.error('Error updating noticia:', error);
    res.status(500).json({ message: 'Error al actualizar noticia', error: error.message });
  }
};

// Delete noticia
export const deleteNoticia = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.noticia.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Noticia eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting noticia:', error);
    res.status(500).json({ message: 'Error al eliminar noticia', error: error.message });
  }
};
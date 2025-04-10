import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Podcast } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all podcasts
export const getAllPodcasts = async (req: Request, res: Response<Podcast[] | ErrorResponse>) => {
  try {
    const podcasts = await prisma.podcast.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(podcasts);
  } catch (error: any) {
    console.error('Error getting podcasts:', error);
    res.status(500).json({ message: 'Error al obtener podcasts', error: error.message });
  }
};

// Get podcast by ID
export const getPodcastById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.podcast.findUnique({
      where: { id: Number(id) }
    })
    .then(podcast => {    
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast no encontrado' });
    }
    
    return res.json(podcast);
  })
  } catch (error: any) {
    console.error('Error getting podcast by ID:', error);
    res.status(500).json({ message: 'Error al obtener podcast', error: error.message });
  }
};

// Create new podcast
export const createPodcast = async (req: Request, res: Response<Podcast | ErrorResponse>) => {
  try {
    const { titulo, spotifyUrl, fecha } = req.body;
    
    const newPodcast = await prisma.podcast.create({
      data: {
        titulo,
        spotifyUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newPodcast);
  } catch (error: any) {
    console.error('Error creating podcast:', error);
    res.status(500).json({ message: 'Error al crear podcast', error: error.message });
  }
};

// Update podcast
export const updatePodcast = async (req: Request, res: Response<Podcast | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, spotifyUrl, fecha } = req.body;
    
    const updatedPodcast = await prisma.podcast.update({
      where: { id: Number(id) },
      data: {
        titulo,
        spotifyUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedPodcast);
  } catch (error: any) {
    console.error('Error updating podcast:', error);
    res.status(500).json({ message: 'Error al actualizar podcast', error: error.message });
  }
};

// Delete podcast
export const deletePodcast = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.podcast.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Podcast eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting podcast:', error);
    res.status(500).json({ message: 'Error al eliminar podcast', error: error.message });
  }
};
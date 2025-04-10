import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Video } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all videos
export const getAllVideos = async (req: Request, res: Response<Video[] | ErrorResponse>) => {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(videos);
  } catch (error: any) {
    console.error('Error getting videos:', error);
    res.status(500).json({ message: 'Error al obtener videos', error: error.message });
  }
};

// Get video by ID
export const getVideoById =  ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.video.findUnique({
      where: { id: Number(id) }
    })
    .then(video => {    
    if (!video) {
      return res.status(404).json({ message: 'Video no encontrado' });
    }
    
    return res.json(video);
})
  } catch (error: any) {
    console.error('Error getting video by ID:', error);
    res.status(500).json({ message: 'Error al obtener video', error: error.message });
  }
};

// Create new video
export const createVideo = async (req: Request, res: Response<Video | ErrorResponse>) => {
  try {
    const { titulo, youtubeUrl, thumbnail, fecha } = req.body;
    
    const newVideo = await prisma.video.create({
      data: {
        titulo,
        youtubeUrl,
        thumbnail,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newVideo);
  } catch (error: any) {
    console.error('Error creating video:', error);
    res.status(500).json({ message: 'Error al crear video', error: error.message });
  }
};

// Update video
export const updateVideo = async (req: Request, res: Response<Video | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, youtubeUrl, thumbnail, fecha } = req.body;
    
    const updatedVideo = await prisma.video.update({
      where: { id: Number(id) },
      data: {
        titulo,
        youtubeUrl,
        thumbnail,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedVideo);
  } catch (error: any) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Error al actualizar video', error: error.message });
  }
};

// Delete video
export const deleteVideo = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.video.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Video eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error al eliminar video', error: error.message });
  }
};
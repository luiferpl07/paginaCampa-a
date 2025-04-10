import { Request, Response, NextFunction  } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define los tipos que necesitamos
interface ErrorResponse {
  message: string;
  error?: string;
}

// Get all banners
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const banners = await prisma.bannerPrincipal.findMany();
    res.json(banners);
  } catch (error: any) {
    console.error('Error getting banners:', error);
    res.status(500).json({ message: 'Error al obtener banners', error: error.message });
  }
};

// Get banner by ID
export const getBannerById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    prisma.bannerPrincipal.findUnique({
      where: { id: Number(id) }
    })
    .then(banner => {
      if (!banner) {
        return res.status(404).json({ message: 'Banner no encontrado' });
      }
      return res.json(banner);
    })
    .catch(error => {
      console.error('Error getting banner by ID:', error);
      res.status(500).json({ message: 'Error al obtener banner', error: error.message });
    });
  } catch (error: any) {
    console.error('Error getting banner by ID:', error);
    res.status(500).json({ message: 'Error al obtener banner', error: error.message });
  }
};

// Create new banner
export const createBanner = async (req: Request, res: Response) => {
  try {
    const { titulo, subtitulo, imagenUrl, textoBoton, enlaceBoton } = req.body;
    
    const newBanner = await prisma.bannerPrincipal.create({
      data: {
        titulo,
        subtitulo,
        imagenUrl,
      
      }
    });
    
    res.status(201).json(newBanner);
  } catch (error: any) {
    console.error('Error creating banner:', error);
    res.status(500).json({ message: 'Error al crear banner', error: error.message });
  }
};

// Update banner
export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, subtitulo, imagenUrl, textoBoton, enlaceBoton } = req.body;
    
    const updatedBanner = await prisma.bannerPrincipal.update({
      where: { id: Number(id) },
      data: {
        titulo,
        subtitulo,
        imagenUrl,
       
      }
    });
    
    res.json(updatedBanner);
  } catch (error: any) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Error al actualizar banner', error: error.message });
  }
};

// Delete banner
export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.bannerPrincipal.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Banner eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Error al eliminar banner', error: error.message });
  }
};
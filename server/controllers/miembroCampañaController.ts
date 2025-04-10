import { NextFunction, Request, Response } from 'express';
import { PrismaClient, MiembroCampaña } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all miembros
export const getAllMiembros = async (req: Request, res: Response<MiembroCampaña[] | ErrorResponse>) => {
  try {
    const miembros = await prisma.miembroCampaña.findMany({
      orderBy: {
        orden: 'asc'
      }
    });
    res.json(miembros);
  } catch (error: any) {
    console.error('Error getting miembros:', error);
    res.status(500).json({ message: 'Error al obtener miembros', error: error.message });
  }
};

// Get miembro by ID
export const getMiembroById =( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.miembroCampaña.findUnique({
      where: { id: Number(id) }
    })
    .then(miembro =>{    
    if (!miembro) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    
    return res.json(miembro);
})
  } catch (error: any) {
    console.error('Error getting miembro by ID:', error);
    res.status(500).json({ message: 'Error al obtener miembro', error: error.message });
  }
};

// Create new miembro
export const createMiembro = async (req: Request, res: Response<MiembroCampaña | ErrorResponse>) => {
  try {
    const { 
      nombre, 
      cargo, 
      area, 
      fotoUrl, 
      facebook, 
      instagram, 
      x, 
      tiktok, 
      youtube, 
      whatsapp, 
      orden 
    } = req.body;
    
    const newMiembro = await prisma.miembroCampaña.create({
      data: {
        nombre,
        cargo,
        area,
        fotoUrl,
        facebook,
        instagram,
        x,
        tiktok,
        youtube,
        whatsapp,
        orden
      }
    });
    
    res.status(201).json(newMiembro);
  } catch (error: any) {
    console.error('Error creating miembro:', error);
    res.status(500).json({ message: 'Error al crear miembro', error: error.message });
  }
};

// Update miembro
export const updateMiembro = async (req: Request, res: Response<MiembroCampaña | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { 
      nombre, 
      cargo, 
      area, 
      fotoUrl, 
      facebook, 
      instagram, 
      x, 
      tiktok, 
      youtube, 
      whatsapp, 
      orden 
    } = req.body;
    
    const updatedMiembro = await prisma.miembroCampaña.update({
      where: { id: Number(id) },
      data: {
        nombre,
        cargo,
        area,
        fotoUrl,
        facebook,
        instagram,
        x,
        tiktok,
        youtube,
        whatsapp,
        orden
      }
    });
    
    res.json(updatedMiembro);
  } catch (error: any) {
    console.error('Error updating miembro:', error);
    res.status(500).json({ message: 'Error al actualizar miembro', error: error.message });
  }
};

// Delete miembro
export const deleteMiembro = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.miembroCampaña.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Miembro eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting miembro:', error);
    res.status(500).json({ message: 'Error al eliminar miembro', error: error.message });
  }
};

// Get miembros by area
export const getMiembrosByArea = async (req: Request, res: Response<MiembroCampaña[] | ErrorResponse>) => {
  try {
    const { area } = req.params;
    
    const miembros = await prisma.miembroCampaña.findMany({
      where: {
        area: area
      },
      orderBy: {
        orden: 'asc'
      }
    });
    
    res.json(miembros);
  } catch (error: any) {
    console.error('Error getting miembros by area:', error);
    res.status(500).json({ message: 'Error al obtener miembros por área', error: error.message });
  }
};
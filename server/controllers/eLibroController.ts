import { NextFunction, Request, Response } from 'express';
import { PrismaClient, ELibro } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all eLibros
export const getAllELibros = async (req: Request, res: Response<ELibro[] | ErrorResponse>) => {
  try {
    const libros = await prisma.eLibro.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(libros);
  } catch (error: any) {
    console.error('Error getting eLibros:', error);
    res.status(500).json({ message: 'Error al obtener libros electrónicos', error: error.message });
  }
};

// Get eLibro by ID
export const getELibroById = async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.eLibro.findUnique({
      where: { id: Number(id) }
    })
    .then(libro =>{ 
    if (!libro) {
      return res.status(404).json({ message: 'Libro electrónico no encontrado' });
    }
    
    return res.json(libro);
})   
  } catch (error: any) {
    console.error('Error getting eLibro by ID:', error);
    res.status(500).json({ message: 'Error al obtener libro electrónico', error: error.message });
  }
};

// Create new eLibro
export const createELibro = async (req: Request, res: Response<ELibro | ErrorResponse>) => {
  try {
    const { titulo, descripcion, autor, portadaUrl, archivoUrl, fecha } = req.body;
    
    const newLibro = await prisma.eLibro.create({
      data: {
        titulo,
        descripcion,
        autor,
        portadaUrl,
        archivoUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newLibro);
  } catch (error: any) {
    console.error('Error creating eLibro:', error);
    res.status(500).json({ message: 'Error al crear libro electrónico', error: error.message });
  }
};

// Update eLibro
export const updateELibro = async (req: Request, res: Response<ELibro | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, autor, portadaUrl, archivoUrl, fecha } = req.body;
    
    const updatedLibro = await prisma.eLibro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descripcion,
        autor,
        portadaUrl,
        archivoUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedLibro);
  } catch (error: any) {
    console.error('Error updating eLibro:', error);
    res.status(500).json({ message: 'Error al actualizar libro electrónico', error: error.message });
  }
};

// Delete eLibro
export const deleteELibro = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.eLibro.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Libro electrónico eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting eLibro:', error);
    res.status(500).json({ message: 'Error al eliminar libro electrónico', error: error.message });
  }
};
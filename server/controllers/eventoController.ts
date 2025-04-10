import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Evento } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all eventos
export const getAllEventos = async (req: Request, res: Response<Evento[] | ErrorResponse>) => {
  try {
    const eventos = await prisma.evento.findMany();
    res.json(eventos);
  } catch (error: any) {
    console.error('Error getting eventos:', error);
    res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
  }
};

// Get evento by ID
export const getEventoById = ( req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.evento.findUnique({
      where: { id: Number(id) }
    })
    .then(evento =>{
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    return res.json(evento);
})
  } catch (error: any) {
    console.error('Error getting evento by ID:', error);
    res.status(500).json({ message: 'Error al obtener evento', error: error.message });
  }
};

// Create new evento
export const createEvento = async (req: Request, res: Response<Evento | ErrorResponse>) => {
  try {
    const { titulo, fecha, ubicacion, horaInicio, horaFin } = req.body;
    
    const newEvento = await prisma.evento.create({
      data: {
        titulo,
        fecha: new Date(fecha),
        ubicacion,
        horaInicio,
        horaFin
      }
    });
    
    res.status(201).json(newEvento);
  } catch (error: any) {
    console.error('Error creating evento:', error);
    res.status(500).json({ message: 'Error al crear evento', error: error.message });
  }
};

// Update evento
export const updateEvento = async (req: Request, res: Response<Evento | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, fecha, ubicacion, horaInicio, horaFin } = req.body;
    
    const updatedEvento = await prisma.evento.update({
      where: { id: Number(id) },
      data: {
        titulo,
        fecha: new Date(fecha),
        ubicacion,
        horaInicio,
        horaFin
      }
    });
    
    res.json(updatedEvento);
  } catch (error: any) {
    console.error('Error updating evento:', error);
    res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
  }
};

// Delete evento
export const deleteEvento = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.evento.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting evento:', error);
    res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
  }
};
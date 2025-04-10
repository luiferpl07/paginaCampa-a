import { NextFunction, Request, Response } from 'express';
import { PrismaClient, DocumentoPDF } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all documentos PDF
export const getAllDocumentosPDF = async (req: Request, res: Response<DocumentoPDF[] | ErrorResponse>) => {
  try {
    const documentos = await prisma.documentoPDF.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(documentos);
  } catch (error: any) {
    console.error('Error getting documentos PDF:', error);
    res.status(500).json({ message: 'Error al obtener documentos PDF', error: error.message });
  }
};

// Get documento PDF by ID
export const getDocumentoPDFById = (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.documentoPDF.findUnique({
      where: { id: Number(id) }
    })
    .then(documento => {
    if (!documento) {
      return res.status(404).json({ message: 'Documento PDF no encontrado' });
    }
    
    return res.json(documento);
    })
  } catch (error: any) {
    console.error('Error getting documento PDF by ID:', error);
    res.status(500).json({ message: 'Error al obtener documento PDF', error: error.message });
  }
};

// Create new documento PDF
export const createDocumentoPDF = async (req: Request, res: Response<DocumentoPDF | ErrorResponse>) => {
  try {
    const { titulo, descripcion, archivoUrl, fecha } = req.body;
    
    const newDocumento = await prisma.documentoPDF.create({
      data: {
        titulo,
        descripcion,
        archivoUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newDocumento);
  } catch (error: any) {
    console.error('Error creating documento PDF:', error);
    res.status(500).json({ message: 'Error al crear documento PDF', error: error.message });
  }
};

// Update documento PDF
export const updateDocumentoPDF = async (req: Request, res: Response<DocumentoPDF | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, archivoUrl, fecha } = req.body;
    
    const updatedDocumento = await prisma.documentoPDF.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descripcion,
        archivoUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedDocumento);
  } catch (error: any) {
    console.error('Error updating documento PDF:', error);
    res.status(500).json({ message: 'Error al actualizar documento PDF', error: error.message });
  }
};

// Delete documento PDF
export const deleteDocumentoPDF = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.documentoPDF.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Documento PDF eliminado correctamente' });
  } catch (error: any) {
    console.error('Error deleting documento PDF:', error);
    res.status(500).json({ message: 'Error al eliminar documento PDF', error: error.message });
  }
};
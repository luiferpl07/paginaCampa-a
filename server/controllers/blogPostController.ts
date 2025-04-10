import { Request, Response, NextFunction  } from 'express';
import { PrismaClient, BlogPost } from '@prisma/client';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Get all blog posts
export const getAllBlogPosts = async (req: Request, res: Response<BlogPost[] | ErrorResponse>) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(posts);
  } catch (error: any) {
    console.error('Error getting blog posts:', error);
    res.status(500).json({ message: 'Error al obtener publicaciones del blog', error: error.message });
  }
};

// Get blog post by ID
export const getBlogPostById = (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params;
    prisma.blogPost.findUnique({
      where: { id: Number(id) }
    })
    .then(post => {    
    if (!post) {
      return res.status(404).json({ message: 'Publicación del blog no encontrada' });
    }
    
    return res.json(post);
})
  } catch (error: any) {
    console.error('Error getting blog post by ID:', error);
    res.status(500).json({ message: 'Error al obtener publicación del blog', error: error.message });
  }
};

// Create new blog post
export const createBlogPost = async (req: Request, res: Response<BlogPost | ErrorResponse>) => {
  try {
    const { titulo, contenido, autor, imagenUrl, fecha } = req.body;
    
    const newPost = await prisma.blogPost.create({
      data: {
        titulo,
        contenido,
        autor,
        imagenUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.status(201).json(newPost);
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Error al crear publicación del blog', error: error.message });
  }
};

// Update blog post
export const updateBlogPost = async (req: Request, res: Response<BlogPost | ErrorResponse>) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, autor, imagenUrl, fecha } = req.body;
    
    const updatedPost = await prisma.blogPost.update({
      where: { id: Number(id) },
      data: {
        titulo,
        contenido,
        autor,
        imagenUrl,
        fecha: new Date(fecha)
      }
    });
    
    res.json(updatedPost);
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Error al actualizar publicación del blog', error: error.message });
  }
};

// Delete blog post
export const deleteBlogPost = async (req: Request, res: Response<{ message: string } | ErrorResponse>) => {
  try {
    const { id } = req.params;
    
    await prisma.blogPost.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Publicación del blog eliminada correctamente' });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Error al eliminar publicación del blog', error: error.message });
  }
};
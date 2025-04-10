// controllers/dashboardController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interfaces
interface DashboardStats {
  relatos: number;
  propuestas: number;
  perfiles: number;
  participaciones: number;
  banners: number;
  eventos: number;
  biografias: number;
  trayectorias: number;
  noticias: number;
  podcasts: number;
  videos: number;
  blogs: number;
  libros: number;
  revistas: number;
  documentos: number;
  miembros: number;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  date: string;
  model: string;
}

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Using Prisma to get counts from all models
    const [
      relatosCount,
      propuestasCount,
      perfilesCount,
      participacionesCount,
      bannersCount,
      eventosCount,
      biografiasCount,
      trayectoriasCount,
      noticiasCount,
      podcastsCount,
      videosCount,
      blogsCount,
      librosCount,
      revistasCount,
      documentosCount,
      miembrosCount
    ] = await Promise.all([
      prisma.relato.count(),
      prisma.propuesta.count(),
      prisma.perfil.count(),
      prisma.participacion.count(),
      prisma.bannerPrincipal.count(),
      prisma.evento.count(),
      prisma.seccionBiografia.count(),
      prisma.trayectoriaPolitica.count(),
      prisma.noticia.count(),
      prisma.podcast.count(),
      prisma.video.count(),
      prisma.blogPost.count(),
      prisma.eLibro.count(),
      prisma.revista.count(),
      prisma.documentoPDF.count(),
      prisma.miembroCampaña.count()
    ]);

    const stats: DashboardStats = {
      relatos: relatosCount,
      propuestas: propuestasCount,
      perfiles: perfilesCount,
      participaciones: participacionesCount,
      banners: bannersCount,
      eventos: eventosCount,
      biografias: biografiasCount,
      trayectorias: trayectoriasCount,
      noticias: noticiasCount,
      podcasts: podcastsCount,
      videos: videosCount,
      blogs: blogsCount,
      libros: librosCount,
      revistas: revistasCount,
      documentos: documentosCount,
      miembros: miembrosCount
    };

    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas del dashboard:', error);
    res.status(500).json({ 
      error: 'Error al obtener estadísticas del dashboard',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    // Note: For this function, we need an 'activities' table in your schema
    // Since it's not in the provided schema, I'll show a placeholder implementation
    // You'll need to either add an Activities model or modify this to track activities differently
    
    // Example if you had an Activities model:
    // const activities = await prisma.activity.findMany({
    //   orderBy: {
    //     createdAt: 'desc'
    //   },
    //   take: 10,
    //   select: {
    //     id: true,
    //     type: true,
    //     title: true,
    //     createdAt: true,
    //     model: true
    //   }
    // });
    
    // Alternative implementation could combine recent entries from all models
    // For example, combining the most recent entries from different content models

    // Getting recent entries from various models
    const recentRelatos = await prisma.relato.findMany({
      take: 2,
      orderBy: { id: 'desc' },
      select: { id: true, nombre: true }
    });
    
    const recentNoticias = await prisma.noticia.findMany({
      take: 2,
      orderBy: { fecha: 'desc' },
      select: { id: true, titulo: true, fecha: true }
    });
    
    const recentEventos = await prisma.evento.findMany({
      take: 2,
      orderBy: { createdAt: 'desc' },
      select: { id: true, titulo: true, createdAt: true }
    });
    
    const recentBlogs = await prisma.blogPost.findMany({
      take: 2,
      orderBy: { fecha: 'desc' },
      select: { id: true, titulo: true, fecha: true }
    });
    
    const recentVideos = await prisma.video.findMany({
      take: 2,
      orderBy: { fecha: 'desc' },
      select: { id: true, titulo: true, fecha: true }
    });

    // Transform and combine the recent items into a unified activity format
    const activities: Activity[] = [
      ...recentRelatos.map(item => ({
        id: item.id,
        type: 'relato',
        title: item.nombre,
        date: new Date().toISOString(), // You may need to add a createdAt field to your Relato model
        model: 'Relato'
      })),
      ...recentNoticias.map(item => ({
        id: item.id,
        type: 'noticia',
        title: item.titulo,
        date: item.fecha.toISOString(),
        model: 'Noticia'
      })),
      ...recentEventos.map(item => ({
        id: item.id,
        type: 'evento',
        title: item.titulo,
        date: item.createdAt.toISOString(),
        model: 'Evento'
      })),
      ...recentBlogs.map(item => ({
        id: item.id,
        type: 'blog',
        title: item.titulo,
        date: item.fecha.toISOString(),
        model: 'BlogPost'
      })),
      ...recentVideos.map(item => ({
        id: item.id,
        type: 'video',
        title: item.titulo,
        date: item.fecha.toISOString(),
        model: 'Video'
      }))
    ];
    
    // Sort all activities by date (newest first) and limit to 10
    const sortedActivities = activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    res.json(sortedActivities);
  } catch (error) {
    console.error('Error al obtener actividad reciente:', error);
    res.status(500).json({ 
      error: 'Error al obtener actividad reciente',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
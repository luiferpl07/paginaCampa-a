import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import relatoRoutes from './routes/relatoRoutes';
import propuestaRoutes from './routes/propuestaRoutes';
import perfilRoutes from './routes/perfilRoutes';
import participacionRoutes from './routes/participacionRoutes';
import bannerPrincipalRoutes from './routes/bannerPrincipalRoutes';
import eventoRoutes from './routes/eventoRoutes';
import seccionBiografiaRoutes from './routes/seccionBiografiaRoutes';
import historiaBioRoutes from './routes/historiaBioRoutes';
import trayectoriaPoliticaRoutes from './routes/trayectoriaPoliticaRoutes';
import noticiaRoutes from './routes/noticiaRoutes';
import podcastRoutes from './routes/podcastRoutes';
import videoRoutes from './routes/videoRoutes';
import blogPostRoutes from './routes/blogPostRoutes';
import eLibroRoutes from './routes/eLibroRoutes';
import revistaRoutes from './routes/revistaRoutes';
import documentoPDFRoutes from './routes/documentoPDFRoutes';
import miembroCampañaRoutes from './routes/miembroCampañaRoutes';
import uploadRoutes from './routes/uploadRoutes';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://tu-dominio-de-produccion.com' 
    : 'http://localhost:3000',
  credentials: true // Importante para las cookies
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware para parsear JSON
app.use(express.json());


// Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/relatos', relatoRoutes);
app.use('/api/propuestas', propuestaRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/participaciones', participacionRoutes);
app.use('/api/banners', bannerPrincipalRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/biografia/secciones', seccionBiografiaRoutes);
app.use('/api/biografia/historias', historiaBioRoutes);
app.use('/api/trayectoria', trayectoriaPoliticaRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/blogs', blogPostRoutes);
app.use('/api/libros', eLibroRoutes);
app.use('/api/revistas', revistaRoutes);
app.use('/api/documentos', documentoPDFRoutes);
app.use('/api/miembros', miembroCampañaRoutes);
app.use('/api/upload', uploadRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
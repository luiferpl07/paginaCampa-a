// server/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_MAX_AGE = 1 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

// Asegúrate de que la función devuelva void, no Promise<Response | undefined>
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Configurar la cookie HTTP Only
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    // Responder sin incluir el token en el cuerpo (seguridad)
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.nombre,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const logout = (req: Request, res: Response): void => {
  // Eliminar la cookie de autenticación
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  
  res.json({ success: true, message: 'Sesión cerrada correctamente' });
};

export const checkAuth = (req: Request, res: Response): void => {
  // Si el middleware de autenticación permitió llegar aquí, el usuario está autenticado
  res.json({ authenticated: true });
};

export const getMe = (req: Request, res: Response): void => {
  // El middleware de autenticación debe agregar el usuario al request
  // Asumiendo que tienes un middleware que hace esto
  const user = (req as any).user;
  
  if (!user) {
    res.status(401).json({ message: 'No autenticado' });
    return;
  }
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
};
// server/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

// Ajustando el tipo de retorno a void
export const verifyAuth = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Obtener el token de la cookie
    const token = req.cookies.auth_token;
    
    if (!token) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }
    
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    
    if (!user) {
      res.status(401).json({ message: 'Usuario no encontrado' });
      return;
    }
    
    // Agregar el usuario al objeto request para uso posterior
    (req as any).user = {
      id: user.id,
      email: user.email,
      name: user.nombre,
    };
    
    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
import { Request, Response } from 'express'

export const enviarContacto = (req: Request, res: Response) => {
  const { nombre, email, mensaje } = req.body

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' })
  }

  console.log('📩 Nuevo mensaje de contacto:', { nombre, email, mensaje })

  // Aquí podrías hacer algo más: guardar en DB, enviar correo, etc.

  return res.status(200).json({ message: 'Mensaje recibido con éxito' })
}

import express from 'express';
import * as perfilController from '../controllers/perfilController';

const router = express.Router();

// GET all perfiles
router.get('/', perfilController.getAllPerfiles);

// GET perfil by ID
router.get('/:id', perfilController.getPerfilById);

// POST new perfil
router.post('/', perfilController.createPerfil);

// PUT/UPDATE perfil
router.put('/:id', perfilController.updatePerfil);

// DELETE perfil
router.delete('/:id', perfilController.deletePerfil);

export default router;
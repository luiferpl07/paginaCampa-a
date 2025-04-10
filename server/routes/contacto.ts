import { Router } from 'express'
import { enviarContacto } from '../controllers/contactoController'

const router = Router()

router.post('/', enviarContacto)

export default router

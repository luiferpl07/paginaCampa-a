// server/controllers/uploadController.ts
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define different folders based on file type
    let uploadPath = path.join(__dirname, '../../public/uploads');
    
    // Create folders based on file type
    if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'images');
    } else if (file.mimetype === 'application/pdf') {
      uploadPath = path.join(uploadPath, 'pdfs');
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = path.join(uploadPath, 'videos');
    } else if (file.mimetype.startsWith('audio/')) {
      uploadPath = path.join(uploadPath, 'audio');
    } else {
      uploadPath = path.join(uploadPath, 'other');
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with original extension
    const uniqueId = uuidv4();
    const fileExt = path.extname(file.originalname);
    const fileName = `${uniqueId}${fileExt}`;
    cb(null, fileName);
  }
});

// File filter to validate uploads
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Define allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const allowedDocTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
  const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  
  const allowedTypes = [...allowedImageTypes, ...allowedDocTypes, ...allowedVideoTypes, ...allowedAudioTypes];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes, PDF, documentos, videos y audio.'));
  }
};

// Set up multer with size limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  }
});

// Unified upload controller - handles both single and multiple files
export const handleFileUpload = (req: Request, res: Response) => {
  // Check if multiple files are expected
  const isMultiple = req.query.multiple === 'true';
  
  if (isMultiple) {
    const uploadMultiple = upload.array('files', 10); // Allow up to 10 files
    
    uploadMultiple(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
              success: false,
              message: 'Uno o más archivos son demasiado grandes. El tamaño máximo es 50MB por archivo.'
            });
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
              success: false,
              message: 'Se han enviado demasiados archivos. El límite es 10 archivos.'
            });
          }
        }
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No se han proporcionado archivos'
        });
      }
      
      const filesInfo = (req.files as Express.Multer.File[]).map(file => {
        const folderType = file.mimetype.startsWith('image/') ? 'images' : 
                          file.mimetype === 'application/pdf' ? 'pdfs' : 
                          file.mimetype.startsWith('video/') ? 'videos' : 
                          file.mimetype.startsWith('audio/') ? 'audio' : 
                          'other';
        
        return {
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: `/uploads/${folderType}/${file.filename}`
        };
      });
      
      return res.status(200).json({
        success: true,
        message: 'Archivos subidos correctamente',
        files: filesInfo
      });
    });
  } else {
    // Handle single file upload
    const uploadSingle = upload.single('file');
    
    uploadSingle(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
              success: false,
              message: 'El archivo es demasiado grande. El tamaño máximo es 50MB.'
            });
          }
        }
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No se ha proporcionado ningún archivo'
        });
      }
      
      // Create URL path for the file
      const folderType = req.file.mimetype.startsWith('image/') ? 'images' : 
                        req.file.mimetype === 'application/pdf' ? 'pdfs' : 
                        req.file.mimetype.startsWith('video/') ? 'videos' : 
                        req.file.mimetype.startsWith('audio/') ? 'audio' : 
                        'other';
      
      const fileUrl = `/uploads/${folderType}/${req.file.filename}`;
      
      return res.status(200).json({
        success: true,
        message: 'Archivo subido correctamente',
        file: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
        url: fileUrl
      });
    });
  }
};
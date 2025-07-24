import express from 'express';
import multer from 'multer';
import path from 'path';
import { deletePdf, getAllPdfs, sendPdf } from '../Controllers/PdfController.js';

const pdfRouter = express.Router();

// Setup multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads')); // safer absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
pdfRouter.post('/sendPdf', upload.single('file'), sendPdf);
pdfRouter.get('/getAllPdfs', getAllPdfs);
pdfRouter.delete('/:id', deletePdf);

export default pdfRouter;

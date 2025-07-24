import path from 'path';
import fs from 'fs';
import Pdf from '../Models/pdfModel.js';

export const sendPdf = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("PDF Title:", title);
    console.log("Uploaded File Path:", file.path);

    // After successful upload
        const fileUrl = `/uploads/${req.file.filename}`;

        const newPdf = new Pdf({
        title,
        fileUrl: `/uploads/${req.file.filename}` 
        });

    await newPdf.save();

    return res.status(200).json(newPdf);
  } catch (error) {
    console.error("Error in sendPdf controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ createdAt: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ message: 'Unable to fetch PDFs' });
  }
};


//---------- Delete PDF--------
export const deletePdf = async (req, res) => {
  try {
    const pdfId = req.params.id;

    const pdf = await Pdf.findById(pdfId);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Construct absolute file path
    const filePath = path.join(process.cwd(), pdf.fileUrl);

    // Delete file from uploads folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        // You may decide whether to continue or return error here
      }
    });

    // Delete document from DB
    await Pdf.findByIdAndDelete(pdfId);

    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ message: 'Unable to delete PDF' });
  }
};

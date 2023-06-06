// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/Image');

// Configure multer for file uploads
const upload = multer({ dest: 'public/uploads' });

// Upload route
router.post('/', upload.single('image'), async (req, res) => {
  // Get the uploaded image and description from the form data
  const { file, body: { description } } = req;

  // Create a new image instance
  const image = new Image({
    filename: file.filename,
    description,
  });

  try {
    // Save the image to the database
    await image.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

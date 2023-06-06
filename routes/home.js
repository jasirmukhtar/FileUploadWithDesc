// routes/home.js
const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

// Home route
router.get('/', async (req, res) => {
  try {
    // Fetch all images from the database
    const images = await Image.find();
    res.render('home', { images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

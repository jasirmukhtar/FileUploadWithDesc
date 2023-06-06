const express = require('express');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');
const homeRouter = require('./public/upload');
const uploadRouter = require('./public/upload');
const Image = require('./models/Image');
app.set('view engine', 'ejs');
// MongoDB connection URL
const url = 'mongodb://localhost:27017/imageGallery';
// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
// 
app.use(express.json());
// Set up static files
app.use(express.static('public'));

// Routes
app.use('/', homeRouter);
app.use('/upload', uploadRouter);


app.get('/',async (req,res)=>{
    try {
        // Fetch all images from the database
        const images = await Image.find();
        res.render('home', {images });
      } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Internal Server Error');
      }    
})
app.get("/template",(req,res)=>{
res.render("template")
})
app.get('/upload',(req,res)=>{
    res.render('upload')
})
app.get('/images/:imageId', (req, res) => {
  const imageId = req.params.imageId;
  Image.findOne({_id:imageId})
  .then((result) => {
    if (result) {
      res.render('template',{result})
      } else {
      // Object not found
      console.log("Object not found.");
    }
  })
  .catch((error) => {
    console.error(error);
  });


});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary configuration
const path = require('path'); // For handling file paths
const fs = require('fs'); // For reading files

// Array of image file paths to upload

const imagePaths = [
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (1).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (2).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (3).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (4).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (5).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (6).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (7).jpg'),
    path.join(__dirname, '..', 'frontend', 'public', 'images', 'images (8).jpg')
  ];


const uploadImages = async () => {
  try {
    for (const imagePath of imagePaths) { // Fixed variable name from 'images' to 'imagePaths'
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'medix', // Optional: Specify a folder in Cloudinary
      });
      console.log('Uploaded:', result.secure_url); // Log the uploaded image URL
    }
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};

uploadImages();
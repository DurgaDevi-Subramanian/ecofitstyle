const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');

// Create Express app
const app = express();
const port = 5000; // Port for the server

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/donations', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Ensure uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Specify the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to filename
    },
});

const upload = multer({ storage });

// Import Donation model
const Donation = require('./models/Donation');

// Endpoint to handle donations
app.post('/api/donate', upload.array('images'), async (req, res) => {
    const { productName, quantity } = req.body;
    const imagePaths = req.files.map(file => file.path); // Get all uploaded file paths

    try {
        const newDonation = new Donation({
            productName,
            quantity,
            imagePaths,
        });

        await newDonation.save(); // Save to database

        res.status(200).json({ message: 'Donation received successfully!' });
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

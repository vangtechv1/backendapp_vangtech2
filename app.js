const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());


app.get("/", (req, res) => {
    const logMessage = `Welcome message sent to ${req.ip}.`;
    res.send({
        message: "VANGTECH Telkom University",
        author: "https://github.com/typicalsleepingboy",
    });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
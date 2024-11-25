const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');


const app = express();
connectDB();
app.use(express.json());

app.use(cors({
    origin: ['https://backendapp-vangtech2.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get("/", (req, res) => {
    res.send({
        message: "VANGTECH Telkom University",
        author: "https://github.com/vangtechv1",
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
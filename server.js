import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://192.168.3.3:5173'], // Adicione aqui as origens permitidas
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Inclua OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rotas
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API está funcionando!' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});

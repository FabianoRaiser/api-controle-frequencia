import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API está funcionando!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

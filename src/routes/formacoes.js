import express from 'express';
import supabase from '../config/dbConfig.js';

const router = express.Router();

// Buscar todas as formações
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('formacoes')
            .select('*');

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar formação por ID
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('formacoes')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ message: 'Formação não encontrada' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 
import express from 'express';
import supabase from '../config/dbConfig.js';

const router = express.Router();

// Buscar todas as formações
router.get('/', async (req, res) => {
    try {
        console.log("Tentadno buscar formações...");
        const { data, error } = await supabase
            .from('formacoes')
            .select(`
                formacao_id,
                nome_formacao,
                carga_horaria,
                data,
                local,
                modalidade,
                periodo
                `);

        if (error) throw error;
        
        console.log("Formações encotradas:", data?.length || 0);
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
            .select(`
                formacao_id,
                turmas (
                    nome_turma,
                    etapa
                ),
                nome_formacao,
                descricao,
                carga_horaria,
                local,
                data,
                created_at,
                created_by (
                    nome
                ),
                modified_at,
                modified_by (
                    nome
                ),
                periodo,
                modalidade,
                presencas (
                    presenca_id,
                    professores (
                        nome_professor,
                        matricula
                    ),
                    created_at
                )
                `)
            .eq('formacao_id', req.params.id)
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
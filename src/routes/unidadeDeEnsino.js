import express from 'express'
import supabase from '../config/dbConfig.js'

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("Tentando buscar Unidade de Ensino...");
        const { data, error } = await supabase.from("unidade_ensino")
            .select('*');
        
        if(error) {
            console.error("Erro ao buscar Unidades de Ensino", error)
            return res.status(500).json(error);            
        }

        console.log("Unidade Encontradas: ", data.length || 0);
        res.status(200).json(data);
        
    } catch (error) {
        console.error('Erro completo: ', error);
        res.status(500).json({
            error: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
        });
    }
});

export default router;
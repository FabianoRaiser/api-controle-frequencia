import express from "express";
import supabase from "../config/dbConfig.js";

const router = express.Router();

//Insere nova alocação
router.post("/nova-alocacao", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("alocacoes")
      .insert(req.body)
      .single();

    if (error) {
      console.error("Erro ao inserir nova alocação:", error);
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

//Update alocação
router.put("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("alocacoes")
      .update(req.body)
      .eq("id", req.params.id)
      .single();

    if (error) {
      console.error("Erro ao atualizar alocação ", error);
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

//deletar alocação
router.delete("/:id", async (req, res) => {
    try {
        const {data, error} = await supabase
            .from("alocacoes")
            .delete()
            .eq("id", req.params.id);

        if (error) {
            console.error("Erro ao deletar alocacao ", error);
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code, 
        });
    }
});

export default router;

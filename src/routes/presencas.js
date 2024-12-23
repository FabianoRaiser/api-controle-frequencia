import express from "express";
import supabase from "../config/dbConfig.js";
import { getProfessorIdByMatricula } from "../services/professorService.js";

const router = express.Router();

//Insere nova presença
router.post("/nova-presenca", async (req, res) => {
  try {
    const { matricula, formacao_id, data_inicio } = req.body;

    //Busca o id do professor
    const professorData = await getProfessorIdByMatricula(matricula);
    const professor_id = await professorData.professor_id;

    const { data, error } = await supabase
      .from("presencas")
      .insert({
        professor_id,
        formacao_id,
        data_inicio,
      })
      .single();

    if (error) {
      console.error("Erro ao inserir nova presenca:", error);
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

//Insere novas presenças
router.post("/lista-presencas", async (req, res) => {
  try {
    const presencas = [];
    const matriculasNaoEncontradas = [];

    await Promise.all(
      req.body.map(async (presenca) => {
        const { matricula, professor_nome, formacao_id, created_by } = presenca;

        //Busca o id do professor
        const professorData = await getProfessorIdByMatricula(matricula);
        const professor_id = await professorData.professor_id;

        //Se não encontrar o professor
        if (!professor_id) {
          matriculasNaoEncontradas.push({ matricula, professor_nome });
          return;
        }

        presencas.push({
          formacao_id,
          professor_id,
          created_by,
        });
      })
    );

    const { data, error } = await supabase
      .from("presencas")
      .insert(presencas) // Aceita uma lista de objetos das presenças
      .select(); // Use .select() para retornar todos os dados inseridos

    if (error) {
      console.error("Erro ao inserir novas presencas:", error);
      throw error;
    }

    res.status(200).json({ data, matriculasNaoEncontradas });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

//Update presença
router.put("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("presencas")
      .update(req.body)
      .eq("id", req.params.id)
      .single();

    if (error) {
      console.error("Erro ao atualizar presenca ", error);
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

//deletar presença
router.delete("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("alocacoes")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("Erro ao deletar presenca ", error);
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

import express from "express";
import supabase from "../config/dbConfig.js";

const router = express.Router();

// Buscar todos os professores
router.get("/", async (req, res) => {
  try {
    console.log("Tentando buscar professores...");
    const { data, error } = await supabase.from("professores").select(`
                nome_professor,
                matricula,
                email,
                data_admissao,
                unidade_ensino
                `);

    if (error) {
      console.error("Erro ao buscar professores:", error);
      throw error;
    }

    console.log("Professores encontrados:", data?.length || 0);
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro completo:", error);
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

// Buscar professor por ID
router.get("/:id", async (req, res) => {
  try {
    console.log("Tentando buscar professor: ", req.params.id);
    const { data, error } = await supabase
      .from("professores")
      .select(
        `
                professor_id,
                nome_professor,
                matricula,
                email,
                regime_trabalho,
                data_admissao,
                unidade_ensino,
                horas_semanais,
                horas_cumpridas,
                created_at,
                created_by,
                modified_at,
                modified_by,
                presencas (
                    presenca_id,
                    formacoes (
                        nome_formacao,
                        carga_horaria,
                        data,
                        periodo,
                        modalidade,
                        turmas (
                          nome_turma,
                          etapa
                        )                    
                    )    
                ),
                alocacoes (
                  id,
                  ativa,
                  data_inicio,
                  data_final,
                  turmas (
                    turma_id,
                    nome_turma,
                    etapa
                  )
                )
                `
      )
      .eq("matricula", req.params.id)
      .single();

    if (error) {
      console.error("Erro ao buscar professor:", error);
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: "Professor não encontrado" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro completo:", error);
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

// Inserir um novo professor
router.post("/novo-professor", async (req, res) => {
  try {
    const newProfessor = {
      ...req.body,
      created_by: "8058e841-c9b5-4621-aaad-a54e8cd0f794" // Será entregue depois pelo front
    }

    const { data, error } = await supabase
      .from("professores")
      .insert(newProfessor)
      .single();

    if (error) throw error;

    const result = { message: 'Professor registrado', data: data}
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao inserir professor: ', error)
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

// Update dos dados do professor
router.put("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("professores")
      .update(req.body)
      .eq("professor_id", req.params.id)
      .single();

    if (error) throw error;

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

// Delete os dados do professor
router.delete("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("professores")
      .delete()
      .eq("professor_id", req.params.id);

    if (error) throw error;

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

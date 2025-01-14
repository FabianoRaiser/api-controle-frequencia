import express from "express";
import supabase from "../config/dbConfig.js";

const router = express.Router();

//Busca todas as turmas com a lista dos porfessores
router.get("/", async (req, res) => {
  try {
    console.log("Tentadno buscar turmas...");
    const { data, error } = await supabase.from("turmas").select(`
            turma_id,
            nome_turma,
            etapa
            `);

    if (error) {
      console.error("Erro ao buscar professores:", error);
      throw error;
    }

    console.log("Turmas encotradas:", data?.length || 0);
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

//Busca todas as turmas com as formações
router.get("/formacoes", async (req, res) => {
  try {
    const { data, error } = await supabase.from("turmas").select(`
                turma_id,
                nome_turma,
                etapa,
                created_at,
            created_by (
                nome
            ),
            modified_at,
            modified_by (
                nome
            ),
            formacoes (
                formacao_id,
                nome_formacao,
                carga_horaria,
                data
            ),
            alocacoes (
              id,
              ativa,
              data_inicio,
              data_final,
              professores (
                nome_professor,
                matricula
              )
            )
            `);

    if (error) {
      console.error("Erro ao buscar turmas:", error);
      throw error;
    }

    console.log("Turmas encontradas:", data?.length || 0);
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro completo", error);
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

//Busca turma pelo id com lista de professores e Formações
router.get("/:id", async (req, res) => {
  try {
    console.log("Tentando encontrar a Turma: ", req.params.id);
    const { data, error } = await supabase
      .from("turmas")
      .select(
        `
              turma_id,
                nome_turma,
                etapa,
                created_at,
            created_by (
                nome
            ),
            modified_at,
            modified_by (
                nome
            ),
            formacoes (
                formacao_id,
                nome_formacao,
                carga_horaria,
                data
            ),
            alocacoes (
              id,
              ativa,
              data_inicio,
              data_final,
              professores (
                nome_professor,
                matricula
              )
            )
                `
      )
      .eq("turma_id", req.params.id)
      .single();

    if (error) {
      console.error("Erro ao buscar turma: ", error);
      throw error;
    }

    if (!data) {
      return res.status.apply(404).json({ message: "Turma não encontrada" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro completo: ", error);
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

//Insere uma nova Turma
router.post("/nova-turma", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("professores")
      .insert(req.body)
      .single();

    if (error) {
      console.error("Erro ao inserir nova turma: ", error);
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
});

//Update dos dados da turma
router.put("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("turmas")
      .update(req.body)
      .eq("turma_id", req.params.id)
      .single();

    if (error) {
      console.error("Error ao atualizar os dados da turma ", req.params.id);
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

// Deletar Turma
router.delete("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("turmas")
      .delete()
      .eq("turma_id", req.params.id);

      if (error) {
        console.error("Erro ao buscar professor:", error);
        throw error;
      }

      res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })
  }
})

export default router;

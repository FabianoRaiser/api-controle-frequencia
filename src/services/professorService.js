import supabase from "../config/dbConfig.js";

export const getProfessorIdByMatricula = async (matricula) => {
    try {
        const {data, error} = await supabase
            .from("professores")
            .select("professor_id")
            .eq("matricula", matricula)
            .single();

        if (error) {
            console.error("Erro ao buscar professor pela matricula ", error);
            throw error;
        }

        if (!data) {
            throw new Error("Professor não encontrado")
        }

        return data;
    } catch (error) { 
        console.error("Erro ao buscar professor", error);
        throw error;
        
    }
}
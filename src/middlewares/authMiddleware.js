import supabase from "../config/dbConfig.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  // Verifica se o token existe no banco de dados
  const { data, error } = await supabase
    .from("tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !data) {
    return res.status(403).json({ error: "Token inválido." });
  }

  // Se o token for válido, continue para a próxima função
  next();
};

export default authMiddleware;

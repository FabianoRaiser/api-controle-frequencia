import express from "express";
import supabase from "../config/dbConfig.js";
import generateToken from "../middlewares/generateToken.js";

const router = express.Router();

//Rota para criar um novo token
router.get("/create-token", async (req, res) => {
  try {
    const token = generateToken();
    const { user_id } = req.body;

    const { data, error } = supabase.from("tokens").insert({
      token,
      user_id,
    });

    if (error) {
      console.error("Error ao registrar token ", error);
      throw error;
    }

    res.status(201).json({ token });
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

import express from "express";
import authenticateUser from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await authenticateUser(userName, password);
    res.status(200).json({ message: "Login bem-sucedido", user });
  } catch {
    res
      .status(401)
      .json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
  }
});

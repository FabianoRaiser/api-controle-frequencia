import express from "express";
import authenticateUser from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authenticateUser(username, password);
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


export default router;
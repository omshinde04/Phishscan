import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    
    // FORWARD DATA TO PYTHON AI ENGINE
    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/scan",
      req.body,
      { timeout: 15000 }
    );

    // SEND RESULT BACK TO FRONTEND
    res.json(aiResponse.data);

  } catch (error) {

    console.error("AI SERVER ERROR:", error.message);

    res.status(500).json({
      error: "AI Engine Unreachable or Failed"
    });
  }
});

export default router;

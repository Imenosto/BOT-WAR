const express = require("express");
const cors = require("cors");
const bot = require("./autBot");

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Version manuel
// let direction = "RIGHT";
// app.get("/action", (req, res) => res.json({ move: direction, action: "COLLECT" }));
// app.get("/set-direction", (req, res) => {
//   const dir = req.query.dir?.toUpperCase();
//   const allowed = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
//   if (allowed.includes(dir)) {
//     direction = dir;
//     return res.send(`Direction mise à jour : ${direction}`);
//   }
//   res.status(400).send("Direction invalide");
// });

// =======================
// Version automatique 
app.get("/action", (req, res) => {
  const result = bot.decide();
  console.log(`Bot dit : ${result.move}/${result.action}`);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 Bot actif sur le port ${PORT} !`);
});

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let direction = "RIGHT"; // direction par défaut

app.get("/action", (req, res) => {
  res.json({ move: direction, action: "COLLECT" });
});

app.get("/set-direction", (req, res) => {
  const dir = req.query.dir?.toUpperCase();
  const allowed = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
  if (allowed.includes(dir)) {
    direction = dir;
    return res.send(`Direction mise à jour : ${direction}`);
  }
  res.status(400).send("Direction invalide");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

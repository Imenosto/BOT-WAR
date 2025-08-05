import express, { json } from "express";
import cors from "cors";
app.use(cors());

const app = express();

// Middleware pour pouvoir lire du JSON dans les requêtes
app.use(json());

// Route GET /action
app.get("/action", (req, res) => {
  res.json({move: "UP", action: "NONE"});
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
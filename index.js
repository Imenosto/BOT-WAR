const express = require("express");
const app = express();

// Middleware pour pouvoir lire du JSON dans les requêtes
app.use(express.json());

// Route GET /action
app.get("/action", (req, res) => {
  res.json({move: "UP", action: "NONE"});
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
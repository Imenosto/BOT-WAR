const express = require("express");
const cors = require("cors");

const app = express(); 
app.use(cors());
app.use(express.json());

let direction = "RIGHT"; 


app.get("/action", (req, res) => {
  res.json({ move: direction, action: "COLLECT" });
});

app.get("/set-direction", (req, res) => {
  const dir = req.query.dir?.toUpperCase();
  const directionsPossibles = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];

  if (directionsPossibles.includes(dir)) {
    direction = dir;
    res.send("nouvelle direction : " + direction);
  } else {
    res.status(400).send("Direction invalide");
  }
});


// // =======================
// // Version automatique 
// app.get("/action", (req, res) => {
//   const result = bot.decide();
//   console.log(`Bot dit : ${result.move}/${result.action}`);
//   res.json(result);
// });



app.listen(3000, () => {
    console.log("serveur demarre");
});



module.exports = app;

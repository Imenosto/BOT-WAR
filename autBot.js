let memoire = {
  position: { x: 1, y: 1 },
  dejaVues: new Set(),
  murs: new Set()
};

function getDirections() {
  return [
    { nom: "UP", dx: 0, dy: -1 },
    { nom: "DOWN", dx: 0, dy: 1 },
    { nom: "LEFT", dx: -1, dy: 0 },
    { nom: "RIGHT", dx: 1, dy: 0 }
  ];
}

function melanger(liste) {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liste[i], liste[j]] = [liste[j], liste[i]];
  }
  return liste;
}


function decide() {
  const pos = memoire.position;
  const cle = `${pos.x},${pos.y}`;
  memoire.dejaVues.add(cle);
  const directions = melanger(getDirections());
  let choix = { move: "STAY", action: "NONE" };
  for (const dir of directions) {
    const x = pos.x + dir.dx;
    const y = pos.y + dir.dy;
    const suivante = `${x},${y}`;

    if (!memoire.dejaVues.has(suivante) && !memoire.murs.has(suivante)) {
      memoire.position = { x, y };
      choix = { move: dir.nom, action: "COLLECT" };
      return choix;
    }
  }

  const secours = directions.find(dir => {
    const x = pos.x + dir.dx;
    const y = pos.y + dir.dy;
    const cle = `${x},${y}`;
    return !memoire.murs.has(cle);
  });

  if (secours) {
    memoire.position = {
      x: pos.x + secours.dx,
      y: pos.y + secours.dy
    };
    choix = { move: secours.nom, action: "COLLECT" };
  }

  return choix;
}

module.exports = { decide };

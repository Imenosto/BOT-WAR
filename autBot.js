// smartBot.js

let botMemory = {
  position: { x: 1, y: 1 },
  visited: new Set(),
  walls: new Set()
};

function getDirections() {
  return [
    { move: "UP", dx: 0, dy: -1 },
    { move: "DOWN", dx: 0, dy: 1 },
    { move: "LEFT", dx: -1, dy: 0 },
    { move: "RIGHT", dx: 1, dy: 0 }
  ];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function decide() {
  const current = botMemory.position;
  const key = `${current.x},${current.y}`;
  botMemory.visited.add(key);

  const directions = shuffle(getDirections());

  let chosen = { move: "STAY", action: "NONE" };

  for (const dir of directions) {
    const nextX = current.x + dir.dx;
    const nextY = current.y + dir.dy;
    const nextKey = `${nextX},${nextY}`;

    if (!botMemory.visited.has(nextKey) && !botMemory.walls.has(nextKey)) {
      botMemory.position = { x: nextX, y: nextY };
      chosen = { move: dir.move, action: "COLLECT" };
      return chosen;
    }
  }

  // Si aucune case nouvelle trouvée, on va quand même quelque part (évite l’inertie)
  const fallback = directions.find(dir => {
    const nextX = current.x + dir.dx;
    const nextY = current.y + dir.dy;
    const nextKey = `${nextX},${nextY}`;
    return !botMemory.walls.has(nextKey);
  });

  if (fallback) {
    botMemory.position = {
      x: current.x + fallback.dx,
      y: current.y + fallback.dy
    };
    chosen = { move: fallback.move, action: "COLLECT" };
  }

  return chosen;
}

module.exports = { decide };

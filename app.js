const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const newGameBtn = document.getElementById("newGame");

let grid;
let score;

function startGame() {
  grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  score = 0;
  addTile();
  addTile();
  render();
}

function addTile() {
  const empty = [];
  grid.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell === 0) empty.push([r, c]);
    })
  );
  if (empty.length === 0) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function render() {
  board.innerHTML = "";
  scoreEl.textContent = score;
  grid.flat().forEach(value => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value || "";
    board.appendChild(cell);
  });
}

function slide(row) {
  const arr = row.filter(v => v);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
    }
  }
  return arr.filter(v => v).concat(Array(4).fill(0)).slice(0, 4);
}

function rotate() {
  grid = grid[0].map((_, i) => grid.map(row => row[i]).reverse());
}

function move(direction) {
  for (let i = 0; i < direction; i++) rotate();
  grid = grid.map(row => slide(row));
  for (let i = 0; i < (4 - direction) % 4; i++) rotate();
  addTile();
  render();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") move(0);
  if (e.key === "ArrowUp") move(1);
  if (e.key === "ArrowRight") move(2);
  if (e.key === "ArrowDown") move(3);
});

newGameBtn.onclick = startGame;

startGame();
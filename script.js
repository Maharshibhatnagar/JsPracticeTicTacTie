

// const gameBoard = document.querySelector("#gameboard");
// const infoDisplay = document.querySelector("#info");

// const startCells = ["", "", "", "", "", "", "", "", ""];

// let go = "circle";
// infoDisplay.textContent = "Circle goes first";

// function createBoard() {
//   startCells.forEach((_cell, index) => {
//     const cellElement = document.createElement("div");
//     cellElement.classList.add("square");
//     cellElement.id = index;
//     gameBoard.appendChild(cellElement);
//     cellElement.addEventListener("click", addGo);
//   });
// }

// createBoard();

// function addGo(e) {
//   const goDisplay = document.createElement("div");
//   goDisplay.classList.add(go);
//   e.target.appendChild(goDisplay);

//   go = go === "circle" ? "cross" : "circle";
//   infoDisplay.textContent = "It is now " + go + "'s turn.";
//   e.target.removeEventListener("click", addGo);
//   checkScore();
// }

// function checkScore() {
//   const allSquares = document.querySelectorAll(".square");

//   const winningCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   winningCombos.forEach((array) => {
//     const circleWins = array.every(
//       (cell) =>
//         allSquares[cell].firstChild &&
//         allSquares[cell].firstChild.classList.contains("circle")
//     );

//     if (circleWins) {
//       infoDisplay.textContent = "Circle Wins!";
//       allSquares.forEach((square) =>
//         square.removeEventListener("click", addGo)
//       );
//       return;
//     }

//     const crossWins = array.every(
//       (cell) =>
//         allSquares[cell].firstChild &&
//         allSquares[cell].firstChild.classList.contains("cross")
//     );

//     if (crossWins) {
//       infoDisplay.textContent = "Cross Wins!";
//       allSquares.forEach((square) =>
//         square.removeEventListener("click", addGo)
//       );
//       return;
//     }
//   });
// }

// improved and adding a tie functionality


const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
let turns = 0;

infoDisplay.textContent = "Circle goes first";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    gameBoard.appendChild(cellElement);
    cellElement.addEventListener("click", addGo);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.appendChild(goDisplay);

  turns++;
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "It is now " + go + "'s turn.";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let tie = true;

  winningCombos.forEach((array) => {
    const circleWins = array.every(
      (cell) =>
        allSquares[cell].firstChild &&
        allSquares[cell].firstChild.classList.contains("circle")
    );

    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      disableClicks();
      return;
    }

    const crossWins = array.every(
      (cell) =>
        allSquares[cell].firstChild &&
        allSquares[cell].firstChild.classList.contains("cross")
    );

    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      disableClicks();
      return;
    }
  });

  if (turns === 9 && tie) {
    infoDisplay.textContent = "It's a tie!";
  }
}

function disableClicks() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => square.removeEventListener("click", addGo));
}







gsap.set(".ball", { xPercent: -50, yPercent: -50 });

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.2;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

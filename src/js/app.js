class Gameboard {
  constructor() {
    this.holes = document.querySelectorAll(".hole");

    this.winsEl = document.getElementById("score-wins");

    this.lossesEl = document.getElementById("score-losses");

    this.boardEl = document.querySelector(".board");
  }

  updateCounters(wins, losses) {
    if (this.winsEl) this.winsEl.textContent = wins;
    if (this.lossesEl) this.lossesEl.textContent = losses;
  }
}

class Goblin {
  constructor() {
    this.element = document.createElement("img");

    this.element.classList.add("goblin-img");

    if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
      this.element.src = "#";
    } else {
      this.element.src = require("../img/goblin.png");
    }
  }

  remove() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

const MOVE_INTERVAL_MS = 1000;
const MAX_LOSSES = 5;

class GameController {
  constructor(board, goblin) {
    this.board = board;
    this.goblin = goblin;

    this.wins = 0;
    this.losses = 0;
    this.currentHoleIndex = -1;
    this.moveIntervalId = null;
    this.goblinClickedInThisTurn = false;
  }

  init() {
    if (this.board.holes.length === 0) return;

    if (this.board.boardEl) {
      this.board.boardEl.addEventListener("click", (event) =>
        this.handleBoardClick(event),
      );
    }

    this.startGame();
  }

  startGame() {
    this.nextTurn();
    this.moveIntervalId = setInterval(() => this.nextTurn(), MOVE_INTERVAL_MS);
  }

  nextTurn() {
    if (this.currentHoleIndex !== -1 && !this.goblinClickedInThisTurn) {
      this.losses++;
      this.board.updateCounters(this.wins, this.losses);

      if (this.losses >= MAX_LOSSES) {
        this.endGame();
        return;
      }
    }

    this.goblinClickedInThisTurn = false;
    this.goblin.remove();

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.board.holes.length);
    } while (newIndex === this.currentHoleIndex && this.board.holes.length > 1);

    this.board.holes[newIndex].append(this.goblin.element);
    this.currentHoleIndex = newIndex;
  }

  handleBoardClick(event) {
    const clickedHole = event.target.closest(".hole");

    if (
      clickedHole &&
      clickedHole.contains(this.goblin.element) &&
      !this.goblinClickedInThisTurn
    ) {
      this.goblinClickedInThisTurn = true;
      this.wins++;
      this.board.updateCounters(this.wins, this.losses);
      this.goblin.remove();
    }
  }

  endGame() {
    this.stopInterval();
    this.goblin.remove();
    alert(`Игра окончена! Ваши очки: ${this.wins}`);
  }

  stopInterval() {
    if (this.moveIntervalId !== null) {
      clearInterval(this.moveIntervalId);
      this.moveIntervalId = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const board = new Gameboard();
  const goblin = new Goblin();
  const game = new GameController(board, goblin);

  game.init();

  window.addEventListener("unload", () => game.stopInterval());
});

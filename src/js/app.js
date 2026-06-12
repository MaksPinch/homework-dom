const MOVE_INTERVAL_MS = 1000;
document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");

  if (holes.length == 0) {
    throw new Error("Не найдены элементы .hole на странице");
  }

  const boardSize = holes.length;
  const goblin = document.createElement("img");

  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    goblin.src = "#";
  } else {
    goblin.src = require("../img/goblin.png");
  }

  goblin.classList.add("goblin-img");
  let currentHoleIndex = -1;

  let moveIntervalId = null;

  function moveGoblin() {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * boardSize);
    } while (newIndex === currentHoleIndex);

    holes[newIndex].append(goblin);
    currentHoleIndex = newIndex;
  }

  function stopGame() {
    if (moveIntervalId !== null) {
      clearInterval(moveIntervalId);
      moveIntervalId = null;
    }
  }

  moveGoblin();

  moveIntervalId = setInterval(moveGoblin, MOVE_INTERVAL_MS);
});

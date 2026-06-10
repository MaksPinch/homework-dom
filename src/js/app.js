document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const boardSize = holes.length;
  const goblin = document.createElement("img");

  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    goblin.src = "#";
  } else {
    goblin.src = require("../img/goblin.png");
  }

  goblin.classList.add("goblin-img");
  let currentHoleIndex = -1;

  function moveGoblin() {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * boardSize);
    } while (newIndex === currentHoleIndex);

    holes[newIndex].appendChild(goblin);
    currentHoleIndex = newIndex;
  }

  moveGoblin();
  setInterval(moveGoblin, 1000);
});

import "../css/style.css";
import goblinSrc from "../img/goblin.png";

document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const boardSize = holes.length;

    const goblin = document.createElement('img');
    goblin.src = goblinSrc;
    goblin.classList.add('goblin-img');

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

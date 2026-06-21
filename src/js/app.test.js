/**
 * @jest-environment jsdom
 */

import "./app";

describe("Goblin Game Инициализация", () => {
  test("Приложение должно успешно загружаться без ошибок", () => {
    document.body.innerHTML = `
      <div id="score-wins">0</div>
      <div id="score-losses">0</div>
      <div class="board"></div>
    `;

    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);

    const holes = document.querySelectorAll(".hole");
    expect(holes.length).toBe(16);
  });
});

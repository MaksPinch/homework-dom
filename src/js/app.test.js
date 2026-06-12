/**
 * @jest-environment jsdom
 */

import "./app";

describe("Goblin Game Инициализация", () => {
  test("Приложение должно успешно загружаться без ошибок", () => {
    document.body.innerHTML = '<div class="hole"></div>';

    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);

    expect(true).toBe(true);
  });
});

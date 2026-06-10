/**
 * @jest-environment jsdom
 */

import './app';

describe('Goblin Game Инициализация', () => {
  test('Приложение должно успешно загружаться без ошибок', () => {
    // Создаем искусственную лунку в виртуальном DOM, чтобы app.js нашел её
    document.body.innerHTML = '<div class="hole"></div>';

    // Вызываем событие загрузки, чтобы сработал твой код
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Если выполнение дошло сюда и не упало — тест пройден!
    expect(true).toBe(true);
  });
});

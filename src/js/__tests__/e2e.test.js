const puppeteer = require("puppeteer");

jest.setTimeout(30000);

test("Простая проверка формы", async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on("dialog", (dialog) => dialog.dismiss());

  await page.goto("http://localhost:8080");

  await page.type(".credit-validator__input", "4111111111111111");
  await page.click(".credit-validator__button");

  const formExists = await page.$(".credit-validator");
  expect(formExists).not.toBeNull();

  await browser.close();
});

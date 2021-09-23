import type {Page, ElementHandle} from "puppeteer";
import puppeteer from "puppeteer";

const start = async (page: Page) => {
    const [button] = await page.$x('//button[ text() = "Start"]');
    await button.click();
}

const submitBitch = async (page: Page) => {
    const [button] = await page.$x('//button[ text() = "Submit"]');
    await button.click();
}

const next = async (page: Page) => {
    const [button] = await page.$x('//button[ text() = "NEXT"]');
    await button.click();
}

const game = async (page: Page) => {
    const [element] = await page.$x('//div[@class = "big-number "]');

    const value = await page.evaluate(el => {
        return el.innerText
    },
    element
    )
    
    const input = await page.waitForXPath('//input');

    await input?.type(value);
}

(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: null,
            
        });

    const page = await browser.newPage();
    await page.goto('https://humanbenchmark.com/tests/number-memory');
    await start(page);
    while(true)
    {

        await game(page);
        await submitBitch(page);
        await next(page);
    }
})();

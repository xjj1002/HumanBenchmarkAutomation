import type {Page, ElementHandle} from "puppeteer";
import puppeteer from "puppeteer";

const start = async (page: Page) => {
    const [button] = await page.$x('//button[ text() = "Start Test"]');
    await button.click();
}

const moveOn = async (page: Page) =>{

    const [button] = await page.$x('//button[ text() = "Continue"]');
    await button.click();
}

const game = async (page: Page) => {
    const elements = await page.$x('//div[@data-cellnumber]');


    const sorted = new Array(elements.length);
    for(let element of elements)
    {
      const value = await page.evaluate(el => {
            return el.getAttribute('data-cellnumber');
        },
        element
        )

        const index = parseInt(value)-1;

        sorted[index] = element;
    }

    for(let element of sorted)
    {
        await element.click();
    }
}

(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: null,
            
        });

    const page = await browser.newPage();
    await page.goto('https://humanbenchmark.com/tests/chimp');
    await start(page);
    while(true)
    {
        try{
            await game(page);
        }
        finally{
            
            await moveOn(page);
        }
        
    }
})();


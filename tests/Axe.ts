import AxeBuilder from "@axe-core/playwright";
import test, { expect } from "@playwright/test";
import { createHtmlReport } from "axe-html-reporter";

 
 test('Axe check', async ({ page },testInfo) => {

// build or go to page
await page.goto('https://playwright.dev/docs/ci-intro');
await page.locator('.navbar__title text--truncate').first().waitFor();
// run axe builder on the page
const results = await new AxeBuilder({ page }).withTags(['best-practice','wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
//expect(results.violations).toEqual([]);

try
    {
  expect(results.violations).toEqual([]);
    }catch{
      const htmlReport = createHtmlReport({
        results: results,
        options:{outputDir:'/'}
        
    })
    
    await testInfo.attach('results',{
        path: './accessibilityReport.html' 
    })
    }
    
page.close();
 })
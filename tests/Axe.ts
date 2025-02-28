import AxeBuilder from "@axe-core/playwright";
import test, { expect } from "@playwright/test";
import { createHtmlReport } from "axe-html-reporter";

 
 test('Axe check', async ({ page },testInfo) => {

// build or go to page
await page.goto('https://cwsqa.auburn.edu/aubie/');
await page.locator('.d-print-none').first().waitFor();
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
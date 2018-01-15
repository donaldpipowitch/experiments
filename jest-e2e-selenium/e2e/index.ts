import { By, until } from 'selenium-webdriver';
import { getDriver } from './selenium';

jest.setTimeout(10000);

test('check selenium', async () => {
  const driver = await getDriver();
  await driver.getSession();
  await driver.get('http://www.google.com/ncr');
  const q = await driver.findElement(By.name('q'));
  await q.sendKeys('webdriver');
  const btnK = await driver.findElement(By.name('btnK'));
  await btnK.click();
  await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

  expect(await driver.getTitle()).toBe('webdriver - Google Search');
});

// get rid of UnhandledPromiseRejectionWarning
process.on('unhandledRejection', (err) => {
  throw err;
});

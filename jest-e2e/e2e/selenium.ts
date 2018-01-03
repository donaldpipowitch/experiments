import selenium from 'selenium-standalone';
import {
  Builder,
  Capability,
  Capabilities,
  Browser,
  promise,
  WebDriver
} from 'selenium-webdriver';
import { ChildProcess } from 'child_process';
import { setTimeout } from 'timers';

const sleep = (value: number) =>
  new Promise((resolve) => setTimeout(resolve, value));

// https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs#moving-to-asyncawait
promise.USE_PROMISE_MANAGER = false;

// default url from selenium-standalone
const url = 'http://localhost:4444/wd/hub';

const seleniumOptions = {
  basePath: `${process.cwd()}/.selenium`
};

function installSelenium() {
  return new Promise((resolve, reject) =>
    selenium.install(
      seleniumOptions,
      (err: any) => (err ? reject(err) : resolve())
    )
  );
}

function startSelenium() {
  return new Promise<ChildProcess>((resolve, reject) =>
    selenium.start(
      seleniumOptions,
      (err: any, child: any) => (err ? reject(err) : resolve(child))
    )
  );
}

let seleniumProcess: ChildProcess | undefined;
let driver: WebDriver | undefined;

export function getDriver() {
  return new Promise<WebDriver>(async (resolve, reject) => {
    try {
      // early return, if we call getDriver multiple times
      if (driver) {
        return resolve(driver);
      }

      await installSelenium();
      seleniumProcess = await startSelenium();
      driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(url)
        .build();
      // await driver.getSession();
      resolve(driver);
    } catch (err) {
      reject(err);
    }
  });
}

afterAll(async () => {
  if (driver) {
    await driver.quit();
    driver = undefined;
  }

  // it looks like we need to kill the selenium process on next tick
  // or else we keep chromedriver processes open
  process.nextTick(() => {
    if (seleniumProcess) {
      seleniumProcess.kill();
      seleniumProcess = undefined;
    }
  });
});

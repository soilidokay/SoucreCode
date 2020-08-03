/**
 * Athor: Unmatched Tai Nguyen - 14 /06 /2019 - 13 :06 :11
 *
 */
const driver = require("webdriverio");
let path_module = require("path");
const assert = require("assert");
const RequireDynamic = require("../Common/LoadModule");
const opts = {
  path: "/wd/hub",
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "7.1.2",
    deviceName: "Android Emulator",
    // app: "./apks/ApiDemos-debug.apk",
    appPackage: "com.addictive.strategy.army",
    appActivity: ".UnityPlayerActivity",
    automationName: "UiAutomator2",
  },
};
const Sleep = (second) => new Promise((reslve) => setTimeout(reslve, second));
// async function main() {
//
// }

const Service = require("../services/RemoteAndroidService");
class RemoteAndroidController {
  constructor() {}
  #client = null;
  // #client = await driver.remote(opts);
  #HandleSession = null;
  StartRemote = HttpGet(async (params, model) => {
    this.#client = await driver.remote(opts);
    this.#HandleSession = setInterval(
      () => this.#client.getOrientation(),
      3000
    );
    return true;
  });
  TaskScreen = HttpGet(async (params, model) => {
    let path = await this.#client.takeScreenshot();

    // console.log(path);
    //283, 827
    //  await this.#client.touchMove(283,827);
    //   this.#client.touchDown(283,827)
    //   this.#client.touchUp(283,827)
    return `<img src="data:image/png;base64,${path}"/>`;
  });
  StopRemote = HttpGet(async (params, model) => {
    clearInterval(this.#HandleSession);
    await this.#client.deleteSession();
    return true;
  });
  Run = HttpGet(async (params, model) => {
    const DIR = path_module.join(__dirname, "..", "lib", "Test.js");
    console.log(DIR);
    const { Runner, Container } = RequireDynamic(DIR);
    Container.client = this.#client;
    return await Runner();
  });
}
module.exports = new RemoteAndroidController();

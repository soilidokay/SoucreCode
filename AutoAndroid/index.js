// // javascript

// const driver = require("webdriverio");

// const assert = require("assert");

// const opts = {
//   path: "/wd/hub",
//   port: 4723,
//   capabilities: {
//     platformName: "Android",
//     platformVersion: "7.1.2",
//     deviceName: "Android Emulator",
//     // app: "./apks/ApiDemos-debug.apk",
//     appPackage: "com.addictive.strategy.army",
//     appActivity: ".UnityPlayerActivity",
//     automationName: "UiAutomator2",
//   },
// };
// const Sleep = (second) => new Promise((reslve) => setTimeout(reslve, second));
// async function main() {
//   const client = await driver.remote(opts);
//   let path = await client.takeScreenshot();
//   console.log(path);
//   await client.deleteSession();
// }

// main();

const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const congig = require("./src/Contants/config");
// const { ConnectMongose } = require('./Mongoose/ConectMongooseDb')
const { routers, Dispatcher } = require("./src/Routes/index");
const app = express();
app.options("*", cors());
app.use(bodyParse.json());

// ConnectMongose();

app.use("/:Controller/:action", (req, res, next) => {
  console.log("Authentication");
  next();
});

app.use("/:Controller/:action", (req, res, next) => {
  let { action } = Dispatcher.GetAction(req);
  console.log("authorization");
  next();
});

app.use(routers);
app.listen(congig.portServer, (obj) => {
  console.log("Server starting...");
});

const Sleep = (second) => new Promise((resolve) => setTimeout(resolve, second));
// async function main() {
//
// }

const driver = require("webdriverio");
const fs = require("fs");
const Container = {
  // client: await driver.remote({}),
  client: null,
};
// const ratioX = 540 / 554;
// const ratioY = 960 / 986;
const Touch = async (x, y) => {
  await Container.client.touchAction({
    action: "tap",
    x: x,
    y: y,
  });
};
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
const Run = async () => {
  //await Container.client.touchDown(283, 827);
  //await Container.client.touchUp(283, 827);
  await Container.client.saveScreenshot("imgs/test.png");

  let path = await Container.client.takeScreenshot();
  let img2 = await readFile("imgs/test.png");
  let simaly = await Container.client.compareImages("Similarity", path, img2);
  console.log(simaly);
  // await Container.client.getWindowSize();
  // console.log(path);
  //283, 827
  //  await Container.client.touchMove(283,827);
  //   Container.client.touchDown(283,827)
  //   Container.client.touchUp(283,827)
  // return `<img src="data:image/png;base64,${path}"/>`;
};

module.exports = { Runner: Run, Container };

const Sleep = (second) => new Promise((reslve) => setTimeout(reslve, second));
// async function main() {
//
// }

const driver = require("webdriverio");
const Container = {
    // client: await driver.remote({}),
  client: null,
};
const Run = async () => {
  // await Container.client.touchMove(283, 827);
  await Container.client.touchDown(283, 827);
  await Container.client.touchUp(283, 827);
  // let path = await Container.client.takeScreenshot();

  // console.log(path);
  //283, 827
  //  await Container.client.touchMove(283,827);
  //   Container.client.touchDown(283,827)
  //   Container.client.touchUp(283,827)
  return "ok"; //`<img src="data:image/png;base64,${path}"/>`;
};

module.exports = { Runner: Run, Container };

const router = require("express").Router();
const { EnumMethodHttp } = require("../Contants/Config");
const { Dispatcher } = require('./Dispatcher')


module.exports = {
  routers: [
    router.get("/:Controller/:action", (req, res) => {
      Dispatcher.InvokeAction(req, res);
    }),
    router.post("/:Controller/:action", (req, res) => {
      Dispatcher.InvokeAction(req, res);
    })
   
  ],
  Dispatcher
};

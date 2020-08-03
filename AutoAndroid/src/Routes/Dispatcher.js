require('./HocConfigHttps')
const Controllers = require("../Controllers");
const { EnumMethodHttp, Error } = require("../Contants/Config");

class Dispatcher {
  constructor() {
    this.MapController = {};
    this.MapAction();
  }

  MapAction = () => {
    Controllers.forEach(item => {
      let props = Object.getOwnPropertyNames(item);
      let propsEnumHttp = Object.values(EnumMethodHttp);

      let itemMap = this.MapController[item.constructor.name.replace("Controller", "").toUpperCase()] = {};

      itemMap.Controller = Controllers;
      propsEnumHttp.forEach(itemProp => {
        itemMap[itemProp] = {};
      });

      props.forEach(itemprop => {
        let action = item[itemprop];
        if (!action.configHttp) return;
        
        let MapMethods = itemMap[action.configHttp.method];

        if (action.DisplayName)
          MapMethods[action.DisplayName.toUpperCase()] = action;
        else MapMethods[itemprop.toUpperCase()] = action;
      });
    });
  };

  GetAction = (req) => {
    const ControllerQuery = (req.params.Controller||"").toUpperCase();
    const ActionQuery = (req.params.action||"").toUpperCase();

    const Controller = this.MapController[ControllerQuery];
    
    if (!Controller) return { error: Error.NotFoundController };

    const action = Controller[req.method][ActionQuery];

    if (!action) return { error: Error.NotFoundAction };

    return { action, Controller };
  };

  AsyncFunction = (action, req, res) => {
    action.then(result => {
      res.send(result);
    })
      .catch(error => {
        console.error(error);
        res.status(500).send(error);
      });
  }

  Function = (result) => {
    res.send(result);
  }

  InvokeAction = (req, res) => {

    const { action, Controller, error } = this.GetAction(req);

    if (error) {
      console.error(error);
      res.status(404).send(error);
    } else {
      let params = req.query;
      let body = req.body;

      Controller.Controller.__proto__._Context = { Respose: res, Request: req };

      this[action.constructor.name](action(params, body), req, res)
    }
  };
}

module.exports = { Dispatcher: new Dispatcher() };

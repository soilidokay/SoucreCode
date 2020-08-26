//try catch
//quan ly mang
//cache
//goi api

import {
  IServiceBase,
  TContextMiddleWare,
  TConfigServiceBase,
  TMiddleWare,
} from './type';

export default abstract class ServiceBase implements IServiceBase {
  private createContextMiddleWare = (
    Config: TConfigServiceBase,
  ): TContextMiddleWare => {
    return {
      DataContext: {
        Data: [],
        isNext: false,
      },
      ConfigApi: Config,
    };
  };
  private GeneratePipeMiddleWare(): TMiddleWare[] {
    return [this.DataFromCacheMiddleWare, this.DataFromApiMiddleWare];
  }
  public async GetData(Config: TConfigServiceBase) {
    const Context = this.createContextMiddleWare(Config);
    const Pipes = this.GeneratePipeMiddleWare();
    const {DataContext} = Context;
    while (Pipes.length > 0) {
      const MiddleAction = Pipes.shift();
      MiddleAction && (await MiddleAction(Context));
      if (!DataContext.isNext) {
        break;
      }
    }
    return Context.DataContext.Data;
  }

  private DataFromCacheMiddleWare({DataContext}: TContextMiddleWare) {
    DataContext.isNext = true;
  }

  private async DataFromApiMiddleWare<TData>({
    DataContext,
    ConfigApi,
  }: TContextMiddleWare) {
    const result = await ConfigApi.Action(ConfigApi.ParamRequest);
    DataContext.isNext = true;
    DataContext.Data = result;
  }
}

export declare type TFunctionService = (
  ...param: any[]
) => any[] | Promise<any[]>;
export declare type TDataContext = {
  Data: any[];
  isNext: boolean;
};
export declare type TConfigServiceBase = {
  Action: TFunctionService;
  ParamRequest: any;
};
export declare type TContextMiddleWare = {
  DataContext: TDataContext;
  ConfigApi: TConfigServiceBase;
};
export declare type TMiddleWare = (
  context: TContextMiddleWare,
) => void | Promise<void>;
export interface IServiceBase {}
export interface ILearningGoalParamRequest {}
export interface ILearningDetailParam {
  LearningGoalId?: string;
}
export interface ITableTimeParamRequest {}

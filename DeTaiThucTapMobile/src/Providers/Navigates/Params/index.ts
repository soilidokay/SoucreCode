export interface IParamNavigates {
  Title?: string;
  SubTitle?: string;
}

export interface IParamHomeScreens extends IParamNavigates {}
export interface IParamRootApp extends IParamNavigates {}

export declare type ParamListNavigateBase = {
  Default: IParamNavigates;
};

export declare type ParamListTabNavigate = {
  Home: IParamHomeScreens;
} & ParamListNavigateBase;

export declare type ParamStackNavigateList = {
  RootApp: IParamRootApp;
} & ParamListNavigateBase;

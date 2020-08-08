import {IStackNavigateTheme} from 'assets/themes/type';
import {IParamNavigates} from 'Providers/Navigates/Params';

export interface IHeaderTitle {
  theme: IStackNavigateTheme;
  params: IParamNavigates;
}
export interface IRefHeaderTitle {
  SetParams: (params: IParamNavigates) => void;
}

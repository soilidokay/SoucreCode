import {ITabNavigateTheme} from 'assets/themes/type';
import {ParamListBase} from '@react-navigation/native';
import {IParamHomeScreens, ParamListNavigateBase} from './Params';
import {StackScreenProps} from '@react-navigation/stack';
export interface PropsBase<
  ParamList extends ParamListNavigateBase,
  RouteName extends keyof ParamList
> extends StackScreenProps<ParamList, RouteName> {
  theme?: ITabNavigateTheme;
}

export interface IScreenComponent<RouteName extends keyof ParamListBase> {
  name: RouteName;
  component: React.ComponentType<any>;
  initialParams?: IParamHomeScreens;
}

export interface PropsApp {}

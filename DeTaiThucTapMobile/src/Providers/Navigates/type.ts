import {ITabNavigateTheme} from 'assets/themes/type';
import {
  IParamHomeScreens,
  ParamNavigate,
  ParamStackNavigateLoginList,
} from './Params';
import {
  StackScreenProps,
  TabNavigationOptions,
  StackScreenLoginProps,
} from './Custom/type';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

export interface LoginPropsBase<
  RouteName extends keyof ParamStackNavigateLoginList
> extends StackScreenLoginProps<RouteName> {
  theme?: ITabNavigateTheme;
}

export interface PropsBase<RouteName extends keyof ParamNavigate>
  extends StackScreenProps<RouteName> {
  theme?: ITabNavigateTheme;
}

export interface IScreenComponent<RouteName extends keyof ParamNavigate> {
  name: RouteName;
  component: React.ComponentType<any>;
  initialParams?: IParamHomeScreens;
  options?: TabNavigationOptions;
}

export interface IScreenLoginComponent<
  RouteName extends keyof ParamStackNavigateLoginList
> {
  name: RouteName;
  component: React.ComponentType<any>;
  initialParams?: IParamHomeScreens;
  options?: TabNavigationOptions;
}

export declare type TIconComponent =
  | typeof FontAwesome5Icon
  | typeof AntDesign
  | typeof Entypo
  | typeof EvilIcons
  | typeof Feather
  | typeof FontAwesome
  | typeof FontAwesome5Pro
  | typeof Fontisto
  | typeof Foundation
  | typeof MaterialCommunityIcons
  | typeof MaterialIcons
  | typeof Octicons
  | typeof FontAwesome5Icon;

export interface PropsApp {}

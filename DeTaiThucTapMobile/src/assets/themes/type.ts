import {StyleViewComponent} from '../../Types';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs/src/types';
export interface ITabNavigateTheme {
  tabBarOptions?: BottomTabBarOptions;
}

interface IBackAction {
  color: string;
  backgroundColor: string;
}

export interface IStackNavigateTheme {
  HeaderStyle?: StyleViewComponent;
  TitleStyle?: StyleViewComponent;
  AvatarStyle?: StyleViewComponent;
  LayoutUser: StyleViewComponent;
  LayoutBack: StyleViewComponent;
  backgroundColor: string;
}

export interface IHomeTheme {
  containerStyle: StyleViewComponent;
}

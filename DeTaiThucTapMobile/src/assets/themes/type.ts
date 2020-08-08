import {BottomTabBarOptions} from '@react-navigation/bottom-tabs/src/types';
import {StyleViewComponent} from '../../Types';
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
  BackActionStyle: IBackAction;
}

export interface IHomeTheme {
  containerStyle: StyleViewComponent;
}

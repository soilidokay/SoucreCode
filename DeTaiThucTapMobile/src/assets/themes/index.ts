import {ITabNavigateTheme, IStackNavigateTheme} from './type';
import Colors from '../Colors';

export const TabNavigateTheme: ITabNavigateTheme = {
  tabBarOptions: {
    activeTintColor: Colors.Lime,
    inactiveTintColor: Colors.LightBlue,
    tabStyle: {
      backgroundColor: Colors.Blue,
    },
  },
};

export const StackNavigateTheme: IStackNavigateTheme = {
  HeaderStyle: {
    backgroundColor: Colors.Blue,
  },
  TitleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LightBlue,
    borderWidth: 1,
    borderColor: Colors.DarkBlue,
  },
  BackActionStyle: {
    color: Colors.White,
    backgroundColor: Colors.Blue,
  },
};

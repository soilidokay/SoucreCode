import {ITabNavigateTheme, IStackNavigateTheme} from './type';
import Colors from '../Colors';

export const TabNavigateTheme: ITabNavigateTheme = {
  tabBarOptions: {
    activeTintColor: Colors.Lime,
    inactiveTintColor: Colors.LightBlue,
    tabStyle: {
      backgroundColor: Colors.Purple,
    },
  },
};

export const StackNavigateTheme: IStackNavigateTheme = {
  HeaderStyle: {
    backgroundColor: Colors.CustomGreen,
    height: 60,
    flexDirection: 'row',
  },
  backgroundColor: Colors.CustomGreen,
  TitleStyle: {
    flex: 1,
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

  LayoutUser: {
    margin: 5,
    backgroundColor: Colors.CustomGreen,
    borderColor: Colors.LightGreen,
  },
  LayoutBack: {
    margin: 5,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

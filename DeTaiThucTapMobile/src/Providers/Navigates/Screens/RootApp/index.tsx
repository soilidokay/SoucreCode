import React from 'react';
import {TabNavigateTheme} from 'assets/themes';
// import {createMyNavigator} from 'Providers/Navigates/Custom/BottomTabNavigation';
import HomeScreen from '../HomeScreen';
import {IScreenComponent} from 'Providers/Navigates/type';
import {ParamListTabNavigate, KeyNavigate} from 'Providers/Navigates/Params';
import ScreenBase from '../ScreenBase';
import {IRootAppScreenProps} from '../type';
import LearningGoalScreen from '../LearningGoalScreen';
import {createMyNavigator} from '../../Custom/BottomTabNavigation';
import AboutScreen from '../AboutScreen';
import TimeTable from '../TimeTableScreen';

const TabNavigate = createMyNavigator<ParamListTabNavigate>();

class RootApp extends ScreenBase<KeyNavigate.RootApp, IRootAppScreenProps> {
  constructor(props: IRootAppScreenProps) {
    super(props);
  }
  render() {
    return (
      <TabNavigate.Navigator tabBarOptions={TabNavigateTheme.tabBarOptions}>
        <TabNavigate.Screen {...HomeScreen} />
        <TabNavigate.Screen {...LearningGoalScreen} />
        <TabNavigate.Screen {...TimeTable} />
        <TabNavigate.Screen {...AboutScreen} />
      </TabNavigate.Navigator>
    );
  }
}

const _default: IScreenComponent<KeyNavigate.RootApp> = {
  name: KeyNavigate.RootApp,
  component: RootApp,
  initialParams: {
    Title: 'English',
  },
};

export default _default;

import React, {FC} from 'react';
import {TabNavigateTheme} from 'assets/themes';
import {createMyNavigator} from 'Providers/Navigates/Custom/BottomTabNavigation';
import HomeScreen from '../HomeScreen';
import {IScreenComponent, PropsBase} from 'Providers/Navigates/type';
import {
  ParamListTabNavigate,
  ParamListNavigateBase,
} from 'Providers/Navigates/Params';
const TabNavigate = createMyNavigator<ParamListTabNavigate>();

const RootApp: FC<PropsBase<ParamListNavigateBase, 'Default'>> = () => {
  return (
    <TabNavigate.Navigator tabBarOptions={TabNavigateTheme.tabBarOptions}>
      <TabNavigate.Screen {...HomeScreen} />
    </TabNavigate.Navigator>
  );
};
const _default: IScreenComponent<'RootApp'> = {
  name: 'RootApp',
  component: RootApp,
  // initialParams: {
  //   Title: 'English',
  // },
};

export default _default;

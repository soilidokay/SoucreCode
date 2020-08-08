import * as React from 'react';
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  createNavigatorFactory,
  TabNavigationState,
  Route,
} from '@react-navigation/native';
import * as OwnType from './type';
import {BottomNavigation} from 'react-native-paper';

const BottomTabNavigation: React.FC<OwnType.TabNavigateProps> = (props) => {
  const {children, screenOptions, initialRouteName, tabBarOptions} = props;
  const {navigation, state, descriptors} = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const [index, setIndex] = React.useState(state.index);

  const scenes: any = {};

  const [routes] = React.useState([] as OwnType.Route[]);
  if (__DEV__) {
    while (routes.length > 0) {
      routes.shift();
    }
  }
  state.routes.forEach((router: Route<string>) => {
    const key = descriptors[router.key].options.title || router.name;
    scenes[key] = descriptors[router.key].render;
    routes.push({key, title: key, icon: 'home'});
  });

  const renderScene = BottomNavigation.SceneMap(scenes);

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={tabBarOptions?.tabStyle}
        activeColor={tabBarOptions?.activeTintColor}
        inactiveColor={tabBarOptions?.inactiveTintColor}
      />
    </NavigationHelpersContext.Provider>
  );
};

export const createMyNavigator = createNavigatorFactory<
  TabNavigationState,
  OwnType.TabNavigateProps,
  OwnType.TabNavigationEventMap,
  typeof BottomTabNavigation
>(BottomTabNavigation);

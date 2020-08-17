import * as React from 'react';

import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  createNavigatorFactory,
  TabNavigationState,
  TabActions,
  TabRouterOptions,
} from '@react-navigation/native';
import * as OwnType from '../type';
import {CustomTarNavigate} from './CustomTarNavigate';
import {View, StyleSheet} from 'react-native';
import TabBar from './TabBar';
const BottomTabNavigation: React.FC<OwnType.TabNavigateProps> = (props) => {
  const {children, screenOptions, initialRouteName} = props;
  const {state, navigation, descriptors} = useNavigationBuilder<
    TabNavigationState,
    TabRouterOptions,
    OwnType.TabNavigationOptions,
    OwnType.TabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const onPressTab = (sender: TabBar, index: number) => {
    const route = state.routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
      data: {
        isAlreadyFocused: route.key === state.routes[state.index].key,
      },
    });
    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...TabActions.jumpTo(route.name),
        target: state.key,
      });
    }
  };
  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={styles.container}>
        {descriptors[state.routes[state.index].key].render()}
        <View style={StyleSheet.absoluteFill} pointerEvents={'box-none'}>
          <View style={styles.WrapTabBar} pointerEvents={'box-none'}>
            <CustomTarNavigate
              onPressTab={onPressTab}
              descriptors={descriptors}
              routes={state.routes}
            />
          </View>
        </View>
      </View>
    </NavigationHelpersContext.Provider>
  );
};

export const createMyNavigator = createNavigatorFactory<
  TabNavigationState,
  OwnType.TabNavigationOptions,
  OwnType.TabNavigationEventMap,
  typeof BottomTabNavigation
>(BottomTabNavigation);

const styles = StyleSheet.create({
  container: {flex: 1},
  WrapTabBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

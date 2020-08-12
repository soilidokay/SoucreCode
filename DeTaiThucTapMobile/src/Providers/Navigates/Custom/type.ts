import {DefaultNavigatorOptions, RouteProp} from '@react-navigation/native';
import {
  BottomTabNavigationConfig,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs/src/types';
import {TabRouterOptions} from '@react-navigation/routers/lib/typescript/src/TabRouter';
import {IStackNavigateTheme} from 'assets/themes/type';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamNavigate} from '../Params';
import {TIconComponent} from '../type';
// import {StyleProp, ViewStyle} from 'react-native';
// // Props accepted by the view
// export declare type TabNavigationConfig = {
//   tabBarStyle: StyleProp<ViewStyle>;
//   contentStyle: StyleProp<ViewStyle>;
//   children: any[];
// };

export declare type TabNavigationOptions = {
  title?: string;
  icon?: string;
  IconComponent?: TIconComponent;
};
export declare type TabNavigationConfig = BottomTabNavigationConfig<
  BottomTabBarOptions
>;
// // Supported screen options
// export declare type TabNavigationOptions = {
//   title?: string;
// };

// // Map of event name and the type of data (in event.data)
// //
// // canPreventDefault: true adds the defaultPrevented property to the
// // emitted events.
export declare type TabNavigationEventMap = {
  tabPress: {
    data: {isAlreadyFocused: boolean};
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
export declare type TabNavigateProps = DefaultNavigatorOptions<
  TabNavigationOptions
> &
  TabRouterOptions &
  TabNavigationConfig;

export declare type StackScreenProps<RouteName extends keyof ParamNavigate> = {
  navigation?: StackNavigationProp<ParamNavigate, RouteName>;
  route?: RouteProp<ParamNavigate, RouteName>;
};

export interface StackNavigateProps<RouteName extends keyof ParamNavigate>
  extends StackScreenProps<RouteName> {
  theme: IStackNavigateTheme;
}

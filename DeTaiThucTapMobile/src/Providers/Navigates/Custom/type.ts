import {
  DefaultNavigatorOptions,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationConfig,
} from '@react-navigation/bottom-tabs/src/types';
import {TabRouterOptions} from '@react-navigation/routers/lib/typescript/src/TabRouter';
import {IconSource} from 'react-native-paper/lib/typescript/src/components/Icon';
import {IStackNavigateTheme} from 'assets/themes/type';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListNavigateBase} from '../Params';
// import {StyleProp, ViewStyle} from 'react-native';
// // Props accepted by the view
// export declare type TabNavigationConfig = {
//   tabBarStyle: StyleProp<ViewStyle>;
//   contentStyle: StyleProp<ViewStyle>;
//   children: any[];
// };
export declare type TabNavigationConfig = BottomTabNavigationConfig;
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
export declare type Route = {
  key: string;
  title?: string;
  icon?: IconSource;
  badge?: string | number | boolean;
  color?: string;
  accessibilityLabel?: string;
  testID?: string;
};

// The props accepted by the component is a combination of 3 things
export declare type TabNavigateProps = DefaultNavigatorOptions<
  BottomTabNavigationOptions
> &
  TabRouterOptions &
  TabNavigationConfig;

export declare type StackScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation?: StackNavigationProp<ParamList, RouteName>;
  route?: RouteProp<ParamList, RouteName>;
};

export interface StackNavigateProps<
  RouteName extends keyof ParamListNavigateBase = 'Default'
> extends StackScreenProps<ParamListNavigateBase, RouteName> {
  theme: IStackNavigateTheme;
}

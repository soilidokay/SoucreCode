import TabBar from './TabBar';
import {StyleViewComponent} from 'Types';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {StackScreenProps, TabNavigationOptions} from '../type';
import {Route, Descriptor, TabNavigationState} from '@react-navigation/native';
import {TIconComponent} from 'Providers/Navigates/type';

export interface HoverTabProps {
  indexActive?: number;
  content?: JSX.Element;
  width: number;
  AmountTabBar: number;
  backgroundColor?: string;
  height: number;
}
export interface HoverTabState {
  index: number;
  content: JSX.Element | undefined;
}
// declare class TabBar {}
export declare type DescriptorsTabNavigate = Record<
  string,
  Descriptor<
    Record<string, object | undefined>,
    string,
    TabNavigationState,
    TabNavigationOptions,
    {}
  >
>;
export interface TabBarProps {
  onPress: (sender: TabBar, index?: number) => void;
  index: number;
  data?: {item: Route<string>; options?: TabNavigationOptions};
  style?: StyleViewComponent;
  IconComponent?: TIconComponent;
  isActive?: boolean;
}
export interface TabBarState {
  isActive: boolean;
}

export interface TabNavigateProps
  extends StackScreenProps<KeyNavigate.Default> {
  routes: Route<string>[];
  descriptors: DescriptorsTabNavigate;
  onPressTab: (sender: TabBar, index: number) => void;
  backgroundColor?: string;
}
export interface TabNavigateState {}
export interface OptionsEvent {
  type: string;
  target: string;
  canPreventDefault: boolean;
}

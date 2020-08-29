import {PropsBase, LoginPropsBase} from '../type';
import {
  ParamNavigate,
  KeyNavigate,
  ParamStackNavigateLoginList,
} from '../Params';
import {
  EventListenerCallback,
  EventMapCore,
  StackNavigationState,
} from '@react-navigation/native';
import {StackNavigationEventMap} from '@react-navigation/stack/lib/typescript/src/types';

export interface IScreenPropsBase<RouteName extends keyof ParamNavigate>
  extends PropsBase<RouteName> {}

export interface IScreenLoginPropsBase<
  RouteName extends keyof ParamStackNavigateLoginList
> extends LoginPropsBase<RouteName> {}

export interface IHomeScreenProps extends IScreenPropsBase<KeyNavigate.Home> {}
export interface IGroupDetailScreenProps
  extends IScreenPropsBase<KeyNavigate.GroupDetail> {}

export interface IExtendFeatureScreenProps
  extends IScreenPropsBase<KeyNavigate.ExtendFeature> {}

export interface IRootAppScreenProps
  extends IScreenPropsBase<KeyNavigate.RootApp> {}

export interface ICategoryDetailScreenProps
  extends IScreenPropsBase<KeyNavigate.CategoryDetail> {}
export interface IVocabularyDetailScreenProps
  extends IScreenPropsBase<KeyNavigate.VocabularyDetail> {}
export interface ILearningGoalDetailScreenProps
  extends IScreenPropsBase<KeyNavigate.LearningGoalDetail> {}

export declare type EventNavigateMap = StackNavigationEventMap &
  EventMapCore<StackNavigationState>;
export declare type EventListenerCallbackType<
  EventName extends keyof EventNavigateMap
> = EventListenerCallback<EventNavigateMap, EventName>;

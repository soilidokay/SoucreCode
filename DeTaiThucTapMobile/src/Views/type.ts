import {IHomeTheme} from 'assets/themes/type';
import {
  GroupCategory,
  VocabularyCategory,
  Vocabulary,
  LearningGoal,
  TableTime,
} from 'Providers/Models/type';
import {FlatListProps, FlatList} from 'react-native/index';
import {
  StackScreenProps,
  StackScreenLoginProps,
} from 'Providers/Navigates/Custom/type';
import {
  ParamNavigate,
  KeyNavigate,
  ParamStackNavigateLoginList,
  KeyNavigateLogin,
} from 'Providers/Navigates/Params';
import {TIconComponent} from 'Providers/Navigates/type';
import {GestureResponderEvent} from 'react-native/index';
export interface PropComponentApp {
  data?: any[] | any;
  refresh: () => void;
}
export interface LoginPropsView<
  RouteName extends keyof ParamStackNavigateLoginList
> extends PropComponentApp, StackScreenLoginProps<RouteName> {}

export interface PropsView<RouteName extends keyof ParamNavigate>
  extends PropComponentApp,
    StackScreenProps<RouteName> {}

export interface PropsHome extends PropsView<KeyNavigate.Home> {
  theme?: IHomeTheme;
  data?: [GroupCategory[], LearningGoal[], Vocabulary[]];
}
export enum ModeActive {
  carousel,
  List,
}
export interface StateHome {
  modeActive: ModeActive;
}
export interface PropsGroupDetail extends PropsView<KeyNavigate.GroupDetail> {
  data?: VocabularyCategory[];
}
export interface PropsCategoryDetail
  extends PropsView<KeyNavigate.CategoryDetail> {
  data?: Vocabulary[];
}
export interface PropsVocabularyDetail
  extends PropsView<KeyNavigate.VocabularyDetail> {
  data?: Vocabulary;
}

export class FlatListHome extends FlatList<GroupCategory> {}
export declare type FlatListHomeProp = FlatListProps<GroupCategory>;

export interface ContentItemCategoryProps {
  item?: VocabularyCategory;
  onPress?: (event: GestureResponderEvent) => void;
}
export declare type DataControlBar = {
  icon: string;
  onPress?: (item?: any) => void;
  ComponentIcon?: TIconComponent;
  ColorIcon?: string;
  ColorBorder?: string;
};
export interface LayoutControlBarProps {
  DataButton: DataControlBar[];
  item?: any;
}
export interface PropsLearningGoal extends PropsView<KeyNavigate.LearningGoal> {
  data?: LearningGoal[];
}
export interface PropsTableTime extends PropsView<KeyNavigate.TimeTable> {
  data?: TableTime[];
}
export interface PropsUserManage extends PropsView<KeyNavigate.ExtendFeature> {}
export class FlatListLearningGold extends FlatList<LearningGoal> {}
export declare type FlatListLearningGoldProp = FlatListProps<LearningGoal>;

export interface PropsLearningGoalDetail
  extends PropsView<KeyNavigate.LearningGoalDetail> {
  data?: Vocabulary[];
}
export class FlatListTableTime extends FlatList<TableTime> {}
export declare type FlatListTableTimeProp = FlatListProps<TableTime>;

export interface ContentVocabularyProps {
  item?: Vocabulary;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface PropsLogin extends LoginPropsView<KeyNavigateLogin.Login> {}
export interface PropsRegister
  extends LoginPropsView<KeyNavigateLogin.Register> {}
export interface StateLogin {
  isProcess: boolean;
}

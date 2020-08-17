import {IHomeTheme} from 'assets/themes/type';
import {
  GroupCategory,
  VocabularyCategory,
  Vocabulary,
  LearningGoal,
} from 'Providers/Models/type';
import {FlatListProps, FlatList} from 'react-native/index';
import {StackScreenProps} from 'Providers/Navigates/Custom/type';
import {ParamNavigate, KeyNavigate} from 'Providers/Navigates/Params';
import {TIconComponent} from 'Providers/Navigates/type';
import {GestureResponderEvent} from 'react-native/index';
export interface PropComponentApp {
  data?: any[] | any;
}

export interface PropsView<RouteName extends keyof ParamNavigate>
  extends PropComponentApp,
    StackScreenProps<RouteName> {}

export interface PropsHome extends PropsView<KeyNavigate.Home> {
  theme?: IHomeTheme;
  data?: GroupCategory[];
}
export interface PropsGroupDetail extends PropsView<KeyNavigate.GroupDetail> {
  data?: VocabularyCategory[];
}
export interface PropsCategoryDetail
  extends PropsView<KeyNavigate.CategoryDetail> {
  data?: Vocabulary[];
}

export class FlatListHome extends FlatList<GroupCategory> {}
export declare type FlatListHomeProp = FlatListProps<GroupCategory>;

export interface ContentItemCategoryProps {
  item?: VocabularyCategory;
  onPress?: (event: GestureResponderEvent) => void;
}
export declare type DataControlBar = {
  icon: string;
  onPress?: () => void;
  ComponentIcon?: TIconComponent;
  ColorIcon?: string;
  ColorBorder?: string;
};
export interface LayoutControlBarProps {
  DataButton: DataControlBar[];
}
export interface PropsLearningGoal extends PropsView<KeyNavigate.LearningGoal> {
  data?: LearningGoal[];
}

export class FlatListLearningGold extends FlatList<LearningGoal> {}
export declare type FlatListLearningGoldProp = FlatListProps<LearningGoal>;

export interface PropsLearningGoalDetail
  extends PropsView<KeyNavigate.LearningGoalDetail> {
  data?: Vocabulary[];
}

export interface ContentVocabularyProps {
  item?: Vocabulary;
  onPress?: (event: GestureResponderEvent) => void;
}

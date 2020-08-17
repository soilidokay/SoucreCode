import {Vocabulary, VocabularyCategory} from 'Providers/Models/type';
import {FlatListProps, FlatList} from 'react-native';

export interface LayoutGroupProps {
  TitleComponent?: JSX.Element;
  Content?: JSX.Element;
}
export interface TitleGroupProps {
  onPress?: () => void;
  ActionName?: string;
}
export interface ContentCategoryProps {
  data: Vocabulary[];
  renderItem: (item: Vocabulary, index?: number) => JSX.Element;
}
export interface ContentGroupProps {
  data: VocabularyCategory[];
  RenderItem: (item?: VocabularyCategory, index?: number) => JSX.Element;
}
export declare type FlatListContentCategoryHomeProp = FlatListProps<Vocabulary>;
export class FlatListContentCategory extends FlatList<Vocabulary> {}

export declare type FlatListContentGroupProp = FlatListProps<
  VocabularyCategory | undefined
>;
export class FlatListContentGroup extends FlatList<
  VocabularyCategory | undefined
> {}

export interface LayoutVocabularyProps {
  Content: JSX.Element;
}

export interface ItemVocabularyProps {
  item: Vocabulary;
}
export interface ViewIconProps {
  icon: string;
}
export interface ItemVocabularyCategoryProps {
  item: VocabularyCategory | undefined;
  onPress?: () => void;
  onPressAddToList?: () => void;
}

export interface LayoutItemCategoryProps {
  Content: JSX.Element | JSX.Element[];
  Action: JSX.Element | JSX.Element[];
}
export interface LayoutItemVocabularyProps extends LayoutItemCategoryProps {
  Image: JSX.Element | JSX.Element[];
}
export interface LayoutItemLearningGoalProps {
  Icon: JSX.Element | JSX.Element[];
  Text: JSX.Element | JSX.Element[];
  Action: JSX.Element | JSX.Element[];
}

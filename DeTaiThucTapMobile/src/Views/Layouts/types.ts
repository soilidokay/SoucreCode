import {Vocabulary, VocabularyCategory} from 'Providers/Models/type';
import {FlatListProps, FlatList} from 'react-native';

export interface LayoutGroupProps {
  TitleComponent?: JSX.Element;
  Content?: JSX.Element;
}
export interface TitleGroupProps {
  onPressMore?: () => void;
}
export interface ContentCategoryProps {
  data: Vocabulary[];
}
export interface ContentGroupProps {
  data: VocabularyCategory[];
  onPressItem: () => void;
  onPressAddToList: () => void;
}
export declare type FlatListContentCategoryHomeProp = FlatListProps<Vocabulary>;
export class FlatListContentCategory extends FlatList<Vocabulary> {}

export declare type FlatListContentGroupProp = FlatListProps<VocabularyCategory | null>;
export class FlatListContentGroup extends FlatList<VocabularyCategory | null> {}

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
  item: VocabularyCategory | null;
  onPress?: () => void;
  onPressAddToList?: () => void;
}

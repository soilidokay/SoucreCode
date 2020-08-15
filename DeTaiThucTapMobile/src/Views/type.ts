import {IHomeTheme} from 'assets/themes/type';
import {GroupCategory, VocabularyCategory} from 'Providers/Models/type';
import {FlatListProps, FlatList} from 'react-native/index';
import {StackScreenProps} from 'Providers/Navigates/Custom/type';
import {ParamNavigate, KeyNavigate} from 'Providers/Navigates/Params';
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

export class FlatListHome extends FlatList<GroupCategory> {}
export declare type FlatListHomeProp = FlatListProps<GroupCategory>;

import {IHomeTheme} from 'assets/themes/type';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

export interface PropsHome {
  theme?: IHomeTheme;
  navigation?: StackNavigationProp<ParamListBase>;
}

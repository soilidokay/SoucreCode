import {StyleViewComponent} from 'Types';
import {TouchableOpacityProperties} from 'react-native';
import {TIconComponent} from 'Providers/Navigates/type';

export interface ButtonIconProps extends TouchableOpacityProperties {
  style?: StyleViewComponent;
  icon?: string;
  styleIcon?: StyleViewComponent;
  sizeIcon?: number;
  colorIcon?: string;
  IconComponent?: TIconComponent;
}

export interface ButtonBoxProps extends TouchableOpacityProperties {}

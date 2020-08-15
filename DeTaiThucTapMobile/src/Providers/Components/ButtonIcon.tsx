import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ButtonIconProps} from './type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleViewComponent} from 'Types';

const ButtonIcon: FC<ButtonIconProps> = (props) => {
  const ConfigStyle: StyleViewComponent = {opacity: props.disabled ? 0.7 : 1};
  const IconComponent = props.IconComponent ?? FontAwesome5Icon;
  return (
    <TouchableOpacity
      delayPressIn={200}
      {...props}
      style={[ConfigStyle, styles.container, props.style]}>
      <IconComponent
        style={props.styleIcon}
        color={props.colorIcon}
        size={props.sizeIcon}
        name={props.icon ?? 'home'}
      />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
ButtonIcon.defaultProps = {
  icon: 'home',
  styleIcon: {},
  colorIcon: 'lime',
  sizeIcon: 15,
  disabled: false,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

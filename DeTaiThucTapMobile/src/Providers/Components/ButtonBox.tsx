import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ButtonBoxProps} from './type';

const ButtonBox: FC<ButtonBoxProps> = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};

export default ButtonBox;
ButtonBox.defaultProps = {
  disabled: false,
};
const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

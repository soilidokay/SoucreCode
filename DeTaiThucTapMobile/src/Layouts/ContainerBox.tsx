import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {IContainerBox} from './type';

const ContainerBox: FC<IContainerBox> = (props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
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
export default ContainerBox;

import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {ContainerVewProps} from './type';
import {StyleViewComponent} from 'Types';

const ContainerFlex: FC<ContainerVewProps> = (props) => {
  const {Flex, Horizontal} = props;
  const ConfigStyle: StyleViewComponent = {
    flex: Flex,
    flexDirection: Horizontal ? 'row' : 'column',
  };
  return (
    <View style={[ConfigStyle, styles.container, props.style]}>
      {props.children}
    </View>
  );
};
ContainerFlex.defaultProps = {
  Horizontal: false,
  Flex: 1,
};
export default ContainerFlex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

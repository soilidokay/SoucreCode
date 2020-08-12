import React, {FC, useState} from 'react';
import {StyleSheet, View, LayoutChangeEvent} from 'react-native';
import {LayoutCircleProps, LayoutCircleState} from './type';
import {StyleViewComponent} from 'Types';
import Colors from 'assets/Colors';

const LayoutCircle: FC<LayoutCircleProps> = (props) => {
  const [state, setState] = useState<LayoutCircleState>({
    weight: 50,
  });
  const CustomStyle: StyleViewComponent = {
    height: props.Horizontal ? state.weight : 'auto',
    width: props.Horizontal ? 'auto' : state.weight,
    borderRadius: state.weight / 2,
  };

  const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    const {width, height} = nativeEvent.layout;
    setState({weight: props.Horizontal ? width : height});
  };

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, CustomStyle, props.style]}>
      {props.children}
    </View>
  );
};
LayoutCircle.defaultProps = {
  Horizontal: false,
};
export default LayoutCircle;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.Yellow,
    backgroundColor: Colors.White,
    borderWidth: 1,
  },
});

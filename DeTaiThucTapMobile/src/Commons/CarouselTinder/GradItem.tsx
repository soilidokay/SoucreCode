import React, {FC} from 'react';
import {Animated} from 'react-native';

type Props = {
  HeightContainer: number;
  WidthContainer: number;
  RotateMin: number;
  RotateMax: number;
  AnimatedConfig: Function;
  ValueAnimated: Animated.ValueXY | Animated.AnimatedAddition;
  index: number;
  indexActive: number;
};

const GradItem: FC<Props> = props => (
  <Animated.View
    style={[
      {
        height: props.HeightContainer || 200,
        width: props.WidthContainer || 100,
      },
      props.AnimatedConfig(props),
    ]}>
    {props.children}
  </Animated.View>
);

export default GradItem;

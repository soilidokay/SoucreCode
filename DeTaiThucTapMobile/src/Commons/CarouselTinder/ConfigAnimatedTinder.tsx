import {Dimensions} from 'react-native';
const AmountDisplayCard = 2;
const ShadowStack = 5;
const {width: widthScreen} = Dimensions.get('window');

const GetValue = (value: number) => {
  return typeof value === 'number' ? value : 0;
};

export const AnimatedActive = (props: any) => {
  const {ValueAnimated} = props;
  return {
    transform: [
      {translateY: ValueAnimated.y},
      {translateX: ValueAnimated.x},
      {
        rotate: ValueAnimated.x.interpolate({
          inputRange: [-props.WidthContainer, 0, props.WidthContainer],
          outputRange: [
            GetValue(props.RotateMin) + 'deg',
            '0deg',
            GetValue(props.RotateMax) + 'deg',
          ],
        }),
      },
    ],
  };
};
export const AnimatedBottom = (props: any) => {
  const {ValueAnimated} = props;
  const index = props.indexActive - props.index - 1;
  if (index < 0 || index >= AmountDisplayCard) {
    return {transform: [{translateX: 2 * widthScreen}], opacity: 0};
  } else {
    return (() => {
      const RatioScaleNext = (index + 1) * 0.05;
      const RatioScale = index * 0.05;
      const WidthTranslateYNext =
        props.WidthContainer * RatioScaleNext + (index + 1) * ShadowStack;
      const WidthTranslateY =
        props.WidthContainer * RatioScale + index * ShadowStack;

      return {
        transform: [
          {
            translateY: ValueAnimated.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [WidthTranslateYNext, WidthTranslateY, 0],
            }),
          },
          {
            scale: ValueAnimated.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1 - RatioScaleNext, 1 - RatioScale, 1],
            }),
          },
        ],
        opacity: ValueAnimated.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            (AmountDisplayCard - index - 1) / AmountDisplayCard,
            (AmountDisplayCard - index) / AmountDisplayCard,
            1,
          ],
        }),
      };
    })();
  }
};
export const AnimatedLeftBottom = (props: any) => {
  const {ValueAnimated} = props;

  const index = props.indexActive - props.index - 1;

  return index < 0 || index >= AmountDisplayCard
    ? {transform: [{translateX: 2 * widthScreen}], opacity: 0}
    : {
        transform: [
          {
            translateY: ValueAnimated.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [(index + 1) * ShadowStack, index * ShadowStack, 0],
            }),
          },
          {
            translateX: ValueAnimated.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [(index + 1) * ShadowStack, index * ShadowStack, 0],
            }),
          },
        ],
        opacity: ValueAnimated.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            (AmountDisplayCard - index - 1) / AmountDisplayCard,
            (AmountDisplayCard - index) / AmountDisplayCard,
            1,
          ],
        }),
      };
};

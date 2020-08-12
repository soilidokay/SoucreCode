import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import * as Shape from 'd3-shape';
import {HoverTabProps, HoverTabState} from './type';
import Svg, {Path} from 'react-native-svg';

export class HoverTab extends PureComponent<HoverTabProps, HoverTabState> {
  private ValueAnimated: Animated.AnimatedValue;
  private ValueAnimatedTab: Animated.AnimatedValue;
  private prevIndex: number = -1;
  private Config: any;
  constructor(props: HoverTabProps) {
    super(props);
    this.state = {
      index: props.indexActive || 0,
      content: props.content,
    };
    this.ValueAnimated = new Animated.Value(this.state.index);
    this.ValueAnimatedTab = new Animated.Value(0);

    const width = props.width || 105;
    const height = (width * 3) / 5;
    const inputRange = [];
    const outputRange = [];

    for (let i = 0; i < props.AmountTabBar; i++) {
      inputRange.push(i);
      outputRange.push(i * width);
    }

    this.Config = {
      height,
      width,
      ShapeBorder: Shape.line()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(Shape.curveBundle)([
        [0, 0],
        [width * 0.1, height * 0.1],
        [width * 0.15, height * 0.9],
        [width - width * 0.15, height * 0.9],
        [width - width * 0.1, height * 0.1],
        [width, 0],
      ]),
      StyleAnimated: {
        transform: [
          {
            translateX: this.ValueAnimated.interpolate({
              inputRange,
              outputRange,
            }),
          },
        ],
      },
      StyleAnimatedTab: {
        transform: [
          {
            translateY: this.ValueAnimatedTab.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [-height * 0.3, height, -height * 0.3],
            }),
          },
        ],
        opacity: this.ValueAnimatedTab.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        }),
      },
    };
    this.SetActive = this.SetActive.bind(this);
  }

  /**
   * Athor: Unmatched Tai Nguyen - Create : 12 /08 /2019 - 23 :28 :12
   *
   */
  SetActive = (index: number, content: JSX.Element) => {
    this.setState({index, content});
  };

  componentDidUpdate() {
    if (this.prevIndex === this.state.index) {
      return;
    }

    this.prevIndex = this.state.index;

    this.ValueAnimatedTab.setValue(0);
    Animated.parallel([
      Animated.spring(this.ValueAnimatedTab, {
        toValue: 2,
        // duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(this.ValueAnimated, {
        toValue: this.state.index,
        useNativeDriver: true,
      }),
    ]).start();
  }
  render() {
    let {
      height,
      width,
      ShapeBorder,
      StyleAnimated,
      StyleAnimatedTab,
    } = this.Config;

    return (
      <Animated.View style={StyleAnimated}>
        <Svg height={height} width={width}>
          <Path d={ShapeBorder} fill={'white'} />
        </Svg>
        <View style={styles.absolute}>
          <Animated.View style={[styles.containerContent, StyleAnimatedTab]}>
            <View
              style={[
                styles.content,
                {
                  height: height * 0.9,
                  width: height,
                  borderRadius: height,
                  backgroundColor: this.props.backgroundColor,
                },
              ]}>
              {this.state.content}
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  absolute: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0},
  containerContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'lime',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

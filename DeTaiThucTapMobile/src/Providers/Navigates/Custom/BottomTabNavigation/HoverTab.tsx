import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import * as Shape from 'd3-shape';
import {HoverTabProps, HoverTabState} from './type';
import Svg, {Path} from 'react-native-svg';
const {width: WidthScreen} = Dimensions.get('window');
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
    const {width, height} = props;
    const inputRange = [];
    const outputRange = [];
    const WidthStart = WidthScreen - width / 2;
    const WidthEnd = WidthStart + width;
    for (let i = 0; i < props.AmountTabBar; i++) {
      inputRange.push(i);
      outputRange.push(-WidthStart + i * width);
    }

    this.Config = {
      height,
      width,
      ShapeBorder: Shape.line()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(Shape.curveCatmullRomClosed)([
        [0, 0],
        [0, height],
        [2 * WidthScreen, height],
        [2 * WidthScreen, 0],
        [WidthEnd, 0],
        [WidthEnd - width * 0.3, height * 0.55],
        [WidthStart + width * 0.3, height * 0.55],
        [WidthStart, 0],
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
  static defaultProps: HoverTabProps = {
    width: 105,
    AmountTabBar: 4,
    height: 63,
  };
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
    let {height, ShapeBorder, StyleAnimated, StyleAnimatedTab} = this.Config;

    return (
      <Animated.View style={StyleAnimated} pointerEvents={'box-none'}>
        <Svg pointerEvents={'box-none'} height={height} width={WidthScreen * 2}>
          <Path d={ShapeBorder} fill={this.props.backgroundColor} />
        </Svg>
        <View style={styles.absolute} pointerEvents={'box-none'}>
          <Animated.View
            pointerEvents={'box-none'}
            style={[styles.containerContent, StyleAnimatedTab]}>
            <View
              style={[
                styles.content,
                {
                  height: height * 0.8,
                  width: height * 0.8,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * @from @author https://gitlab.com/soilidokay/MyLibaries
 * @convert library javascript to typescript
 * @note don't edit
 */
import React, {Component, FC} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Easing,
  PanResponderInstance,
  ListRenderItem,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';
import LoadingComponent from '../LoadingComponent';
import {
  MaxStackValueAnimated,
  widthScreen,
  heightScreen,
  StateVectorEnum,
  LeftRotateValue,
  RightRotateValue,
  UpRotateValue,
  DownRotateValue,
} from './SupportCarousel';
import {
  AnimatedBottom,
  AnimatedLeftBottom,
  AnimatedActive,
} from './ConfigAnimatedTinder';
import GradItem from './GradItem';

export enum ShadowDirectType {
  LeftBottom = 'LeftBottom',
  Bottom = 'Bottom',
}

const GetAnimatedStack = (shadowDirect: ShadowDirectType) => {
  switch (shadowDirect) {
    case 'Bottom':
      return AnimatedBottom;
    default:
      return AnimatedLeftBottom;
  }
};

const ItemCarousel: FC<any> = (props) => {
  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={props.isActive ? 'auto' : 'none'}>
      <GradItem
        AnimatedConfig={props.AnimatedConfig}
        ValueAnimated={props.ValueAnimated}
        index={props.index}
        indexActive={props.indexActive}
        {...{
          WidthContainer: props.widthItem,
          HeightContainer: props.heightItem,
          RotateMin: -30,
          RotateMax: 30,
        }}>
        {props.children}
      </GradItem>
    </View>
  );
};

const renderItem: ListRenderItem<any> = () => {
  return <View />;
};

const keyExtractor = (item: any, index: number) => {
  return index.toString();
};

/* ========== Block: CarouselTinder ========== */
interface State {
  isLoading: boolean;
}
interface Props {
  data: Array<any>;
  isRemoveSource: boolean;
  renderItem: Function;
  keyExtractor: Function;
  amountDisplay: number;
  HeightContainer?: number;
  WidthContainer?: number;
  onLeft: Function;
  onRight: Function;
  onUp: Function;
  onDown: Function;
  thresholdSwipe: number;
  FetchData: Function;
  minAmountFetchData: number;
  ComponentLoading: Element;
  ShadowDirect: ShadowDirectType;
  DisableRemove: {
    Left?: boolean;
    Right?: boolean;
    Up?: boolean;
    Down?: boolean;
  };
}
export class CarouselTinder extends Component<Props, State> {
  static defaultProps = {
    data: [],
    renderItem: renderItem,
    keyExtractor: keyExtractor,
    isRemoveSource: true,
    amountDisplay: 20,
    HeightContainer: heightScreen * 0.8,
    WidthContainer: widthScreen * 0.9,
    onLeft: () => {},
    onRight: () => {},
    onUp: () => {},
    onDown: () => {},
    FetchData: () => {
      return [];
    },
    thresholdSwipe: 0.35,
    minAmountFetchData: 21,
    ComponentLoading: <LoadingComponent />,
    ShadowDirect: ShadowDirectType.Bottom,
    DisableRemove: {
      Left: false,
      Right: false,
      Up: false,
      Down: false,
    },
  };

  private ValueAnimated: Animated.ValueXY;
  private ValueAnimatedStack: Animated.AnimatedAddition;
  private panResponder: PanResponderInstance;
  private indexActive: number;
  private dataQueue: Array<any>;
  private dataBuffer: Array<any>;
  private isLoadData: boolean;
  constructor(props: Props) {
    super(props);
    this.state = {isLoading: true};
    this.ValueAnimated = new Animated.ValueXY({x: 0, y: 0});
    this.ValueAnimatedStack = this.getAnimatedStack(this.ValueAnimated);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: Animated.event(
        [null, {dx: this.ValueAnimated.x, dy: this.ValueAnimated.y}],
        {
          listener: this.onPanResponderMove,
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: this.onPanResponderRelease,
    });
    this.indexActive = -1;
    this.dataQueue = [];
    this.dataBuffer = [];
    this.isLoadData = false;
    this.snapToDataBuffer(props.data);
    this.generateData();
    // bind
    this.NextCard = this.NextCard.bind(this);
    this.ActionNextCard = this.ActionNextCard.bind(this);
  }

  snapToDataBuffer = (data: Array<any>) => {
    if (this.props.isRemoveSource) {
      this.dataBuffer = data;
    } else {
      this.dataBuffer = [...data];
    }
  };

  private getAnimatedStack = (valueAnimated: Animated.ValueXY) => {
    const {x, y} = valueAnimated;
    const TempValue = Animated.add(
      Animated.multiply(x, x),
      Animated.multiply(y, y),
    );
    return TempValue.interpolate({
      inputRange: [-1, 0, MaxStackValueAnimated, MaxStackValueAnimated + 1],
      outputRange: [0, 0, 1, 1],
    });
  };

  private onMoveShouldSetPanResponder = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
  };

  private onPanResponderMove = (/* event: NativeSyntheticEvent<NativeTouchEvent> */) => {
    // console.log(event);
  };

  private onPanResponderRelease = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    this.setupEventStateVector(gestureState).then((isDelete) => {
      if (isDelete) {
        this.ReloadCard();
      }
    });
  };

  ReloadCard = () => {
    if (this.indexActive > -1) {
      this.indexActive--;
    }
    if (this.indexActive < 4) {
      this.deleteItems();
      this.generateData();
    }
    this.Refresh();
  };

  private setupEventStateVector = async (
    gestureState: PanResponderGestureState,
  ) => {
    let Temp = this.getStateVector(gestureState);
    let isRemove = this.ActionNextCard(Temp);
    return isRemove;
  };

  generateData = () => {
    let tempData = this.getDataFromProp().reverse();
    this.indexActive += tempData.length;
    this.dataQueue = tempData.concat(this.dataQueue);
    this.onFetchData();
  };

  private getDataFromProp = () => {
    const {amountDisplay} = this.props;
    return this.dataBuffer.splice(0, amountDisplay);
  };
  isLoadingView = () => {
    return this.indexActive < 3;
  };
  AdditionData = (data: Array<any>) => {
    if (Array.isArray(data) && data.length > 1) {
      this.dataBuffer.splice(this.dataBuffer.length - 1, 0, ...data);
      if (this.isLoadingView()) {
        this.generateData();
        this.Refresh();
      }
    }
    this.isLoadData = false;
  };

  private onFetchData = () => {
    if (this.isLoadData) {
      return;
    }
    this.isLoadData = true;
    if (this.dataBuffer.length < this.props.minAmountFetchData) {
      setTimeout(() => {
        let data = this.props.FetchData();
        if (typeof data === 'object' && data.constructor.name === 'Promise') {
          data.then(this.AdditionData).catch(() => this.AdditionData([]));
        } else {
          this.AdditionData(data);
        }
      }, 10);
    }
  };

  BackItemActiveAnimated = (toValue: number) => {
    return new Promise((resolve) => {
      Animated.spring(this.ValueAnimated, {
        toValue,
        useNativeDriver: true,
      }).start(() => resolve(false));
    });
  };

  RemoveItemActiveAnimated = (toValue: number | {x: number; y: number}) => {
    return new Promise((resolve) => {
      Animated.timing(this.ValueAnimated, {
        toValue,
        duration: 250,
        easing: Easing.bezier(1, 0.32, 0.98, 0.16),
        useNativeDriver: true,
      }).start(() => resolve(true));
    });
  };

  Refresh = () => {
    return new Promise((resolve) => {
      this.setState({isLoading: !this.state.isLoading}, resolve);
    });
  };

  private deleteItems = () => {
    if (this.dataQueue.length < 1) {
      return;
    }
    this.dataQueue.splice(
      this.indexActive + 1,
      this.dataQueue.length - this.indexActive - 1,
    );
  };

  private getStateVector: any = (gestureState: PanResponderGestureState) => {
    let vector = Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
    if (vector) {
      let threshold = Math.abs(gestureState.dy) / heightScreen;
      if (threshold < this.props.thresholdSwipe) {
        return StateVectorEnum.None;
      }
      if (gestureState.dy < 0) {
        return StateVectorEnum.Up;
      } else {
        return StateVectorEnum.Down;
      }
    } else {
      let threshold = Math.abs(gestureState.dx) / widthScreen;
      if (threshold < this.props.thresholdSwipe) {
        return StateVectorEnum.None;
      }
      if (gestureState.dx < 0) {
        return StateVectorEnum.Left;
      } else {
        return StateVectorEnum.Right;
      }
    }
  };

  _onLeft = async () => {
    return await this.RemoveItemActiveAnimated({x: LeftRotateValue, y: 0});
  };
  _onRight = async () => {
    return await this.RemoveItemActiveAnimated({x: RightRotateValue, y: 0});
  };
  _onUp = async () => {
    return await this.RemoveItemActiveAnimated({x: 0, y: UpRotateValue});
  };
  _onDown = async () => {
    return await this.RemoveItemActiveAnimated({x: 0, y: DownRotateValue});
  };

  private ActionNextCard = async (vector: StateVectorEnum) => {
    let data = this.getDataActive();
    const {DisableRemove} = this.props;
    let PromiseResult: Promise<unknown>;
    switch (vector) {
      case StateVectorEnum.Up:
        if (!DisableRemove!.Up) {
          PromiseResult = this._onUp();
          this.props!.onUp(data);
          return await PromiseResult;
        }
        break;
      case StateVectorEnum.Down:
        if (!DisableRemove!.Down) {
          PromiseResult = this._onDown();
          this.props!.onDown(data);
          return await PromiseResult;
        }
        break;
      case StateVectorEnum.Left:
        if (!DisableRemove!.Left) {
          PromiseResult = this._onLeft();
          this.props!.onLeft(data);
          return await PromiseResult;
        }
        break;
      case StateVectorEnum.Right:
        if (!DisableRemove!.Right) {
          PromiseResult = this._onRight();
          this.props!.onRight(data);
          return await PromiseResult;
        }
        break;
    }
    return await this.BackItemActiveAnimated(0);
  };

  private getDataActive = () => {
    return this.dataQueue[this.indexActive];
  };

  private getConfigItem = () => {
    return {
      widthItem: this.props.WidthContainer,
      heightItem: this.props.HeightContainer,
      ShadowDirect: this.props.ShadowDirect,
    };
  };

  getConfigItemActive = () => {
    return {
      AnimatedConfig: AnimatedActive,
      ValueAnimated: this.ValueAnimated,
    };
  };

  getConfigItemNonActive = (AnimatedConfig: any) => {
    return {
      AnimatedConfig,
      ValueAnimated: this.ValueAnimatedStack,
    };
  };

  // public
  NextCard = async (vector: StateVectorEnum) => {
    let isRemove = await this.ActionNextCard(vector);
    if (isRemove) {
      this.ReloadCard();
    }
  };

  // render
  generateItem = () => {
    let AnimatedStack = GetAnimatedStack(this.props.ShadowDirect);
    let TempViews = this.dataQueue.map((item, indexItem) => {
      // let index = indexItem + 1;
      const isActive = this.indexActive === indexItem;
      return (
        <ItemCarousel
          key={this.props.keyExtractor(item, indexItem)}
          index={indexItem}
          indexActive={this.indexActive}
          isActive={isActive}
          {...(isActive
            ? this.getConfigItemActive()
            : this.getConfigItemNonActive(AnimatedStack))}
          {...this.getConfigItem()}>
          {this.props.renderItem({item, index: indexItem})}
        </ItemCarousel>
      );
    });
    const {ComponentLoading} = this.props;
    const isActive = this.indexActive === 0 || TempViews.length < 1;

    TempViews.splice(
      0,
      0,
      <ItemCarousel
        key={'key00'}
        index={0}
        indexActive={this.indexActive}
        isActive={isActive}
        {...(isActive
          ? this.getConfigItemActive()
          : this.getConfigItemNonActive(AnimatedStack))}
        {...this.getConfigItem()}>
        {ComponentLoading}
      </ItemCarousel>,
    );
    return TempViews;
  };

  render() {
    const {HeightContainer: height, WidthContainer: width} = this.props;
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <View style={{height, width}}>{this.generateItem()}</View>
      </View>
    );
  }
  private resetConfig = () => {
    this.indexActive = -1;
    this.dataQueue = [];
  };
  private onChangeDataFromProp = (data: Array<any>) => {
    this.snapToDataBuffer(data);
    this.resetConfig();
    if (this.isLoadingView()) {
      this.generateData();
    }
  };

  ShallowValidate = (Props: any, nextProps: any) => {
    if (Props.data !== nextProps.data) {
      this.onChangeDataFromProp(nextProps.data);
      return true;
    }
    for (let key in nextProps) {
      if (Props[key] !== nextProps[key]) {
        return true;
      }
    }
    return false;
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (
      this.ShallowValidate(this.props, nextProps) ||
      this.state.isLoading !== nextState.isLoading
    );
  }

  componentDidUpdate() {
    this.ValueAnimated.setValue({x: 0, y: 0});
  }
}

export default CarouselTinder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

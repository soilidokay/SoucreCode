import React, {PureComponent} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {HoverTab} from './HoverTab';
import TabBar from './TabBar';
import {TabNavigateState, TabNavigateProps} from './type';
import {Route} from '@react-navigation/native';
import AppContext from 'Providers/Contexts/AppContext';
import Colors from 'assets/Colors';

const widthScreen = Dimensions.get('window').width;

export class CustomTarNavigate extends PureComponent<
  TabNavigateProps,
  TabNavigateState
> {
  static EventFocus = [];
  private config: {AmountTabBar: number; widthTab: number; heightTab: number};
  private lstTabBar: {[key: number]: TabBar | null};
  private refHoverTabBar?: HoverTab | null | undefined;
  private indexTabActive = -1;
  static defaultProps: TabNavigateProps = {
    backgroundColor: Colors.CustomGreen,
    descriptors: {},
    onPressTab: () => {},
    routes: [],
  };
  constructor(props: TabNavigateProps) {
    super(props);
    const AmountTabBar = props.routes?.length ?? 5;
    const widthTab = widthScreen / AmountTabBar;
    const heightTab = (widthTab * 3) / 5;
    AppContext.HeightTabNavigate = heightTab * 1.5;

    this.config = {
      AmountTabBar: AmountTabBar,
      widthTab,
      heightTab,
    };
    this.onPressTabBar = this.onPressTabBar.bind(this);
    this.RenderItemTabBar = this.RenderItemTabBar.bind(this);
    this.lstTabBar = {};
  }
  setActive(sender: TabBar, index?: number) {
    if (this.indexTabActive >= 0) {
      this.lstTabBar[this.indexTabActive]?.setActive(false);
    }
    this.indexTabActive = index ?? 0;
    sender.setActive(true);
    this.refHoverTabBar?.SetActive(index ?? 0, sender.GetContent());
  }
  /**
   * Athor: Unmatched Tai Nguyen - Create : 12 /08 /2019 - 23 :27 :16
   *
   */
  onPressTabBar = (sender: TabBar, index?: number) => {
    this.setActive(sender, index);
    const {routes} = this.props;
    AppContext.HandleHeaderTitle?.current?.SetParams(
      routes[index ?? 0].params ?? {},
    );
    this.props.onPressTab(sender, index ?? 0);
  };
  /**
   * Athor: Unmatched Tai Nguyen - Create : 13 /08 /2019 - 00 :02 :23
   *
   */
  RenderItemTabBar = (route: Route<string>, index: number) => {
    const {options} = this.props.descriptors[route.key];
    return (
      <TabBar
        ref={(ref) => (this.lstTabBar[index] = ref)}
        key={route.key}
        index={index}
        onPress={this.onPressTabBar}
        data={{item: route, options}}
      />
    );
  };
  /**
   * Athor: Unmatched Tai Nguyen - Create : 12 /08 /2019 - 22 :40 :02
   *
   */
  GenderTabBars = () => {
    const {routes} = this.props;
    return routes.map((item, index) => {
      return this.RenderItemTabBar(item, index);
    });
  };

  // componentDidMount() {
  //   let sender = this.lstTabBar[0];
  //   if (sender !== null) {
  //     this.setActive(sender, 0);
  //   }
  // }
  render() {
    const {widthTab, heightTab, AmountTabBar} = this.config;
    return (
      <View style={styles.container}>
        <View style={[styles.content, {height: heightTab}]}>
          <View style={styles.wrapHover} pointerEvents={'box-none'}>
            <HoverTab
              backgroundColor={this.props.backgroundColor}
              ref={(ref) => (this.refHoverTabBar = ref)}
              width={widthTab}
              AmountTabBar={AmountTabBar}
            />
          </View>
          {this.GenderTabBars()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {flex: 1, flexDirection: 'row'},
  wrapHover: {position: 'absolute'},
});

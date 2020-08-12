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
  private isStart: boolean = false;
  private refHoverTabBar?: HoverTab | null | undefined;
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
    this.config = {
      AmountTabBar: AmountTabBar,
      widthTab,
      heightTab: (widthTab * 3) / 5,
    };
    this.onPressTabBar = this.onPressTabBar.bind(this);
    this.RenderItemTabBar = this.RenderItemTabBar.bind(this);
    this.lstTabBar = {};
  }
  /**
   * Athor: Unmatched Tai Nguyen - Create : 12 /08 /2019 - 23 :27 :16
   *
   */
  onPressTabBar = (sender: TabBar, index?: number) => {
    this.refHoverTabBar?.SetActive(index ?? 0, sender.GetContent());
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
        style={{backgroundColor: this.props.backgroundColor}}
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

  componentDidMount() {
    let sender = this.lstTabBar[0];
    if (sender !== null) {
      this.refHoverTabBar?.SetActive(0, sender.GetContent());
    }
  }
  render() {
    const {widthTab, heightTab, AmountTabBar} = this.config;
    return (
      <>
        <View style={styles.container}>
          <View style={[styles.content, {height: heightTab}]}>
            {this.GenderTabBars()}
            <View style={styles.wrapHover} pointerEvents={'box-none'}>
              <HoverTab
                backgroundColor={this.props.backgroundColor}
                ref={(ref) => (this.refHoverTabBar = ref)}
                width={widthTab}
                AmountTabBar={AmountTabBar}
              />
            </View>
          </View>
        </View>
      </>
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

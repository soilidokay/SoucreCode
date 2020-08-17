import React, {PureComponent} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {TabBarProps, TabBarState} from './type';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from 'assets/Colors';
export default class TabBar extends PureComponent<TabBarProps, TabBarState> {
  private content: JSX.Element = (<></>);
  constructor(props: TabBarProps) {
    super(props);
    this.GetIndex = this.GetIndex.bind(this);
    this.GetContent = this.GetContent.bind(this);
    this.state = {
      isActive: props.isActive ?? false,
    };
  }
  static defaultProps: TabBarProps = {
    index: 0,
    onPress: () => {},
  };
  /**
   * Athor: Unmatched Tai Nguyen - Create : 12 /08 /2019 - 23 :31 :56
   *
   */
  GetIndex = () => {
    return this.props.index;
  };

  /**
   * Athor: Unmatched Tai Nguyen - Create : 12 /08 /2019 - 23 :58 :55
   *
   */
  GetContent = () => {
    return this.content;
  };
  setActive(isActive: boolean) {
    this.setState({isActive});
  }
  GetOption = () => this.props.data?.options;
  render = () => {
    const {options, item} = this.props.data ?? {};

    const IconComponent =
      options?.IconComponent ?? this.props.IconComponent ?? Icon;
    this.content = (
      <IconComponent
        size={20}
        name={options?.icon ?? 'home'}
        color={Colors.LightGreen}
      />
    );
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPress(this, this.props.index);
        }}>
        <View style={[styles.container]}>
          <View style={styles.Content}>
            {this.state.isActive === true ? <></> : this.content}
          </View>
          <View style={styles.wrapText}>
            <Text style={styles.text}>{options?.title ?? item?.name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Content: {
    flex: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapText: {
    flex: 30,
  },
  text: {fontSize: 10, textAlign: 'center', color: Colors.CustomLightGreen},
});

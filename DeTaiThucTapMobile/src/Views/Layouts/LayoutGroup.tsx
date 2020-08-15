import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {LayoutGroupProps} from './types';

export default class LayoutGroup extends PureComponent<LayoutGroupProps> {
  render() {
    const {TitleComponent, Content} = this.props;
    return (
      <View style={styles.container}>
        {TitleComponent}
        {Content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 3,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

import React from 'react';
import {Text, View} from 'react-native';
import {IScreenComponent} from 'Providers/Navigates/type';
import {KeyNavigate} from 'Providers/Navigates/Params';
import ScreenBase from '../ScreenBase';

class AboutScreen extends ScreenBase<KeyNavigate.About> {
  render() {
    return (
      <View>
        <Text> About </Text>
      </View>
    );
  }
}

const _default: IScreenComponent<KeyNavigate.About> = {
  name: KeyNavigate.About,
  component: AboutScreen,
  initialParams: {
    Title: 'About',
  },
  options: {icon: 'info'},
};
export default _default;

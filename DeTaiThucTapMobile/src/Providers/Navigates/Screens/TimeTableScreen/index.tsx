import React from 'react';
import {Text, View} from 'react-native';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {IScreenComponent} from 'Providers/Navigates/type';

class TimeTableScreen extends ScreenBase<KeyNavigate.TimeTable> {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
const _default: IScreenComponent<KeyNavigate.TimeTable> = {
  name: KeyNavigate.TimeTable,
  component: TimeTableScreen,
  initialParams: {
    Title: 'TableTime',
  },
  options: {icon: 'clock'},
};

export default _default;

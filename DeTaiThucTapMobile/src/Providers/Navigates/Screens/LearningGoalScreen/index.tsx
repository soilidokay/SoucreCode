import React from 'react';
import {Text, View} from 'react-native';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {IScreenComponent} from 'Providers/Navigates/type';

class LearningGoalScreen extends ScreenBase<KeyNavigate.LearningGoal> {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const _default: IScreenComponent<KeyNavigate.LearningGoal> = {
  name: KeyNavigate.LearningGoal,
  component: LearningGoalScreen,
  initialParams: {
    Title: 'Learning Goal',
  },
  options: {icon: 'graduation-cap'},
};

export default _default;

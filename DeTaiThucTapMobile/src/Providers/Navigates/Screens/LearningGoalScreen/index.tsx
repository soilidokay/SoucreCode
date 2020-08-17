import React from 'react';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {IScreenComponent} from 'Providers/Navigates/type';
import LearningGoal from 'Views/LearningGoal';

class LearningGoalScreen extends ScreenBase<KeyNavigate.LearningGoal> {
  render() {
    const {navigation, route} = this.props;
    return <LearningGoal navigation={navigation} route={route} />;
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

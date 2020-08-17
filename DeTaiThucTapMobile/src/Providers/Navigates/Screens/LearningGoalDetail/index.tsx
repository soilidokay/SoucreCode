import {IScreenComponent} from '../../type';
import React from 'react';
import {ILearningGoalDetailScreenProps} from '../type';
// import AppContext from 'Providers/Contexts/AppContext';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import LearningGoalDetail from 'Views/LearningGoalDetail';
class LearningGoalDetailScreen extends ScreenBase<
  KeyNavigate.LearningGoalDetail,
  ILearningGoalDetailScreenProps
> {
  constructor(props: ILearningGoalDetailScreenProps) {
    super(props);
  }

  render() {
    const {navigation, route} = this.props;
    return <LearningGoalDetail navigation={navigation} route={route} />;
  }
}

const _default: IScreenComponent<KeyNavigate.LearningGoalDetail> = {
  name: KeyNavigate.LearningGoalDetail,
  component: LearningGoalDetailScreen,
  initialParams: {
    Title: 'LearningGoalDetail',
  },
  options: {title: 'LearningGoalDetail'},
};

export default _default;

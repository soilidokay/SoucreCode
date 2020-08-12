import {IScreenComponent} from '../../type';
import React from 'react';
import Home from 'Views/Home';
import {IHomeScreenProps} from '../type';
import {HomeTheme} from 'assets/themes/HomeTheme';
// import AppContext from 'Providers/Contexts/AppContext';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import Entypo from 'react-native-vector-icons/Entypo';
export class HomeScreen extends ScreenBase<KeyNavigate.Home, IHomeScreenProps> {
  constructor(props: IHomeScreenProps) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    return <Home navigation={navigation} theme={HomeTheme} />;
  }
}

const _default: IScreenComponent<KeyNavigate.Home> = {
  name: KeyNavigate.Home,
  component: HomeScreen,
  initialParams: {
    Title: 'Vocabulary',
  },
  options: {icon: 'vine', title: 'Vocabulary', IconComponent: Entypo},
};

export default _default;

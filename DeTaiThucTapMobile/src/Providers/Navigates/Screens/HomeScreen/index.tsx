import {IScreenComponent} from '../../type';
import React, {FC, useEffect} from 'react';
import Home from 'Views/Home';
import {IHomeScreenProps} from '../type';
import {HomeTheme} from 'assets/themes/HomeTheme';
import AppContext from 'Providers/Contexts/AppContext';
const HomeScreen: FC<IHomeScreenProps> = ({navigation}) => {
  useEffect(() => {
    AppContext.HandleHeaderTitle?.current?.SetParams({Title: 'Home Ok'});
  }, []);
  return <Home navigation={navigation} theme={HomeTheme} />;
};
const _default: IScreenComponent<'Home'> = {
  name: 'Home',
  component: HomeScreen,
  initialParams: {
    Title: 'English 44',
  },
};

export default _default;

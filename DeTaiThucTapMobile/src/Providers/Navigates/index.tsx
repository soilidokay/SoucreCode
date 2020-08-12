import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {PropsApp} from './type';
import StackNavigate from './Custom/StackNavigate';
import {StackNavigateTheme} from 'assets/themes';
// const Stack = createStackNavigator();

const AppNavigate: FC<PropsApp> = () => {
  return (
    <NavigationContainer>
      <StackNavigate theme={StackNavigateTheme} />
    </NavigationContainer>
  );
};

export default AppNavigate;

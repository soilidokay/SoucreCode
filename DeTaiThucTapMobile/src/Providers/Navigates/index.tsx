import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {PropsApp} from './type';
import StackNavigate from './Custom/StackNavigate';
import {StackNavigateTheme} from 'assets/themes';
import StackNavigateLogin from './Custom/StackNavigateLogin';
import UserProfile from 'Providers/Accessors/UserProfile';
// const Stack = createStackNavigator();

const AppNavigate: FC<PropsApp> = () => {
  const [state, setState] = useState({isLogin: false});
  UserProfile.ActionNavigateApp = (isLogin: boolean) => {
    setState({...state, isLogin});
  };
  return (
    <NavigationContainer>
      {UserProfile.isLogin() ? (
        <StackNavigate theme={StackNavigateTheme} />
      ) : (
        <StackNavigateLogin theme={StackNavigateTheme} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigate;

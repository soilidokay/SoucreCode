import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import Home from './Screens/Home';

const Stack = createStackNavigator();

const AppNavigate: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen {...Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigate;

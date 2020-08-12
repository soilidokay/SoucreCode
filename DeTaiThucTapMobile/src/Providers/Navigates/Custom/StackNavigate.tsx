import {createStackNavigator} from '@react-navigation/stack';

import React, {FC, useRef, useEffect} from 'react';
import {ParamStackNavigateList, KeyNavigate, IParamNavigates} from '../Params';
import RootApp from '../Screens/RootApp';
import {IRefHeaderTitle} from 'Providers/SubComponents/type';
import {StackNavigateProps} from './type';
import AppContext from 'Providers/Contexts/AppContext';
import HeaderTitle from 'Providers/SubComponents/HeaderTitle';
import {View} from 'react-native';
import LayoutCircle from 'Layouts/LayoutCircle';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import ExtendFeature from '../Screens/ExtendFeature';
import Colors from 'assets/Colors';
const Stack = createStackNavigator<ParamStackNavigateList>();
const StackNavigate: FC<StackNavigateProps<KeyNavigate.Default>> = (props) => {
  const {theme} = props;
  // const {BackActionStyle} = theme;
  const refStack = useRef<IRefHeaderTitle>(null);

  useEffect(() => {
    AppContext.setHandHeaderTitle(refStack);
    return () => {
      AppContext.releaseHeaderTitle();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({scene, previous, navigation}) => {
          const isParent = previous === undefined;
          const params = (scene.route.params || {}) as IParamNavigates;
          return (
            <View style={theme.HeaderStyle}>
              <LayoutCircle style={theme.LayoutBack}>
                <ButtonIcon
                  disabled={isParent}
                  sizeIcon={20}
                  colorIcon={isParent ? theme.backgroundColor : Colors.Lime}
                  icon={'arrow-left'}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </LayoutCircle>
              <HeaderTitle ref={refStack} theme={theme} params={params} />
              <LayoutCircle style={theme.LayoutUser}>
                <ButtonIcon
                  disabled={!isParent}
                  sizeIcon={20}
                  colorIcon={Colors.LightGreen}
                  icon={'user'}
                  onPress={() => {
                    navigation.navigate(KeyNavigate.ExtendFeature);
                  }}
                />
              </LayoutCircle>
            </View>
          );
        },
      }}>
      <Stack.Screen {...RootApp} />
      <Stack.Screen {...ExtendFeature} />
    </Stack.Navigator>
  );
};

export default StackNavigate;

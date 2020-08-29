import {createStackNavigator} from '@react-navigation/stack';

import React, {FC, useRef, useEffect} from 'react';
import {
  ParamStackNavigateLoginList,
  KeyNavigate,
  IParamNavigates,
  KeyNavigateLogin,
} from '../Params';
import {IRefHeaderTitle} from 'Providers/SubComponents/type';
import {StackNavigateLoginProps} from './type';
import AppContext from 'Providers/Contexts/AppContext';
import HeaderTitle from 'Providers/SubComponents/HeaderTitle';
import LayoutCircle from 'Layouts/LayoutCircle';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
const Stack = createStackNavigator<ParamStackNavigateLoginList>();
const StackNavigateLogin: FC<StackNavigateLoginProps<
  KeyNavigateLogin.Default
>> = (props) => {
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
            <ContainerBox style={theme.HeaderStyle}>
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
            </ContainerBox>
          );
        },
      }}>
      <Stack.Screen {...LoginScreen} />
      <Stack.Screen {...RegisterScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigateLogin;

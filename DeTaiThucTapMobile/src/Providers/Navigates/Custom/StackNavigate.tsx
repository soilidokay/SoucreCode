import {createStackNavigator} from '@react-navigation/stack';

import React, {FC, useRef, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {IParamNavigates, ParamStackNavigateList} from '../Params';
import RootApp from '../Screens/RootApp';
import HeaderTitle from 'Providers/SubComponents/HeaderTitle';
import {IRefHeaderTitle} from 'Providers/SubComponents/type';
import {StackNavigateProps} from './type';
import AppContext from 'Providers/Contexts/AppContext';

const Stack = createStackNavigator<ParamStackNavigateList>();
const StackNavigate: FC<StackNavigateProps> = (props) => {
  const {theme} = props;
  const {BackActionStyle} = theme;
  const refStack = useRef<IRefHeaderTitle>(null);

  AppContext.setHandHeaderTitle(refStack);

  useEffect(() => {
    return () => {
      AppContext.releaseHeaderTitle();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({previous, scene}) => {
          const isParent = previous === undefined;
          const params = (scene.route.params || {}) as IParamNavigates;
          return (
            <Appbar.Header style={theme.HeaderStyle}>
              <Appbar.BackAction
                color={
                  isParent
                    ? BackActionStyle.backgroundColor
                    : BackActionStyle.color
                }
                disabled={isParent}
                onPress={() => {}}
              />
              <HeaderTitle ref={refStack} theme={theme} params={params} />
              <Appbar.Action
                style={theme.AvatarStyle}
                icon="account"
                onPress={() => {}}
              />
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen {...RootApp} />
    </Stack.Navigator>
  );
};

export default StackNavigate;

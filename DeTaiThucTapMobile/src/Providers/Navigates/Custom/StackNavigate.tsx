import {createStackNavigator} from '@react-navigation/stack';

import React, {FC, useRef, useEffect} from 'react';
import {ParamStackNavigateList, KeyNavigate, IParamNavigates} from '../Params';
import RootApp from '../Screens/RootApp';
import {IRefHeaderTitle} from 'Providers/SubComponents/type';
import {StackNavigateProps} from './type';
import AppContext from 'Providers/Contexts/AppContext';
import HeaderTitle from 'Providers/SubComponents/HeaderTitle';
import LayoutCircle from 'Layouts/LayoutCircle';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import GroupDetail from '../Screens/GroupDetail';
import CategoryDetailScreen from '../Screens/CategoryDetailScreen';
import ExtendFeature from '../Screens/ExtendFeature';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
import LearningGoalDetail from '../Screens/LearningGoalDetail';
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
      <Stack.Screen {...RootApp} />
      <Stack.Screen {...ExtendFeature} />
      <Stack.Screen {...GroupDetail} />
      <Stack.Screen {...CategoryDetailScreen} />
      <Stack.Screen {...LearningGoalDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigate;

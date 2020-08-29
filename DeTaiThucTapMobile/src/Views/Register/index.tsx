import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {PropsRegister} from 'Views/type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, Button} from 'react-native-elements';
import Colors from 'assets/Colors';
import {KeyNavigateLogin} from 'Providers/Navigates/Params';

export default class Register extends PureComponent<PropsRegister> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.CustomGreen,
          justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            alignItems: 'stretch',
            borderWidth: 1,
            borderColor: Colors.CustomLightGreen,
            borderRadius: 5,
          }}>
          <Input
            label={'UserName'}
            placeholder={'example@gmail.com'}
            leftIcon={
              <FontAwesome5Icon
                size={20}
                name={'user'}
                color={Colors.LightGray}
              />
            }
          />
          <Input
            label={'Password'}
            placeholder={'John123@'}
            passwordRules={'*'}
            secureTextEntry={true}
            leftIcon={
              <FontAwesome5Icon
                size={20}
                name={'key'}
                color={Colors.LightGray}
              />
            }
          />
          <Input
            label={'Confirm Password'}
            placeholder={'John123@'}
            passwordRules={'*'}
            secureTextEntry={true}
            leftIcon={
              <FontAwesome5Icon
                size={20}
                name={'key'}
                color={Colors.LightGray}
              />
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
            }}>
            <Button
              containerStyle={{margin: 4}}
              style={{width: 100}}
              title={'Register'}
              onPress={() => {
                const {navigation} = this.props;
                navigation?.navigate(KeyNavigateLogin.Register, {});
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

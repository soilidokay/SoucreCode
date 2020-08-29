import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {PropsLogin, StateLogin} from 'Views/type';
import Colors from 'assets/Colors';
import {Input, Button} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyNavigateLogin} from 'Providers/Navigates/Params';
import UserProfile from 'Providers/Accessors/UserProfile';

export default class Login extends PureComponent<PropsLogin, StateLogin> {
  private LoginModel: {UserName: string; PassWord: string} = {
    UserName: 'tainguyen.ntt.97@gmail.com',
    PassWord: 'Tai123@',
  };
  constructor(props: PropsLogin) {
    super(props);
    this.state = {
      isProcess: false,
    };
  }
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
            disabled={this.state.isProcess}
            label={'UserName'}
            placeholder={'example@gmail.com'}
            leftIcon={
              <FontAwesome5Icon
                size={20}
                name={'user'}
                color={Colors.LightGray}
              />
            }
            onChangeText={(text) => {
              this.LoginModel.UserName = text;
            }}
          />
          <Input
            disabled={this.state.isProcess}
            label={'Password'}
            placeholder={'John123@'}
            passwordRules={'*'}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.LoginModel.PassWord = text;
            }}
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
              disabled={this.state.isProcess}
              containerStyle={{margin: 4}}
              style={{width: 100}}
              title={'Login'}
              onPress={async () => {
                this.setState({isProcess: true});
                await UserProfile.Login(this.LoginModel).catch(() => {});
                this.setState({isProcess: false});
              }}
            />
            <Button
              disabled={this.state.isProcess}
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

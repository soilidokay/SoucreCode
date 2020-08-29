import React, {PureComponent} from 'react';
import {KeyNavigateLogin} from 'Providers/Navigates/Params';
import {IScreenLoginComponent} from 'Providers/Navigates/type';
import {IScreenLoginPropsBase} from '../type';
import Login from 'Views/Login';

class LoginScreen extends PureComponent<
  IScreenLoginPropsBase<KeyNavigateLogin.Login>
> {
  render() {
    const {navigation, route} = this.props;
    return <Login refresh={() => {}} navigation={navigation} route={route} />;
  }
}

const _default: IScreenLoginComponent<KeyNavigateLogin.Login> = {
  name: KeyNavigateLogin.Login,
  component: LoginScreen,
  initialParams: {
    Title: 'Login',
  },
  options: {icon: 'graduation-cap'},
};

export default _default;

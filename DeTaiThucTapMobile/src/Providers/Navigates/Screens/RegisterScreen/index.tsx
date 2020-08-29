import React, {PureComponent} from 'react';
import {KeyNavigateLogin} from 'Providers/Navigates/Params';
import {IScreenLoginComponent} from 'Providers/Navigates/type';
import {IScreenLoginPropsBase} from '../type';
import Register from 'Views/Register';

class RegisterScreen extends PureComponent<
  IScreenLoginPropsBase<KeyNavigateLogin.Register>
> {
  render() {
    const {navigation, route} = this.props;
    return (
      <Register refresh={() => {}} navigation={navigation} route={route} />
    );
  }
}

const _default: IScreenLoginComponent<KeyNavigateLogin.Register> = {
  name: KeyNavigateLogin.Register,
  component: RegisterScreen,
  initialParams: {
    Title: 'Register',
  },
  options: {icon: 'graduation-cap'},
};

export default _default;

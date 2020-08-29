import React from 'react';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {IScreenComponent} from 'Providers/Navigates/type';
import {IExtendFeatureScreenProps} from '../type';
import UserManage from 'Views/UserManage';
class ExtendFeature extends ScreenBase<
  KeyNavigate.ExtendFeature,
  IExtendFeatureScreenProps
> {
  render() {
    const {navigation, route} = this.props;
    return (
      <UserManage refresh={() => {}} navigation={navigation} route={route} />
    );
  }
}

const _default: IScreenComponent<KeyNavigate.ExtendFeature> = {
  name: KeyNavigate.ExtendFeature,
  component: ExtendFeature,
  initialParams: {
    Title: 'Extend Feature',
  },
};

export default _default;

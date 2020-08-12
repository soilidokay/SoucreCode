import React from 'react';
import {Text, View} from 'react-native';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {IScreenComponent} from 'Providers/Navigates/type';
import {IExtendFeatureScreenProps} from '../type';
class ExtendFeature extends ScreenBase<
  KeyNavigate.ExtendFeature,
  IExtendFeatureScreenProps
> {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
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

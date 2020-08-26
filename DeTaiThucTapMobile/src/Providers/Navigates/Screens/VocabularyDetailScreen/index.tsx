import {IScreenComponent} from '../../type';
import React from 'react';
import {IVocabularyDetailScreenProps} from '../type';
// import AppContext from 'Providers/Contexts/AppContext';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import VocabularyDetail from 'Views/VocabularyDetail';
class VocabularyDetailScreen extends ScreenBase<
  KeyNavigate.VocabularyDetail,
  IVocabularyDetailScreenProps
> {
  constructor(props: IVocabularyDetailScreenProps) {
    super(props);
  }

  render() {
    const {navigation, route} = this.props;
    return (
      <VocabularyDetail
        ParamRequests={[{VocabularyId: route?.params.Vocabulary?.Id ?? ''}]}
        navigation={navigation}
        route={route}
      />
    );
  }
}

const _default: IScreenComponent<KeyNavigate.VocabularyDetail> = {
  name: KeyNavigate.VocabularyDetail,
  component: VocabularyDetailScreen,
  initialParams: {
    Title: 'Vocabulary Detail',
  },
  options: {title: 'Vocabulary Detail'},
};

export default _default;

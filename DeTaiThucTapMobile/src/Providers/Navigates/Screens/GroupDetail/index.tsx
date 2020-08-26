import {IScreenComponent} from '../../type';
import React from 'react';
import {IGroupDetailScreenProps} from '../type';
// import AppContext from 'Providers/Contexts/AppContext';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import GroupDetail from 'Views/GroupDetail';
class GroupDetailScreen extends ScreenBase<
  KeyNavigate.GroupDetail,
  IGroupDetailScreenProps
> {
  constructor(props: IGroupDetailScreenProps) {
    super(props);
  }

  render() {
    const {navigation, route} = this.props;
    return (
      <GroupDetail
        ParamRequests={[{GroupId: route?.params.GroupCategory?.Id ?? ''}]}
        navigation={navigation}
        route={route}
      />
    );
  }
}

const _default: IScreenComponent<KeyNavigate.GroupDetail> = {
  name: KeyNavigate.GroupDetail,
  component: GroupDetailScreen,
  initialParams: {
    Title: 'GroupDetail',
  },
  options: {title: 'GroupDetail'},
};

export default _default;

import {IScreenComponent} from '../../type';
import React from 'react';
import {ICategoryDetailScreenProps} from '../type';
// import AppContext from 'Providers/Contexts/AppContext';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import CategoryDetail from 'Views/CategoryDetail';
class CategoryDetailScreen extends ScreenBase<
  KeyNavigate.CategoryDetail,
  ICategoryDetailScreenProps
> {
  constructor(props: ICategoryDetailScreenProps) {
    super(props);
  }

  render() {
    const {navigation, route} = this.props;
    return <CategoryDetail navigation={navigation} route={route} />;
  }
}

const _default: IScreenComponent<KeyNavigate.CategoryDetail> = {
  name: KeyNavigate.CategoryDetail,
  component: CategoryDetailScreen,
  initialParams: {
    Title: 'GroupDetail',
  },
  options: {title: 'GroupDetail'},
};

export default _default;

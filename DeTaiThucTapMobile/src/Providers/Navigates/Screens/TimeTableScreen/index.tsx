import React from 'react';
import ScreenBase from '../ScreenBase';
import {KeyNavigate} from 'Providers/Navigates/Params';
import {IScreenComponent} from 'Providers/Navigates/type';
import TableTime from 'Views/TableTime';

class TimeTableScreen extends ScreenBase<KeyNavigate.TimeTable> {
  render() {
    const {navigation, route} = this.props;
    return <TableTime navigation={navigation} route={route} />;
  }
}
const _default: IScreenComponent<KeyNavigate.TimeTable> = {
  name: KeyNavigate.TimeTable,
  component: TimeTableScreen,
  initialParams: {
    Title: 'TableTime',
  },
  options: {icon: 'clock'},
};

export default _default;

import {PureComponent} from 'react';
import {IScreenPropsBase, EventListenerCallbackType} from './type';
import AppContext from 'Providers/Contexts/AppContext';
import {ParamNavigate, KeyNavigate} from '../Params';

export class ScreenBase<
  RouteName extends keyof ParamNavigate = KeyNavigate.Default,
  PropsTypes extends IScreenPropsBase<RouteName> = IScreenPropsBase<RouteName>
> extends PureComponent<PropsTypes> {
  constructor(props: PropsTypes) {
    super(props);
    props.navigation?.addListener('focus', this.onFocusScreen);
  }
  onFocusScreen: EventListenerCallbackType<'focus'> = () => {
    const {route} = this.props;
    AppContext.HandleHeaderTitle?.current?.SetParams(route?.params ?? {});
  };
  componentDidMount = () => {};
  componentWillUnmount = () => {
    this.props.navigation?.removeListener('focus', this.onFocusScreen);
  };
}

export default ScreenBase;

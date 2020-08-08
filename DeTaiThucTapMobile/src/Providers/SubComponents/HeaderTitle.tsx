import React, {useState, useRef} from 'react';
import {IHeaderTitle, IRefHeaderTitle} from './type';
import {Appbar} from 'react-native-paper';
import {IParamNavigates} from 'Providers/Navigates/Params';

const HeaderTitle = React.forwardRef((props: IHeaderTitle, ref) => {
  const [state, setState] = useState({
    params: props.params,
    theme: props.theme,
  });
  const refOwn = useRef<IRefHeaderTitle>({
    SetParams: (params: IParamNavigates) => {
      setState((st) => ({...st, params}));
    },
  });
  if (ref !== null && 'current' in ref) {
    ref.current = refOwn.current;
  }
  const {params, theme} = state;
  return (
    <Appbar.Content
      style={theme.TitleStyle}
      title={params.Title}
      subtitle={params.SubTitle}
    />
  );
});

export default HeaderTitle;

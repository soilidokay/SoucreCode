import React, {useState, useRef} from 'react';
import {IHeaderTitle, IRefHeaderTitle} from './type';
import {IParamNavigates} from 'Providers/Navigates/Params';
import {View, Text, StyleSheet} from 'react-native';

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
    <View style={theme.TitleStyle}>
      <Text style={styles.title}>{params.Title}</Text>
      {params.SubTitle && <Text>{params.SubTitle}</Text>}
    </View>
  );
});
const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default HeaderTitle;

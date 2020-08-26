import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ICheckBoxControl} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import {CheckBox} from 'react-native-elements';
const CheckBoxControl: FC<ICheckBoxControl> = (props) => {
  const [state, setState] = useState({checked: props.Value ?? false});
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <CheckBox
          containerStyle={styles.containerStyle}
          title={props?.DisplayName ?? props.Name}
          checked={state.checked}
          onPress={() => {
            props.ActionEvent.onChangValue(!state.checked);
            setState((st) => ({...st, checked: !st.checked}));
          }}
        />
      </ContainerBox>
    </View>
  );
};

export default CheckBoxControl;

const styles = StyleSheet.create({
  container: {},
  WrapBox: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    margin: 5,
    padding: 2,
  },
  content: {
    flex: 75,
    margin: 5,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

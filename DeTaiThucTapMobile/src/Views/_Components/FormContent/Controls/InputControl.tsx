import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {IInputControl} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import {Input} from 'react-native-elements';
const InputControl: FC<IInputControl> = (props) => {
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <Input
          style={styles.content}
          label={props?.DisplayName ?? props.Name}
          defaultValue={props.Value}
          onChangeText={props.ActionEvent.onChangValue}
          placeholder={props.Placeholder}
          onFocus={props.ActionEvent?.onFocus}
        />
      </ContainerBox>
    </View>
  );
};
InputControl.defaultProps = {
  Value: '',
};
export default InputControl;

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
});

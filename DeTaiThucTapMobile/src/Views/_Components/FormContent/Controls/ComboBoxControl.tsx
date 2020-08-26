import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {IComboBoxControl, TDataItem} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
const ComboBoxControl: FC<IComboBoxControl> = (props) => {
  const [state, setState] = useState({
    DataItems: [] as TDataItem[],
  });
  const SetDataItem = async () => {
    if (props.DataItem) {
      try {
        const data = await props.DataItem();
        setState((st) => ({...st, DataItems: data}));
      } catch {}
    }
  };
  useEffect(() => {
    SetDataItem();
  });
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <DropDownPicker
          defaultValue={state.DataItems.length > 0 ? props.Value || null : null}
          dropDownMaxHeight={150}
          onChangeItem={(item: {value: any}) => {
            props.ActionEvent.onChangValue(item.value);
          }}
          items={state.DataItems}
          placeholder={props.Placeholder}
        />
      </ContainerBox>
    </View>
  );
};
ComboBoxControl.defaultProps = {
  Value: '',
};
export default ComboBoxControl;

const styles = StyleSheet.create({
  container: {},
  WrapBox: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    margin: 5,
    padding: 2,
    minHeight: 200,
  },
  content: {
    flex: 75,
    margin: 5,
  },
});

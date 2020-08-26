import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ITableTimeOfWeek} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import {CheckBox, Text} from 'react-native-elements';
import Colors from 'assets/Colors';
const DateOfWeek = [
  {name: 'CN'},
  {name: 'T2'},
  {name: 'T3'},
  {name: 'T4'},
  {name: 'T5'},
  {name: 'T6'},
  {name: 'T7'},
];

const GetBits = (Data: boolean[]) => {
  let temp = 0;
  Data.forEach((bit, index) => {
    // eslint-disable-next-line no-bitwise
    temp ^= bit ? 1 << index : 0;
  });
  return temp;
};
const ArrayBit = (dataBit: number) => {
  const temp = [];
  for (let index = 0; index < 7; index++) {
    // eslint-disable-next-line no-bitwise
    temp.push(((dataBit >> index) & 1) === 1);
  }
  return temp;
};
const TableTimeOfWeek: FC<ITableTimeOfWeek> = (props) => {
  const [state, setState] = useState<{dataTracking: boolean[]}>({
    dataTracking: ArrayBit(props.Value ?? 0),
  });
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <Text style={{margin: 5, color: Colors.Gray, fontWeight: 'bold'}}>
          {props?.DisplayName ?? props.Name}
        </Text>
        <View style={styles.WrapContent}>
          {DateOfWeek.map((item, index) => {
            return (
              <CheckBox
                key={item.name}
                title={item.name}
                containerStyle={{width: 70}}
                checked={!!state.dataTracking[index]}
                onPress={() => {
                  state.dataTracking[index] = !state.dataTracking[index];
                  setState((st) => ({
                    ...st,
                    dataTracking: [...state.dataTracking],
                  }));
                  props.ActionEvent.onChangValue(GetBits(state.dataTracking));
                }}
              />
            );
          })}
        </View>
      </ContainerBox>
    </View>
  );
};
TableTimeOfWeek.defaultProps = {
  Value: '',
};
export default TableTimeOfWeek;

const styles = StyleSheet.create({
  container: {},
  WrapBox: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    margin: 5,
    padding: 2,
  },
  WrapContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 75,
    margin: 5,
  },
});

import React, {FC, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ITimePicker} from '../type';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonIcon from 'Providers/Components/ButtonIcon';
const TimePicker: FC<ITimePicker> = (props) => {
  const [state, setState] = useState({
    isShow: false,
    date: props.Value ? new Date(props.Value) : new Date(0),
  });
  return (
    <View style={[styles.container, {minHeight: props.minHeight}]}>
      <ContainerBox style={styles.WrapBox}>
        <View style={styles.WrapImage}>
          <Text style={{fontSize: 20}}>{state.date.toLocaleTimeString()}</Text>
        </View>
        <ContainerBox>
          <ButtonIcon
            style={{backgroundColor: Colors.CustomWhite}}
            IconComponent={MaterialCommunityIcons}
            sizeIcon={30}
            icon={'folder-clock-outline'}
            onPress={() => {
              setState((st) => ({...st, isShow: true}));
            }}
          />
        </ContainerBox>
      </ContainerBox>
      {state.isShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={state.date}
          mode={'time'}
          display="clock"
          onChange={(event: Event, date?: Date) => {
            setState((st) => ({
              ...st,
              date: date ?? new Date(),
              isShow: false,
            }));
            props.ActionEvent.onChangValue(date?.getTime());
          }}
        />
      )}
    </View>
  );
};
TimePicker.defaultProps = {
  Value: '',
};
export default TimePicker;

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
  WrapImage: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  Touch: {
    height: 50,
  },
});

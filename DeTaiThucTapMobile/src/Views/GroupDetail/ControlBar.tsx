import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ControlBarProps} from '../../types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import LayoutCircle from 'Layouts/LayoutCircle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ControlBar: FC<ControlBarProps> = (props) => {
  return (
    <ContainerBox style={styles.container}>
      <View style={styles.WrapTitle}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {props.onPressAdd && (
        <LayoutCircle style={styles.LayoutCircle}>
          <ButtonIcon
            IconComponent={MaterialIcons}
            onPress={props.onPressAdd}
            icon={'add'}
          />
        </LayoutCircle>
      )}
    </ContainerBox>
  );
};

export default ControlBar;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.CustomLightBlue,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 5,
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: Colors.CustomGreen,
    fontSize: 20,
    marginLeft: 5,
  },
  LayoutCircle: {
    flex: 20,
    borderColor: Colors.LightGreen,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  WrapTitle: {
    justifyContent: 'center',
    flex: 80,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.LightGreen,
  },
  ButtonAdd: {
    flex: 1,
  },
});

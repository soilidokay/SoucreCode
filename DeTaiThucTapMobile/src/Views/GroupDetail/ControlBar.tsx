import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ControlBarProps} from '../../types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import LayoutCircle from 'Layouts/LayoutCircle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ControlBar: FC<ControlBarProps> = (props) => {
  return (
    <ContainerBox style={styles.container}>
      <LayoutCircle style={styles.LayoutCircle}>
        <ButtonIcon
          IconComponent={MaterialIcons}
          onPress={props.onPressAdd}
          icon={'add'}
        />
      </LayoutCircle>
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
    padding: 3,
  },
  LayoutCircle: {
    borderColor: Colors.CustomLightGreen,
    backgroundColor: Colors.CustomGreen,
  },
  ButtonAdd: {
    flex: 1,
  },
});

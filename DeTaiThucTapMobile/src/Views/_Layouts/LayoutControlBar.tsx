import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import LayoutCircle from 'Layouts/LayoutCircle';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Colors from 'assets/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {LayoutControlBarProps} from 'Views/type';

const LayoutControlBar: FC<LayoutControlBarProps> = (props) => {
  return (
    <View style={styles.action}>
      {props.DataButton.map((item, index) => {
        return (
          <LayoutCircle
            key={'key' + index}
            style={[
              styles.WarpButtonAdd,
              {borderColor: item.ColorBorder ?? Colors.CustomLightGreen},
            ]}>
            <ButtonIcon
              onPress={() => item.onPress && item.onPress(props.item)}
              style={styles.ButtonAdd}
              IconComponent={item.ComponentIcon || Entypo}
              icon={item.icon}
              colorIcon={item.ColorIcon ?? Colors.CustomGreen}
            />
          </LayoutCircle>
        );
      })}
    </View>
  );
};
LayoutControlBar.defaultProps = {};
export default LayoutControlBar;

const styles = StyleSheet.create({
  action: {
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 3,
  },
  ButtonAdd: {
    flex: 1,
  },
  WarpButtonAdd: {
    flex: 1,
    margin: 1,
    borderColor: Colors.LightGreen,
    marginRight: 5,
  },
});

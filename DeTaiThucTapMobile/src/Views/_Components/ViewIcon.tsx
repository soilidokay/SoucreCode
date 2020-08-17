import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from 'assets/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ViewIconProps} from 'Views/_Layouts/types';
const ViewIcon: FC<ViewIconProps> = (props) => {
  return (
    <View style={styles.WrapIcon}>
      <FontAwesome5Icon color={Colors.Red} size={10} name={props.icon} />
      <Text style={styles.IConText}>1000</Text>
    </View>
  );
};
export default ViewIcon;

const styles = StyleSheet.create({
  WrapIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IConText: {
    fontSize: 10,
    color: Colors.Gray,
  },
});

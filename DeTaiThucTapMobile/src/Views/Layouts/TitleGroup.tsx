import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TitleGroupProps} from './types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';

const TitleGroup: FC<TitleGroupProps> = (props) => {
  return (
    <ContainerBox style={styles.container}>
      <View style={styles.WrapTitle}>
        <Text style={styles.title}>{props.children}</Text>
      </View>
      <View style={styles.WrapAction}>
        <TouchableOpacity onPress={props.onPressMore} style={styles.ButtonAll}>
          <Text style={styles.TextBtnAll}>More</Text>
        </TouchableOpacity>
      </View>
    </ContainerBox>
  );
};

export default TitleGroup;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.CustomLightBlue,
    borderRadius: 5,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: Colors.CustomGreen,
    fontSize: 20,
    borderLeftWidth: 2,
    marginLeft: 5,
    borderColor: Colors.LightGreen,
  },
  WrapTitle: {
    justifyContent: 'center',
    flex: 80,
  },
  WrapAction: {
    flex: 20,
  },
  ButtonAll: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
    borderLeftWidth: 1,
    borderColor: Colors.LightGreen,
    marginVertical: 5,
    minWidth: 30,
  },
  TextBtnAll: {
    color: Colors.LightGreen,
    fontWeight: 'bold',
  },
});

import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {LayoutItemVocabularyProps} from '../_Layouts/types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
const LayoutItemVocabulary: FC<LayoutItemVocabularyProps> = (props) => {
  return (
    <View style={styles.container}>
      <ContainerBox style={styles.containerBox}>
        <View style={styles.WrapImage}>{props.Image}</View>
        <View style={styles.WrapContent}>{props.Content}</View>
        <View style={styles.WrapInfo}>{props.Action}</View>
      </ContainerBox>
    </View>
  );
};
export default LayoutItemVocabulary;

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 2,
    borderRadius: 5,
  },
  WrapImage: {
    flex: 30,
    padding: 3,
  },
  WrapContent: {
    flex: 50,
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 3,
  },
  containerBox: {
    flex: 1,
    borderRadius: 5,
    marginRight: 0,
    backgroundColor: Colors.CustomWhite,
    flexDirection: 'row',
  },
  WrapInfo: {
    marginVertical: 10,
    flex: 20,
    borderLeftWidth: 1,
    borderColor: Colors.LightGray,
  },
});

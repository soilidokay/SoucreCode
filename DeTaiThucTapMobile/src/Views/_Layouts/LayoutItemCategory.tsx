import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {LayoutItemCategoryProps} from '../_Layouts/types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
const LayoutItemCategory: FC<LayoutItemCategoryProps> = (props) => {
  return (
    <View style={styles.container}>
      <ContainerBox style={styles.containerBox}>
        {props.Content}
        {props.Action}
      </ContainerBox>
    </View>
  );
};
export default LayoutItemCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  containerBox: {
    flex: 1,
    borderRadius: 5,
    marginRight: 0,
    backgroundColor: Colors.CustomWhite,
  },
});

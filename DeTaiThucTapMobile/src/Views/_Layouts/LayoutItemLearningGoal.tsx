import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {LayoutItemLearningGoalProps} from '../_Layouts/types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
const LayoutItemLearningGoal: FC<LayoutItemLearningGoalProps> = (props) => {
  return (
    <View style={styles.container}>
      <ContainerBox style={styles.containerBox}>
        <View style={styles.WrapContent}>
          {props.Icon}
          {props.Text}
        </View>
        <View style={styles.wrapAction}>{props.Action}</View>
      </ContainerBox>
    </View>
  );
};
export default LayoutItemLearningGoal;

const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 3,
  },
  containerBox: {
    flex: 1,
    borderRadius: 5,
    marginRight: 0,
    backgroundColor: Colors.CustomWhite,
    flexDirection: 'row',
  },
  WrapContent: {
    flex: 70,
    flexDirection: 'row',
  },
  wrapAction: {
    flex: 30,
    flexDirection: 'row',
  },
});

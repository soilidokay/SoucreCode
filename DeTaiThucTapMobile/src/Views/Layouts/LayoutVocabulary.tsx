import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {LayoutVocabularyProps} from './types';

const LayoutVocabulary: FC<LayoutVocabularyProps> = (props) => {
  return <View style={styles.container}>{props.Content}</View>;
};

export default LayoutVocabulary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

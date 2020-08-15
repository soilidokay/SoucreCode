import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Colors from 'assets/Colors';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.LightGreen} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LightGreen_A5,
  },
});

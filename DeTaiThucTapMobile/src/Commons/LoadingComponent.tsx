import React, {FC} from 'react';
import {View, ActivityIndicator} from 'react-native';

const LoadingComponent: FC<{}> = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="orange" />
    </View>
  );
};

export default LoadingComponent;

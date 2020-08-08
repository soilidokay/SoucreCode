import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {PropsHome} from 'Views/type';

const Home: FC<PropsHome> = (props) => {
  const {theme} = props;
  return (
    <View style={theme?.containerStyle}>
      <Text>ScreenHome</Text>
    </View>
  );
};

export default Home;

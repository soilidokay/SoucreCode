/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/Providers/Redux';
import AppNavigate from 'src/Providers/Navigates';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigate />
        </PaperProvider>
      </StoreProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

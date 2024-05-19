import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Flatapi from './src/components/Flatapi';
import Flatapione from './src/components/Flatapione';

const App = () => {
  return (
    <View style={styles.container}>
      <Flatapione />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

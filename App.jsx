import {StyleSheet, Text, View} from 'react-native';
import React,{useState,useEffect} from 'react';
import Flatapi from './src/components/Flatapi';


const App = () => {
  return (
    <View style={styles.container}>
      <Flatapi />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { StatusBar } from 'expo-status-bar';
 import React from 'react';
 import { StyleSheet, View ,Text} from 'react-native';
 import Onboarding from './components/Onboarding';
 
 
 export default App = ()=> {
   return (
     <View style={styles.container}>
       <Onboarding />
       <StatusBar  />

     </View>
   )
 }
 
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   }
 });
 
 
  
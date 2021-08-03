import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.testUI}>
           <Text style={styles.testText}>Expenser</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testUI : {
    marginTop:20,
    width: 300,
    height: 200,
    backgroundColor:'#42224A',
    borderRadius:20,
    justifyContent:'center',
    alignItems :'center'
  },
  testText : {
    color: '#ffffff',
    fontSize:30,
    fontWeight:'900'
    }
});

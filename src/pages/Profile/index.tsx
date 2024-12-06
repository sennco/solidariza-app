import React from 'react';
import { StyleSheet, View } from 'react-native';
import Profile from '../../components/profile/index'; 


export default function Home() {

  return (
    <View style={styles.container}>
        <Profile/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
});

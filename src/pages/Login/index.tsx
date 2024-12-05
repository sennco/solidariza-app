import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginForm from '../../components/login/index'; 

export default function Login() {
  const handleLogin = (data: { username: string; password: string }) => {
    console.log("Dados do login:", data);

  };

  return (
    <View style={styles.container}>

      <LoginForm onSubmit={handleLogin} />
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

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cadastro from '../../components/cadastro/index'; 
import CadastroDoador from '../../components/cadastro/index';

export default function Home() {

  return (
    <View style={styles.container}>
        <CadastroDoador/>
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

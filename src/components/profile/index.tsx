import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExibirDados = () => {
  const [userData, setUserData] = useState(null);

  const buscarDados = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        Alert.alert("Nenhum dado encontrado", "Nenhum usuário foi cadastrado.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível recuperar os dados.");
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const limparDados = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUserData(null);
      Alert.alert("Sucesso", "Os dados foram apagados.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível apagar os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Cadastrados</Text>
      {userData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.value}>{userData.email}</Text>

          <Text style={styles.label}>Senha:</Text>
          <Text style={styles.value}>{userData.senha}</Text>
          
        </View>
      ) : (
        <Text style={styles.noData}>Nenhum dado cadastrado.</Text>
      )}

      <TouchableOpacity style={styles.clearButton} onPress={limparDados}>
        <Text style={styles.clearButtonText}>Limpar Dados</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dataContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "#FF5252",
    padding: 15,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ExibirDados;

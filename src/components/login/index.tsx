import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();

  const exibirToast = (mensagem: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(mensagem, ToastAndroid.SHORT);
    } else {
      Alert.alert("Aviso", mensagem);
    }
  };

  const handleSubmit = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        if (
          parsedUserData.email === username &&
          parsedUserData.senha === password
        ) {
          exibirToast("Login realizado com sucesso!");

      
          setUsername("");
          setPassword("");

          setTimeout(() => {
            navigation.navigate("Profile"); 
          }, 3000);
        } else {
          exibirToast("E-mail ou senha incorretos.");
        }
      } else {
        exibirToast("Nenhum usuário encontrado. Cadastre-se primeiro.");
      }
    } catch (error) {
      exibirToast("Erro ao verificar os dados de login.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>FAÇA SEU LOGIN</Text>

      <View style={styles.inputField}>
        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputField}>
        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputField: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginForm;

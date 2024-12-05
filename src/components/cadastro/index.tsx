import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ToastAndroid,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CadastroDoador = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [usercpf, setUsercpf] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [usercidade, setUsercidade] = useState("");
  const [userendereco, setUserendereco] = useState("");

  const navigation = useNavigation(); // Para navegação

  const exibirToast = (mensagem) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(mensagem, ToastAndroid.SHORT);
    } else {
      Alert.alert("Aviso", mensagem);
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return regex.test(senha);
  };

  const handleSubmit = async () => {
    if (
      !username ||
      !useremail ||
      !usercpf ||
      !userpassword ||
      !usercidade ||
      !userendereco
    ) {
      exibirToast("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarCPF(usercpf)) {
      exibirToast("CPF inválido.");
      return;
    }

    if (!validarSenha(userpassword)) {
      exibirToast(
        "Senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
      );
      return;
    }

    const payload = {
      cnpjCpf: usercpf,
      email: useremail,
      senha: userpassword,
      nome: username,
      cidadeEstado: usercidade,
      endereco: userendereco,
    };

    try {
      await AsyncStorage.setItem("userData", JSON.stringify(payload));
      exibirToast("Usuário cadastrado com sucesso!");

      setTimeout(() => {
        navigation.navigate("Login"); // Navega para a tela de login
      }, 3000);
    } catch (error) {
      exibirToast("Erro ao salvar os dados localmente.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        FAÇA O SEU CADASTRO PARA REALIZAR UMA DOAÇÃO!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        placeholderTextColor="#888"
        value={useremail}
        onChangeText={setUseremail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        placeholderTextColor="#888"
        value={usercpf}
        onChangeText={setUsercpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        placeholderTextColor="#888"
        value={userpassword}
        onChangeText={setUserpassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua cidade"
        placeholderTextColor="#888"
        value={usercidade}
        onChangeText={setUsercidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu endereço"
        placeholderTextColor="#888"
        value={userendereco}
        onChangeText={setUserendereco}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>CADASTRAR</Text>
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
  },
  logo: { width: 300, alignSelf: "center" },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5, color: "#000" },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  submitText: { color: "#FFFFFF", textAlign: "center", fontWeight: "bold" },
});

export default CadastroDoador;

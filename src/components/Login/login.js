import { Card } from "react-native-paper";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useState } from "react";
import firebase from "../../services/connectionFirebase";

export default function Login({changeStatus}) {
  const [type, setType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log(email.toString());
    console.log(password.toString());
    if (type === "login") {
      // Aqui fazemos o login
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((err) => {
          console.log(err);
          alert("Email ou senha não cadastrados!");
          return;
        });
    } else {
      // Aqui cadastramos o usuario
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao Cadastrar!");
          return;
        });
    }
  }

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Card>
      <Image 
              source = {require('../../../assets/curlyCosmeticos.png')}
              style={{width: '100%', height: 400}}
            />
           
        <Text style={styles.texto}>Login</Text>
        
        <TextInput
          label="E-mail"
          placeholder="Seu email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Digite a senha"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Card> 
          <Button
            onPress={handleLogin}
            title="Acessar"
            color="#29AB87"
            accessibilityLabel="botão de acesso"
            
          />
        </Card>
        <Card>
          <TouchableOpacity
            style={{
              backgroundColor: type === "login" ? "#3ea6f2" : "#141414",
            }}
          ></TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setType((type) => (type === "login" ? "cadastrar" : "login"))
            }
          >
            <Text style={{ textAlign: "center", backgroundColor:"#fff", marginTop:'2%' }}>
              {type === "login" ? "Criar uma conta" : "Já possuo uma conta"}
            </Text>
          </TouchableOpacity>
        </Card>
      </Card>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  handleLogin:{
    alignItems: 'center',
    justifyContent:'center',
    height: 45,
    marginBottom: 10,
  },
  loginText:{
    color: '#FFF',
    fontSize: 17,
  },
  container:{
    flex: 1,
    backgroundColor: '#FFF'
  },
  Image: {
    flex: 1,
    justifyContent: 'center',
    width: 20,
    height: 20
  },
  texto: {
    textAlign: "center",
    fontFamily: "arial",
    color: '#000',
    fontWeight: "bold",
    marginTop: 0,
    fontSize: 20,
    backgroundColor: "#fff",
  },
  input:{
    backgroundColor: "#fff",
    height:'30px',
    borderColor: 'black',
    paddingLeft: "5%",
    marginTop: "2%",
    marginBottom: "2%"
  },
  View:{
    backgroundColor: "#fff",
  },
  Button:{
    marginTop: 100,
  },
  Card: {
    backgroundColor: "#fff",
  }
});

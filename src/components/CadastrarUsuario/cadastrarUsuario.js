import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  FlatList,
  ActivityIndicator,
  inputRef,
  loading,
} from "react-native";
import firebase from "../../services/connectionFirebase";
import ListagemUsuario from "../Listar/listagemUsuario";

export default function CadastrarUsuario() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [key, setKey] = useState("");
  const [confirmedPassword, setConfirmedCreatePassword] = useState("");
  
  useEffect(() => {
    async function dadosUsuario() {
      await firebase
        .database()
        .ref("usuario")
        .on("value", (snapshot) => {
          setUsuarios([]);

          snapshot.forEach((chilItem) => {
            let data = {
              name: chilItem.val().name,
              createPassword: chilItem.val().createPassword,
              confirmedPassword: chilItem.val().confirmedPassword,
              login: chilItem.val().login,
            };

            setUsuarios((oldArray) => [...oldArray, data].reverse());
          });

          setLoading(false);
        });
    }

    dadosUsuario();
  }, []);
  async function insertUpdate() {
    //editar dados
    if ((name !== "") & (createPassword !== "") & (login !== "")) {
      firebase.database().ref("usuario").child(key).update({
        name: name,
        createPassword: createPassword,
        confirmedPassword: confirmedPassword,
        login: login,
      });
      //para o teclado do celular fixo abaixo do formulario(não flutuante)
      Keyboard.dismiss();
      alert("Usuário cadastrado com sucesso");
      clearData();
      setKey("");
      return;
    }
    //cadastrar dados - insert
    let usuario = await firebase.database().ref("usuario");
    let chave = usuario.push().key;

    usuario.child(chave).set({
      name: name,
      createPassword: createPassword,
      confirmedPassword: confirmedPassword,
      login: login,
    });

    alert("Usuario Cadastrado");
    clearData();
  }
  function clearData() {
    setName("");
    setLogin("");
    setCreatePassword("");
    setConfirmedCreatePassword("")
  }
  //função para excluir um item
  function handleDelete(key) {
    firebase
      .database()
      .ref("usuario")
      .child(key)
      .remove()

      .then(() => {
        const findUsuarios = usuarios.filter((item) => item.key !== key);

        setUsuarios(findUsuarios);
      });
  }

  //função para editar

  function handleEdit(data) {
    setName(data.name),
      setLogin(data.login),
      setCreatePassword(data.createPassword);
      setConfirmedCreatePassword(data.confirmedPassword);
  }
  return (
    <View style={style.container}>
      <SafeAreaView style={style.SafeAreaView}>
        <Text style={style.text}>Cadastro de Usuários</Text>

        <TextInput
          placeholder="Nome"
          style={style.input}
          value={name}
          onChangeText={(text) => setName(text)}
          ref={inputRef}
        />

        <TextInput
          placeholder="Login"
          style={style.input}
          value={login}
          onChangeText={(text) => setLogin(text)}
          ref={inputRef}
        />
        <TextInput
          placeholder="Senha"
          style={style.input}
          value={createPassword}
          onChangeText={(text) => setCreatePassword(text)}
          secureTextEntry={true}
          ref={inputRef}
        />
        <TextInput
          placeholder="Confirmar Senha"
          style={style.input}
          value={confirmedPassword }
          onChangeText={(text) => setConfirmedCreatePassword(text)}
          secureTextEntry={true}
          ref={inputRef}
        />


        <View style={style.button}>
          <Button
            onPress={insertUpdate}
            title="Cadastrar"
            color="#29AB87"
            accessibilityLabel=""
          />
        </View>
      </SafeAreaView>
      <View style={style.blocoLista}>
        <Text style={style.text}>Listagem de Usuários</Text>

        {loading ? (
          <ActivityIndicator color="#121212" size={45} />
        ) : (
          <FlatList
            keyExtractor={(item) => item.key}
            data={usuarios}
            renderItem={({ item }) => (
              <ListagemUsuario
                data={item}
                deleteItem={handleDelete}
                editItem={handleEdit}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "Arial",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    color: "#808080",
    fontWeight: "bold",
  },

  input: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 45,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#808080",
    multiline: "true",
    flexDirection: "row",
    maxHeight: 300,
    maxWidth: 300,
  },

  button: {
    width: 100,
    marginLeft: 30,
    marginTop: 20,
  },

  listar: {
    size: 4,
    color: "",
  },
  SafeAreaView: {
    flex: 3,
  },
  blocoLista: {
    flex: 3,
  },
});

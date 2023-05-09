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
  ActivityIndicator


} from "react-native";
import firebase from "../../services/connectionFirebase";
import Listagem from "../Listar/listaUsuario";

export default function CadastrarUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  useEffect(() => {

    async function dados() {

      await firebase.database().ref('person').on('value', (snapshot) => {

        setPeople([]);

        snapshot.forEach((chilItem) => {

          let data = {

            key: chilItem.key,

            name: chilItem.val().name,

            email: chilItem.val().email,

            category: chilItem.val().category,

            password: chilItem.val().password,

          };

          setPeople(oldArray => [...oldArray, data].reverse());

        })

        setLoading(false);

      })

    }

    dados();

  }, []);
  async function insertUpdate() {
    //editar dados
    if ((name !== "") & (email !== "") & (category !== "") & (password !== "") & (key !== "")) {
      firebase.database().ref("person").child(key).update({
        name: name,
        email: email,
        category: category,
        password: password,
      });
      //para o teclado do celular fixo abaixo do formulario(não flutuante)
      Keyboard.dismiss();
      alert("Usuário cadastrado com sucesso");
      clearData();
      setKey("");
      return;
    }
    //cadastrar dados - insert
    let people = await firebase.database().ref("person");
    let chave = people.push().key;

    people.child(chave).set({
        name: name,
        email: email,
        category: category,
        password: password,
    });

    alert("Usuário Cadastrado!");
    clearData();
  }
  //função para limpar os dados da tela
  function clearData() {
    setName("");
    setEmail("");
    setCategory("");
    setPassword("");
  }
  //função para excluir um item
  function handleDelete(key) {

    firebase.database().ref('person').child(key).remove()

      .then(() => {

        const findPeople = people.filter(item => item.key !== key)

        setPeople(findPeople)

      })

  }
  //função para editar  

  function handleEdit(data) {

    setKey(data.key),

      setName(data.name),

      setEmail(data.email),

      setCategory(data.category),

      setPassword(data.password)

  }
  return (
    <View style={style.container}>
      <SafeAreaView style={style.SafeAreaView}>
        <Text style={style.text}>Cadastrar Usuário</Text>

        <TextInput
          placeholder="Nome"
          style={style.input}
          value={name}
          onChangeText={(text) => setName(text)}
          ref={inputRef}
        />

        <TextInput
          placeholder="informe seu endereço de e-mail"
          style={style.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          ref={inputRef}
        />
        <TextInput
          placeholder="Tipo de produto favorito"
          style={style.input}
          value={category}
          onChangeText={(text) => setCategory(text)}
          ref={inputRef}
        />

        <TextInput
          placeholder="Password"
          style={style.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
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

        <Text style={style.text}>Lista de Usuários</Text>


        {loading ?

          (

            <ActivityIndicator color="#121212" size={45} />

          ) :

          (

            <FlatList

              keyExtractor={item => item.key}

              data={people}

              renderItem={({ item }) => (

                <Listagem data={item} deleteItem={handleDelete}

                  editItem={handleEdit} />

              )}

            />


          )

        }
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
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
    flex: 2
  },
  blocoLista: {
    flex: 3
  }

});

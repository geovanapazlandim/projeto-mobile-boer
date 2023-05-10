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
import Listagem from "../Listar/listagem";

export default function GerenciarProdutos() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [key, setKey] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  useEffect(() => {

    async function dados() {

      await firebase.database().ref('produtos').on('value', (snapshot) => {

        setProdutos([]);

        snapshot.forEach((chilItem) => {

          let data = {

            key: chilItem.key,

            name: chilItem.val().name,

            brand: chilItem.val().brand,

            price: chilItem.val().price,

            image: chilItem.val().image,

            category: chilItem.val().category,

          };

          setProdutos(oldArray => [...oldArray, data].reverse());

        })

        setLoading(false);

      })

    }

    dados();

  }, []);
  async function insertUpdate() {
    //editar dados
    if ((name !== "") & (brand !== "") & (price !== "") & (image !== "") & (category !== "") & (key !== "")) {
      firebase.database().ref("produtos").child(key).update({
        name: name,
        brand: brand,
        price: price,
        image: image,
        category: category,
      });
      //para o teclado do celular fixo abaixo do formulario(não flutuante)
      Keyboard.dismiss();
      alert("Dados dos Cosméticos Alterados com Sucesso!");
      clearData();
      setKey("");
      return;
    }
    //cadastrar dados - insert
    let produto = await firebase.database().ref("produtos");
    let chave = produto.push().key;

    produto.child(chave).set({
      name: name,
      brand: brand,
      price: price,
      image: image,
      category: category,
    });

    alert("Produto Cadastrado!");
    clearData();
  }
  //função para limpar os dados da tela
  function clearData() {
    setName("");
    setBrand("");
    setPrice("");
    setCategory("");
    setImage("");
  }
  //função para excluir um item
  function handleDelete(key) {

    firebase.database().ref('produtos').child(key).remove()

      .then(() => {

        const findProdutos = produtos.filter(item => item.key !== key)

        setProdutos(findProdutos)

      })

  }
  //função para editar  

  function handleEdit(data) {

    setKey(data.key),

      setName(data.name),

      setBrand(data.brand),

      setPrice(data.price),

      setCategory(data.category),

      setImage(data.image)

  }
  return (
    <View style={style.container}>
      <SafeAreaView style={style.SafeAreaView}>
        <Text style={style.text}>Cadastro de Produtos</Text>

        <TextInput
          placeholder="Nome"
          style={style.input}
          value={name}
          onChangeText={(text) => setName(text)}
          ref={inputRef}
        />

        <TextInput
          placeholder="Marca"
          style={style.input}
          value={brand}
          onChangeText={(text) => setBrand(text)}
          ref={inputRef}
        />
        <TextInput
          placeholder="Categoria"
          style={style.input}
          value={category}
          onChangeText={(text) => setCategory(text)}
          ref={inputRef}
        />

        <TextInput
          placeholder="Imagem"
          style={style.input}
          value={image}
          onChangeText={(text) => setImage(text)}
          ref={inputRef}
        />

        <TextInput
          placeholder="Preço"
          style={style.input}
          value={price}
          onChangeText={(text) => setPrice(text)}
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

        <Text style={style.text}>Listagem de Produtos</Text>


        {loading ?

          (

            <ActivityIndicator color="#121212" size={45} />

          ) :

          (

            <FlatList

              keyExtractor={item => item.key}

              data={produtos}

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
    flex: 1,
    padding: 30
  }

});

import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export default function Listagem({ data, deleteItem, editItem }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome: {data.name}</Text>

      <Text style={styles.text}>Email: {data.email}</Text>

      <Text style={styles.text}>Categoria: {data.category}</Text>

      <Text style={styles.text}>Senha: {data.password}</Text>

      <View style={styles.item}>
        <TouchableOpacity onPress={() => deleteItem(data.key)}>
          <Icon name="trash" color="black" size={15}>
            Excluir
          </Icon>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => editItem(data)}>
          <Icon name="create" color="blue" size={15}>
            Editar
          </Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 4,
    padding: 8,
    borderColor: "#808080",
    borderWidth: 1,
    backgroundColor: "#FFF",
  },

  text: {
    color: "black",

    fontSize: 17,
  },

  item: {
    flex: 1,

    flexDirection: "row",

    justifyContent: "space-around",
  },
});

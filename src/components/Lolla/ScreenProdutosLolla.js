import React, { Component } from "react";

import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import FinalizadoresLolla from "./ProdutosLolla";

import apiProdutosLolla from "../../services/apiProdutosLolla";

class ScreenProdutosLolla extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finalizadores: [],

      loading: true,
    };
  }

  async componentDidMount() {
    const response = await apiProdutosLolla.get("6468018eb89b1e2299a0e087");
    this.setState({
      finalizadores: response.data.record,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator color="#09A6FF" size={40} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.finalizadores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FinalizadoresLolla data={item} />}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ScreenProdutosLolla;

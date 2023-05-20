import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import GerenciarProdutos from "../Produtos/produtos";
import ScreenFilms from "../Filmes/screenfilmes";
import ScreenProdutosLolla from "../Lolla/ScreenProdutosLolla";
//import LinearGradient from 'react-native-linear-gradient';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/produto1.png")}
        style={{
          width: "30%",
          height: 200,
          backgroundColor: "#FFF",
        }}
      />
      <Image
        source={require("../../../assets/produto2.png")}
        style={{
          width: "30%",
          height: 200,
          backgroundColor: "#FFF",
        }}
      />
      <Image
        source={require("../../../assets/produto3.png")}
        style={{
          width: "30%",
          height: 200,
          backgroundColor: "#FFF",
        }}
      />
    </View>
  );
}

function LerApiDogScreen() {
  return <ScreenProdutosLolla />;
}

function PostScreen() {
  return (
    <View style={styles.container}>
      <GerenciarProdutos />
    </View>
  );
}
function Usuario() {
  return (
    <View style={styles.container}>
      <CadastrarUsuario />
    </View>
  );
}

function LerApiScreen() {
  return <ScreenFilms />;
}
function Usuarios() {
  return (
    <View style={styles.container}>
      <CadastrarUsuario />
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Produtos Lolla":
                iconName = "list-outline";
                break;
              case "Cadastrar":
                iconName = "save-outline";
                break;
              case "Filmes":
                iconName = "add-circle-outline";
                break;
              case "CadastrarUsuario":
                iconName = "person-circle-outline";
                break;

              default:
                iconName = "person-circle-outline";
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#9C27B0",
          inactiveTintColor: "#777",
          showLabel: true,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Lolla" component={LerApiDogScreen} />
        <Tab.Screen name="Cadastrar" component={PostScreen} />
        <Tab.Screen name="Filmes" component={LerApiScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconTabRound: {
    width: 60,
    height: 90,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

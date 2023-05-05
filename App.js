// //biblioteca para melhorar a sensibilidade do touch
// import 'react-native-gesture-handler';
// import React from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import TelaPrincipal from './src/components/telaPrincipal/telaprincipal';
// import Login from './src/components/Login/login';

// const Stack = createStackNavigator();

// class App extends React.Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="AppCosméticos"
//             component={TelaPrincipal}
//           />
//           <Stack.Screen
//             name="Login"
//             component={Login}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

// export default App;
import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";

import Login from "./src/components/Login/login";
import Menu from "./src/components/menu/menutabs";

export default function App() {
  const [user, setUser] = useState(null);

  //verifica se existe um usuário logado, se não houver chama a
  //tela de login
  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  return <Menu />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: "#F2f6fc",
  },
});

import { Card } from 'react-native-paper';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import React from 'react';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
//import firebase from '../../services/connectionFirebase';

export default class TelaPrincipal extends React.Component
  {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: ''
      }
    }
    render(){
      return(
        <View style={styles.container}>
          <Card>
            <Image 
              source = {require('../../../assets/curlyCosmeticos.png')}
              style={{width: '100%', height: 400, backgroundColor: '#FFF'}}
            />

          </Card>
         
          <Text>Email</Text>
          <input placeholder='ex.: fulano@fulano.com'/>
          <Text>Senha</Text>
          <input placeholder='digite sua senha'/>
          
          <Button
        title="Entrar"
        onPress={() => this.props.navigation.navigate('Login')}
        
      />
       <Button
        title="Ajuda"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      
        </View>
      )
    }
    
  }

const styles = StyleSheet.create({
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
    marginTop: 10
  },
  
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import firebase from 'firebase';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      input: ''
    };

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCL1JFcArYV-BIyX7ooysMBzKSIvqHsphw",
      authDomain: "todo-79084.firebaseapp.com",
      databaseURL: "https://todo-79084.firebaseio.com",
      projectId: "todo-79084",
      storageBucket: "todo-79084.appspot.com",
      messagingSenderId: "122568684244"
    };
    firebase.initializeApp(config);
    this.carregaTodo();
  }

  carregaTodo() {

    firebase.database().ref('todo').orderByChild('done').on('value', (snaphot) => {
      let s = this.state;
      s.lista = [];

      snaphot.forEach((childItem) => {

        let val = childItem.val();
        s.lista.push({
          key: childItem.key,
          item: val.item,
          done: val.done
        });

      });

      this.setState(s);
    });


  }

  alteraTexto(valor) {
    let s = this.state;
    s.input = valor;
    this.setState(s);
  }

  adicionar() {

    let s = this.state;
    let texto = s.input;
    s.input = '';
    this.setState(s);

    if (texto.length > 0) {

      let todo = firebase.database().ref('todo');
      let key = todo.push().key;

      todo.child(key).set({
        item: texto,
        done: 0
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.areaAdicionar}>
          <Text style={styles.textoAdicionar}>Adicione uma nova tarefa</Text>
          <TextInput value={this.state.input} onChangeText={this.alteraTexto.bind(this)} style={styles.textBox} />
          <Button title='Adicionar' onPress={this.adicionar.bind(this)}></Button>
        </View>

        <View style={styles.areaLista}>

          <FlatList
            data={this.state.lista}
            renderItem={({ item }) => <TodoItem data={item} />}

          >

          </FlatList>
        </View>
      </View>
    );
  }
}

const checked = {
  'off': require('./assets/images/checked_off.png'),
  'on': require('./assets/images/checked_on.png'),
}

class TodoItem extends Component {


  marcar() {
    let done = this.props.data.done == '0' ? 1 : 0;
    firebase.database().ref('todo/' + this.props.data.key).child('done').set(done);
  }

  deletar() {

    // Works on both iOS and Android
    Alert.alert(
      'Atenção', 'Confirma remover o item selecionado?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            let key = this.props.data.key;
            firebase.database().ref('todo/' + this.props.data.key).remove();
          }
        },
      ],
      { cancelable: false }
    )



  }

  render() {

    this.concluido = this.props.data.done == '0' ? checked['off'] : checked['on'];

    return (
      <View style={styles.areaTodoItem}>

        <TouchableOpacity onPress={this.marcar.bind(this)} style={styles.areaConcluido} >
          <Image source={this.concluido} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.textItem} >{this.props.data.item}</Text>

        <TouchableOpacity onPress={this.deletar.bind(this)} style={styles.areaDeletar} >
          <Image source={require('./assets/images/delete.png')} style={styles.image} />
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  areaAdicionar: {
    flex: 1,
    backgroundColor: '#CCCCCC'
  },
  areaLista: {
    flex: 4
  },
  textoAdicionar: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  textBox: {
    backgroundColor: '#BBBBBB',
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  areaTodoItem: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  areaDeletar: {
    flex: 1,
    alignItems: 'flex-end'

  },
  areaConcluido: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textItem: {
    flex: 5,
  }

});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      input: ''
    };

    this.url = 'https://b7web.com.br/todo/85135';
    this.carregaTodo();
  }

  carregaTodo() {

    fetch(this.url)
      .then((r) => r.json())
      .then((json) => {

        let s = this.state;
        s.lista = json.todo;
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

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item: texto
      })
    })
      .then((r) => r.json())
      .then((json) => {
          this.carregaTodo();
    });

   


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
            keyExtractor={(item, index) => item.id}
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

  }

  deletar() { }

  render() {

    this.concluido = this.props.data.done == '0' ? checked['off'] : checked['on'];

    return (
      <View style={styles.areaTodoItem}>

        <TouchableOpacity onPress={this.marcar} >
          <Image source={this.concluido} style={styles.image} />
        </TouchableOpacity>

        <Text>{this.props.data.item}</Text>

        <TouchableOpacity onPress={this.deletar} style={styles.areaDeletar} >
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
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  areaDeletar: {
    flex: 1,
    alignItems: 'flex-end'

  }

});
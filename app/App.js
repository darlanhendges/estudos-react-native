import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform
} from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      filmes: [],
      loading: true
    };

    fetch('https://facebook.github.io/react-native/movies.json')
      .then((r) => r.json())
      .then((json) => {
        let s = this.state;
        s.filmes = json.movies;
        s.loading = false;
        this.setState(s);
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text>Carregando...</Text>
        </View>


      );
    }
    else {

      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.filmes}
            renderItem={({ item }) => <Filme data={item} />}
            keyExtractor={(item, index) => item.id}
          />
        </View>

      );
    }
  }
}

class Filme extends Component {

  render() {
    const item = this.props.data;

    return (


      <View style={styles.filmeArea}>


        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.releaseYear}</Text>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 40 : 0
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filmeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderBottomColor: '#00FF00',
    borderBottomWidth: 1,
  }
});
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListaScreen extends Component {

    static navigationOptions = {
        title: 'Lista de Receitas'
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>

              
                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Receita');  }}>
                     <Icon name="address-book" size={30} color="#900" />
                  </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

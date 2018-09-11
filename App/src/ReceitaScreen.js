import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createTabNavigator } from 'react-navigation';
import ReceitaResumoScreen from './ReceitaResumoScreen';
import ReceitaIngredientesScreen from './ReceitaIngredientesScreen';

const Abas = createTabNavigator({

    ReceitaResumo: {
        screen: ReceitaResumoScreen
    },
    ReceitaIngredientes: {
        screen: ReceitaIngredientesScreen
    }

}, {
        tabBarPosition: 'top',
        animationEnabled: true,        // adicione isto para corrigir 
        swipeEnabled: false,
        lazy: false,                   // adicione isso para corrigir
    });


export default class ReceitaScreen extends Component {

    static navigationOptions = {
        title: 'Receita',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Receita </Text>

                <Abas />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
});
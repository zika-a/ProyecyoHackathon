import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Login from './src/components/login/login';
import LoginForm from './src/components/login/LoginForm';
class Pantalla extends Component{
    render(){
        return(
            <Login>
                <View></View>
            </Login>
        )
    }
}
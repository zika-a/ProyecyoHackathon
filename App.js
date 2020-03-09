import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Login from './src/components/login/login';
import User from './src/components/login/vUser';
import Evento from './src/components/login/Eventos';
//import LoginForm from './src/components/login/LoginForm';

class App extends Component {
    render() {
        return (
            <Login/>
        )
    }
}
export default App
//AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp)
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StatusBar,
    Alert,
} from 'react-native';
import axios from "axios";
import Eventos from './Eventos';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            usuario: false,
        }

    }

    render() {
        if (this.state.usuario) {
            return (
                <Eventos></Eventos>
            )
        }

        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    //keyboardType="email-adress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder="Password "
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    secureTextEntry
                    returnKeyType="go"
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableOpacity onPress={this.HandleLogin} style={styles.bottonContainer}>
                    <Text style={styles.buttonText}> LOGIN </Text>
                </TouchableOpacity>
            </View>
        )

    }

    HandleLogin = async () => {
        console.log(this.state.email),
            console.log(this.state.password)
        const res = await axios.post('https://daniel-hacka-hola.herokuapp.com/login', {
            email: this.state.email,
            password: this.state.password
        });
        const data = res.data;
        console.log(data.status)

        if (data.status) {
            this.setState({
                usuario: true
            })
            console.log(data.usuario.tipo);
            switch (data.usuario.tipo) {
                case 'administrador': /* mostrar administrador */ break;
                case 'usuario':
                    <Eventos></Eventos>
                    break;
            }
        } else {
            this.state = {
                email: '',
                password: '',
            }

        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,0,0,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },
    bottonContainer: {
        backgroundColor: 'rgba(255,0,0,0.7)',
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',

    }
})

export default LoginForm;
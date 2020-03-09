import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import axios from 'axios';

class BottonDoor extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.handleDoor} style={styles.boton} modo={this.props.modo}>
                <Text style={{ fontSize: 20, color: 'white' }}>  {this.props.modo} </Text>
            </TouchableHighlight>
        )
    }
    open = async () => {
        const res = await axios.get('https://daniel-hacka-hola.herokuapp.com/api/abrir')
        const data = res.data
        if (data.status) {
            this.props.change(true)
        }
    }
    close = async () =>{
        const res = await axios.get('https://daniel-hacka-hola.herokuapp.com/api/abrir')
        const data = res.data
        if (data.status) {
            this.props.change(false)
        }
    }

    handleDoor = () => {
        if (this.props.modo === 'Abrir puerta'){
            this.open();
            return;
        }
        this.close();
    }
}
const styles = StyleSheet.create({
    boton: {
        width: 300,
        height: 100,
        backgroundColor: 'blue',
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
    }
})


export default BottonDoor;
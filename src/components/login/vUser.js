import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import axios from 'axios';

class vUser extends Component {
    constructor() {
        super();
        this.state = {
            abierto: false,
        }
    }
    render() {
        if (this.state.abierto) {
            return (
                <View style={styles.alternativeLayoutButtonContainer}>
                    <View style={styles.focoGreen} />
                    <TouchableHighlight onPress={this.close} style={styles.boton}>
                        <Text style={styles.textoBoton}> Cerrar puerta</Text>
                    </TouchableHighlight>                    
                </View>
            )
        } else {
            return (
                <View style={styles.alternativeLayoutButtonContainer}>
                     <View style={styles.focoRed} />
                    <TouchableHighlight onPress={this.open} style={styles.boton}>
                        <Text style={styles.textoBoton}>  Abrir puerta </Text>
                    </TouchableHighlight>                   
                </View>
            )
        }
    }
    open = async () => {
        const res = await axios.get('https://daniel-hacka-hola.herokuapp.com/api/abrir')
        const data = res.data
        if (data.status) {
            this.setState({
                abierto: true,
            })
        }
    }

    close = async () => {
        const res = await axios.get('https://daniel-hacka-hola.herokuapp.com/api/cerrar')
        const data = res.data
        if (data.status) {
            this.setState({
                abierto: false,
            })
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(35, 35, 35)',
        alignItems: 'center',
    },
    boton: {
        width: 200,
        height: 70,
        backgroundColor: 'rgb(170,170,170)',
        alignItems: 'center',
        marginVertical: 75,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
    },
    focoGreen: {
        width: 70,
        height: 70,
        backgroundColor: 'green',
        marginVertical: 75,
        marginLeft: 30,
        marginRight: 50,
        alignItems: "center",
        borderRadius: 200,
        borderWidth: 1,
    },
    focoRed: {
        width: 70,
        height: 70,
        backgroundColor: 'rgb(255,0,0)',
        marginVertical: 75,
        marginLeft: 30,
        marginRight: 50,
        alignItems: "center",
        borderRadius: 200,
        borderWidth: 1,
    },
    alternativeLayoutButtonContainer: {
        //margin: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(35, 35, 35)',
    },
    textoBoton:{
        fontSize: 20,
    }

})
export default vUser;
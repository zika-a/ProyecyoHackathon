import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

class LanzPuerta extends Component {
  constructor() {
    super();
    this.state = {
      abierto: false,
    }
  }

  render() {
    if (this.state.abierto) {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={this.close} style={styles.boton}>
            <Text style={styles.textoBoton}> Cerrar puerta</Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
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
    alignItems: 'center',
  },
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
  },
  botonRed: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    marginTop: 50,
    borderRadius: 360,
  },
  textoBoton: {
    fontSize: 20,
    color: 'white',
  },
})

export default LanzPuerta;

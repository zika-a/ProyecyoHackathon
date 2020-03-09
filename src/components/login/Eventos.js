import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Door from './vUser';
import Constants from 'expo-constants';
import axios from 'axios';

class Eventos extends Component {
    constructor() {
        super();
        this.state = {
            crear: false,
            mostrar: false,
            abierto: false,
            eventos: [],
            nombre: '',
            fecha: '',
            horai: '',
            horaf: '',
        }
    }
    render() {
        if (this.state.crear) {
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>Registro del evento</Text>
                    <TextInput
                        placeholder="Nombre del evento"
                        placeholderTextColor="rgba(0,0,0,0.5)"
                        style={styles.input}
                        onChangeText={nombre => this.setState({ nombre })}
                        value={this.state.nombre}
                    ></TextInput>
                    <TextInput
                        placeholder="Fecha del evento"
                        placeholderTextColor="rgba(0,0,0,0.5)"
                        style={styles.input}
                        onChangeText={fecha => this.setState({ fecha })}
                        value={this.state.fecha}
                    ></TextInput>
                    <TextInput
                        placeholder="Hora inicio"
                        placeholderTextColor="rgba(0,0,0,0.5)"
                        style={styles.input}
                        onChangeText={horai => this.setState({ horai })}
                        value={this.state.horai}
                    ></TextInput>
                    <TextInput
                        placeholder="Hora fin "
                        placeholderTextColor="rgba(0,0,0,0.5)"
                        style={styles.input}
                        onChangeText={horaf => this.setState({ horaf })}
                        value={this.state.horaf}
                    ></TextInput>
                    <View style={styles.AlternativeLayoutGrid}>
                        <TouchableHighlight onPress={this.regreso} style={styles.botonRegistro}>
                            <Text style={styles.texto}>Cancelar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.Capturar} style={styles.botonRegistro}>
                            <Text style={styles.texto}>Guardar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }

        if (this.state.mostrar) {
            console.log('Mostrar rjefv')
            return (

                <View style={{ flex: 1, paddingTop: 20 }}>

                    <Text style={styles.textot}>Eventos:</Text>
                    <Text style={styles.texto}>{this.state.eventos[0].name}</Text>
                    <Text style={styles.texto}>{this.state.eventos[1].name}</Text>
                    <Text style={styles.texto}>{this.state.eventos[2].name}</Text>
                    <TouchableHighlight onPress={this.regreso} style={styles.botonRegistro}>
                        <Text style={styles.texto}>Regresar</Text>
                    </TouchableHighlight>
                </View>


                //<SafeAreaView style={styles.containerTabla}>

                //</SafeAreaView>
                /*
                <View style={styles.containerTabla}>
                    <label>Eventos actuales</label>
                    <table>
                        <thead>
                            <tr>
                                <th> Nombre </th>
                                <th> Fecha </th>
                                <th> Hora </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.eventos.map((evento) => {
                                    return (
                                        <tr key={evento._id}>
                                            <td> {evento.name} </td>
                                            <td> {evento.date} </td>
                                            <td> {evento.time}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </View>
                */
            )
        }

        return (
            <View style={styles.container} >
                <Door />
                <TouchableHighlight onPress={(this.CrearEvento)} style={styles.boton}>
                    <Text style={styles.textoBoton}> Crear evento</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={(this.MostrarEventos)} style={styles.boton}>
                    <Text style={styles.textoBoton}> Mostrar eventos </Text>
                </TouchableHighlight >
            </View>
        )
    }

    renderItem = ({ item }) => {
        <TouchableOpacity>
            <View style={styles.tablaContenido}>
                <Text style={{ fontSize: 50, color: 'green' }}>{item.name}</Text>
                <Text>{item.date}</Text>
            </View>
        </TouchableOpacity>
    }
    CrearEvento = async () => {
        this.setState({
            crear: true,
            mostrar: false,
        })

    }
    MostrarEventos = async () => {
        const res = await axios.get('https://daniel-hacka-hola.herokuapp.com/getEventosReu')
        const dato = res.data
        if (dato.status)
            console.log('se obtuvo el registro con éxito')
        this.setState({
            mostrar: true,
            crear: false,
            eventos: dato.eventosReu,
        })
    }
    Capturar = async () => {
        const nom = await axios.post('https://daniel-hacka-hola.herokuapp.com/createEventoReu', {
            name: this.state.nombre,
            date: this.state.fecha,
            openTime: this.state.horai,
            closeTime: this.state.horaf
        })
        const dato = nom.data
        if (dato.status)
            console.log('Evento registrado')

        this.setState({
            crear: false,
            mostrar: false
        });
    }
    regreso = () => {
        this.setState({
            crear: false,
            mostrar: false,
            eventos: [],
            nombre: '',
            fecha: '',
            horai: '',
            horaf: '',
        })
    }
}

/*function Item ({name, date}) {
    return(
        <View style={styles.Item}>
            <Text style = {styles.Texto}>
                {title}
            </Text>
            <Text style = {styles.Texto}>
                {date}
            </Text>
        </View>
    )       
}
*/
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(35, 35, 35)',
        alignItems: 'center',
    },
    containerTabla: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
    AlternativeLayoutGrid: {
        flex: 1,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(35, 35, 35)',
    },
    botonRegistro: {
        width: 100,
        height: 40,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
    },
    boton: {
        width: 200,
        height: 70,
        backgroundColor: 'rgb(170,170,170)',
        alignItems: 'center',
        marginTop: 30,
        marginEnd: 20,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
    },
    label:
    {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50,
        width: 200,
        alignSelf: 'auto',
    },
    textoBoton: {
        color: 'black',
        fontSize: 20,
    },
    texto: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    textot: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        width: 300,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        //flexDirection: 1,
        padding: 10,
        backgroundColor: 'backgroundColor: rgb(170,170,170)',
    },
    tablaContenido: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        justifyContent: 'flex-start',
        margin: 15,
    },
})


export default Eventos;
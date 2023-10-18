import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'

export default function ListaCarros() {

    const [carros, setCarros] = useState([]) // Inicializado como um array vazio
    const [inputValue, setInputValue] = useState('')
    const [editando, setEditando] = useState(false)
    const [carroSendoEditado, setCarroSendoEditado] = useState(null)

    function adicionarCarro() {
        let novaListaCarros = [...carros, inputValue] // Copiando o array e adicionando o novo valor ;)
        setCarros(novaListaCarros)
        setCarroSendoEditado(null)
        setInputValue('')
    }

    function editarCarro() {
        let index = carros.indexOf(carroSendoEditado)
        let novaListaCarros = [...carros]
        novaListaCarros.splice(index, 1, inputValue)
        setCarros(novaListaCarros)
        setEditando(false)
        setInputValue('')
    }

    function excluirCarro(carro) {
        let novaListaCarros = carros.filter(item => item !== carro)
        setCarros(novaListaCarros)
    }

    function handleEditarCarro(carro) {
        setCarroSendoEditado(carro)
        setInputValue(carro)
        setEditando(true)
    }

    function handleButton() {
        if (editando) {
            editarCarro()
        } else {
            adicionarCarro()
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label={editando ? 'Editando Carro' : 'Carro'}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />

                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={handleButton}
                    icon={() => (
                        <IconButton
                            icon="plus"
                        />
                    )}
                >
                    {editando ? 'Edit' : 'Add'}
                </Button>

            </View>

            <FlatList
                style={styles.list}
                data={carros}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => {
                                handleEditarCarro(item)
                            }} />
                            <IconButton icon='trash-can-outline' onPress={() => {
                                excluirCarro(item)
                            }} />
                        </Card.Content>
                    </Card>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingTop: 10,
        gap: 5
    },
    button: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '95%',
        marginTop: 10
    },
    card: {
        margin: 5
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';

import ContatosDao from '../db/ContatosDao';
import { createUUID } from '../util/guid';

export default function NewContato() {
    const navigation = useNavigation()
    const [nome, setNome] = useState('');
    const [fone, setFone] = useState('')

    const submit = useCallback(async () => {
        const obj = {
            nome,
            telefone: fone
        }

        obj.id = createUUID()
        try {
            await ContatosDao.Insert(obj)
            alert("Cadastro realizado com sucesso!")
            navigation.navigate("Contatos")
        } catch (error) {
            alert(error.message)
        }
    }, [nome, fone, navigation])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.titleTest}>Novo contato</Text>
                <View style={styles.marginView}>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNome}
                            value={nome}
                            placeholder="Digite seu nome"
                            keyboardType="default"
                        />
                    </View>
                    <View style={styles.viewButton}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFone}
                            value={fone}
                            placeholder="Digite telefone"
                            keyboardType="default"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={submit}
                    >
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    titleTest: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'transparent',
        color: 'black',
        height: 35,
        paddingHorizontal: 20,
        borderColor: 10,
        borderWidth: 0.7,
        borderRadius: 50
    },
    marginView: {
        paddingHorizontal: 10,
        marginVertical: 20
    },
    viewButton: {
        marginTop: 10
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#2196f3',
        color: 'white',
        padding: 5,
        width: '100%',
        alignItems: 'center'
    }
})
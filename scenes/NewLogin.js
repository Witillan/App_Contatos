import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';

import LoginDao from '../db/LoginDao';
import { createUUID } from '../util/guid';

export default function NewLogin() {
    const navigation = useNavigation()
    const [email, setChangeEmail] = useState('');
    const [password, setChangePassword] = useState('');
    const [password2, setChangePassword2] = useState('');
    const [checked, setChecked] = useState(false);

    // const getEmail = useCallback(async () => {
    //     const value = await LoginDao.GetEmail(email)
    //     value.then((r) => console.log(r)).cath((e) => console.log(e.message))
    // }, [])

    const submit = useCallback(async () => {
        const obj = {
            email,
            senha: password
        }

        obj.id = createUUID()
        try {
            await LoginDao.Insert(obj)
            alert("Cadastro realizado com sucesso!")
            navigation.navigate("Login")
        } catch (error) {
            alert(error.message)
        }
    }, [email, password, navigation])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.titleTest}>Sign in</Text>
                <View style={styles.marginView}>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setChangeEmail}
                            value={email}
                            placeholder="Digite seu email"
                            keyboardType="default"
                        />
                    </View>
                    <View style={styles.viewButton}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setChangePassword}
                            value={password}
                            placeholder="Digite sua senha"
                            keyboardType="default"
                        />
                    </View>
                    <View style={styles.viewButton}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setChangePassword2}
                            value={password2}
                            placeholder="Digite novamente sua senha"
                            keyboardType="default"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {checked ? <MaterialIcons onPress={() => setChecked(false)} name="check-box" size={20} color="#2196f3" />
                        : <MaterialIcons onPress={() => setChecked(true)} name="check-box-outline-blank" size={20} color="#2196f3" />}
                    <Text style={{ marginHorizontal: 5 }}>Eu li e aceito os</Text>
                    <Text onPress={() => navigation.navigate("NewLogin")} style={{ color: '#1877f2' }}>Termos de Serviço</Text>
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: checked ? '#2196f3' : '#cccccc' }]}
                        onPress={submit}
                        disabled={!checked}
                    >
                        <Text style={{ color: 'white' }}>Entrar</Text>
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
        color: 'white',
        padding: 10,
        width: '100%',
        alignItems: 'center'
    }
})
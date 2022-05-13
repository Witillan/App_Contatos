import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoginDao from '../db/LoginDao';

export default function Login() {
    const navigation = useNavigation()
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    useEffect(useCallback(() => {
        const get = async () => {
            const cadastro = await LoginDao.GetCadastros()
            // cadastro.then((r) => console.log(r)).catch((e) => e.message)
            console.log(cadastro)
        }
        get()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.titleTest}>Sign in</Text>
                <View style={styles.marginView}>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Digite seu email"
                            keyboardType="default"
                        />
                    </View>
                    <View style={styles.viewButton}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="Digite sua senha"
                            keyboardType="default   "
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Contatos")}
                    >
                        <Text style={{ color: 'white' }}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'center' }}>ou continue com</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="google" size={24} color="white" />
                            <Text style={{ marginLeft: 10, color: 'white' }}>Continue com o Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="facebook-square" size={24} color="white" />
                            <Text style={{ marginLeft: 10, color: 'white' }}>Continue com o Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text onPress={() => navigation.navigate("NewLogin")} style={{ color: '#1877f2', marginTop: 10 }}>Criar nova conta</Text>
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
        padding: 10,
        width: '100%',
        alignItems: 'center'
    }
})
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';

import ContatosDao from '../db/ContatosDao';

export default function Contatos() {
    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false)
    const [listContatos, setListContatos] = useState([])

    useFocusEffect(useCallback(() => {
        setRefreshing(true)
        ContatosDao.GetCadastros().then((r) => setListContatos(r)).finally(() => setRefreshing(false))
    }, []))

    const formatarTelefone = (v) => {
        if (!v) {
            return ''
        }
        let r = v.replace(/\D/g, '')
        r = r.replace(/^0/, '')

        if (r.length >= 11) {
            r = r.replace(/^(\d{2})(\d)(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
        }
        return r
    }

    const Item = ({ item }) => {
        return (
            <View style={{ padding: 20 }}>
                <Text>{item.nome || '---'}</Text>
                <Text>{formatarTelefone(item.telefone) || '---'}</Text>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <Item item={item} />
    )

    const flatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.titleTest}>Contatos</Text>
            <FlatList
                refreshing={refreshing}
                data={listContatos}
                renderItem={renderItem}
                ItemSeparatorComponent={flatListItemSeparator}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                ListEmptyComponent={() => <Text>{'Não há itens para exibir'}</Text>}
                ListFooterComponent={() => refreshing && (
                    <View>
                        <Text>Carregando Contatos...</Text>
                    </View>
                )}
            />
            <View style={{ marginTop: 20, width: '100%' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("NewContato")}
                >
                    <Text style={{ color: 'white' }}>Novo</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 30,
        marginLeft: 10,
        fontSize: 20,
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
        backgroundColor: '#2196f3',
        padding: 10,
        width: '100%',
        alignItems: 'center'
    }
})
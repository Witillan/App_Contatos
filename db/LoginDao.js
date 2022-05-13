import Sqlite from './Sqlite'

export default class LoginDao {

    static Insert(value) {
        return new Promise((resolve, reject) => {
            debugger
            const db = Sqlite.getDb()

            db.transaction(tx => {
                const parameters = [
                    value.id,
                    value.email,
                    value.senha,
                ]
                tx.executeSql(`insert or replace into Cadastro values (${parameters.map(() => '?').join(',')})`, parameters)
            }, reject, resolve)
        })
    }

    static GetEmail(email) {
        return new Promise((resolve, reject) => {
            const db = Sqlite.getDb()

            const query = `select * from Cadastro where email = ${email}`

            db.transaction(tx => {
                tx.executeSql(query, [], (_, { rows }) => resolve(rows._array), (_, error) => { return reject(error) })
            })
        })
    }

    static GetCadastros() {
        return new Promise((resolve, reject) => {
            const db = Sqlite.getDb()

            const query = 'select * from Cadastro'

            db.transaction(tx => {
                tx.executeSql(query, [], (_, { rows }) => resolve(rows._array), (_, error) => { return reject(error) })
            })
        })
    }
}
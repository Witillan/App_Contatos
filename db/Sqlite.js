import * as SQLite from 'expo-sqlite'

export default class Sqlite {
  static getDb() {
    return SQLite.openDatabase('Contatos')
  }

  static runDDL() {
    const db = this.getDb()

    // Executando transaction da DDL do banco
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`create table if not exists Cadastro (
        id int primary key not null,
        email text,
        senha text
      )`)
      }, reject, resolve)

      db.transaction(tx => {
        tx.executeSql(`create table if not exists Contatos (
        id int primary key not null,
        nome text,
        telefone text
      )`)
      }, reject, resolve)
    })
  }

  // Adicionar novas colunas nas tabelas
  static addNewColumns() {
    const db = this.getDb()

    // Executando transaction da DDL do banco
    return new Promise((resolve) => {
      db.exec([
        {
          sql: '',
          args: []
        }
      ], false, resolve)
      resolve()
    })
  }
}

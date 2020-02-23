import { constants, utils } from './internal'

const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

export default class database {
  constructor() {
    this._data = {
      db: null
    }
  }

  static dbExists() {
    const sfnc = `database.dbExists() ${constants.MDJSE.DATABASE.DATABASE_FILE}`

    console.log(sfnc)
    let exists = fs.existsSync(constants.MDJSE.DATABASE.DATABASE_FILE)
    console.log(`${sfnc} exists = ${exists}`)
    return exists
  }

  static async createDb() {
    const sfnc = `database.createDb() ${constants.MDJSE.DATABASE.DATABASE_FILE}`

    if (!database.dbExists()) {
      return new Promise(resolve => {
        new sqlite3.Database(constants.MDJSE.DATABASE.DATABASE_FILE, e => {
          if (e) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
      }).then(async r => {
        if (r === true) {
          console.log(`${sfnc} success = ${r}`)
          let db = new database()
          await db.connect()
          await db.init()
          db.disconnect()
        } else {
          throw new Error(`${sfnc} an error occurred during attempt to create database`)
        }
      })
    } else {
      console.log(`${sfnc} database was not created because it already exists`)
    }
  }

  static deleteDb() {
    const sfnc = `database.deleteDb()`

    if (database.dbExists()) {
      fs.unlinkSync(constants.MDJSE.DATABASE.DATABASE_FILE)
      console.log(`${sfnc} database deleted @ ${constants.MDJSE.DATABASE.DATABASE_FILE}`)
    } else {
      console.log(
        `${sfnc} database ${constants.MDJSE.DATABASE.DATABASE_FILE} not deleted because it does not exist`
      )
    }
  }

  async init() {
    const sfnc = `database.init()`

    console.log(
      `${sfnc} attempting to create table [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}]`
    )

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        await this.runSql(
          `create table ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}(key text primary key, created text, note text)`
        )
        console.log(
          `${sfnc} [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}] table created`
        )
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async connect() {
    const sfnc = `database.connect()`

    if (database.dbExists()) {
      return new Promise(resolve => {
        this._data.db = new sqlite3.Database(
          constants.MDJSE.DATABASE.DATABASE_FILE,
          e => {
            if (e) {
              console.log(e)
              resolve(null)
            } else {
              resolve(true)
            }
          }
        )
      }).then(async r => {
        if (r) {
          console.log(
            `${sfnc} success = ${r}, connected @ ${constants.MDJSE.DATABASE.DATABASE_FILE}`
          )
        } else {
          console.log(
            `${sfnc} success = ${r}, could not connect @ ${constants.MDJSE.DATABASE.DATABASE_FILE}`
          )
        }
      })
    } else {
      console.log(`${sfnc} could not connect to database becuase it does not exist`)
    }
  }
  disconnect() {
    const sfnc = `database.disconnect()`
    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        this._data.db.close()
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }
  async runSql(sql, params = []) {
    const sfnc = `database.runSql(${sql})`
    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return new Promise((resolve, reject) => {
          this._data.db.run(sql, params, function(e) {
            if (e) {
              console.log(e)
              reject(e)
            } else {
              resolve({
                msg: `${sfnc} success`
              })
            }
          })
        })
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async runSelect(sql) {
    const sfnc = `database.runSelect()`
    console.log(`${sfnc} sql = ${sql}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return new Promise(resolve => {
          this._data.db.all(sql, (e, rows) => {
            if (e) {
              resolve(null)
            } else {
              resolve(rows)
            }
          })
        })
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async getAllTables() {
    const sfnc = `database.getAllTables()`
    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(`SELECT name FROM sqlite_master WHERE type='table'`)
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async tableExists(tableName) {
    const sfnc = `database.tableExists([${tableName}])`
    let tables = await this.getAllTables()

    if (tables !== null && typeof tables !== constants.UNDEF) {
      if (tables.constructor === Array) {
        console.log(tables)

        let t = tables.find(t => {
          return t.name === tableName
        })

        if (typeof t === constants.UNDEF) {
          return false
        } else {
          console.log(t)
          return true
        }
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async getNumNotes() {
    const sfnc = `database.getNumNotes()`

    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(
          `select count (*) as count from ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}`
        )
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }
  async addNewNote(s) {
    const sfnc = `database.addNewNote()`

    let notesTableExists = await this.tableExists(
      constants.MDJSE.DATABASE.TABLE_NAMES.NOTES
    )

    if (notesTableExists === true) {
      console.log(
        `${sfnc} target table [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}] exists, proceeding`
      )

      const id = utils.uuidv4()
      const created = utils.dateTimeNowISO()

      if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
        if (this._data.db.open === true) {
          await this.runSql(
            `insert into ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES} (key, created, note)
          values (?, ?, ?)`,
            [`${id}`, `${created}`, `${s}`]
          )
          console.log(
            `${sfnc} new note added to database table [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}] :: ${id} :: ${created} :: [${s}]`
          )
        } else {
          console.log(
            `${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`
          )
        }
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      throw new Error(
        `${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_ATTEMPT_MADE_ON_NONEXIST_TABLE}`
      )
    }
  }

  async getNoteByKey(k) {
    const sfnc = `database.getNoteByKey(${k})`
    console.log(k.length)

    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(
          `select * from ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES} where key = '${k}'`
        )
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async getAllNotes() {
    const sfnc = `database.getAllNotes()`

    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(
          `select * from ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES} order by created asc`
        )
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  // return await this.select(
  //   `SELECT key FROM ${constants.APP.DB.TABLES.OPRESULTS} ORDER BY datestart DESC`
  // )

  async getAllKeys() {
    const sfnc = `database.getAllNoteKeys()`

    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(
          `select * from ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES} order by created asc`
        )
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async getAllNoteKeys() {
    const sfnc = `database.getAllNoteKeys()`

    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(
          `select key from ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES} order by created asc`
        )
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async deleteAllNotes() {
    const sfnc = `database.deleteAllNotes()`

    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        await this.runSql(`DELETE FROM ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}`)
        console.log(`${sfnc} all notes deleted`)
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }
}

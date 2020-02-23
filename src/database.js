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
    const sfnc = `static.database.dbExists() ${constants.MDJSE.DATABASE.DATABASE_FILE}`

    console.log(sfnc)
    let exists = fs.existsSync(constants.MDJSE.DATABASE.DATABASE_FILE)
    console.log(`${sfnc} exists = ${exists}`)
    return exists
  }

  static async createDb() {
    const sfnc = `static.database.createDb() ${constants.MDJSE.DATABASE.DATABASE_FILE}`

    if (!database.dbExists()) {
      return new Promise(resolve => {
        let d = new sqlite3.Database(constants.MDJSE.DATABASE.DATABASE_FILE, e => {
          if (e) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
        d.close()
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
    const sfnc = `static.database.deleteDb()`

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
    const sfnc = `${this.constructor.name}.init()`

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
    const sfnc = `${this.constructor.name}.connect()`

    if (database.dbExists()) {
      return new Promise(resolve => {
        this._data.db = new sqlite3.Database(
          constants.MDJSE.DATABASE.DATABASE_FILE,
          e => {
            if (e) {
              resolve(false)
            } else {
              resolve(true)
            }
          }
        )
      }).then(r => {
        if (r) {
          console.log(
            `${sfnc} success = ${r}, connected @ ${constants.MDJSE.DATABASE.DATABASE_FILE}`
          )
        } else {
          throw new Error(
            `${sfnc} success = ${r}, could not connect @ ${constants.MDJSE.DATABASE.DATABASE_FILE}`
          )
        }
      })
    } else {
      console.log(`${sfnc} could not connect to database becuase it does not exist`)
    }
  }
  disconnect() {
    const sfnc = `${this.constructor.name}.disconnect()`
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
    const sfnc = `${this.constructor.name}.runSql(${sql})`
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
    const sfnc = `${this.constructor.name}.runSelect()`
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
    const sfnc = `${this.constructor.name}.getAllTables()`
    console.log(`${sfnc}`)

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        return await this.runSelect(`select name from sqlite_master where type = 'table'`)
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async tableExists(tableName) {
    const sfnc = `${this.constructor.name}.tableExists([${tableName}])`
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
    const sfnc = `${this.constructor.name}.getNumNotes()`

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
    const sfnc = `${this.constructor.name}.addNewNote(${s})`

    if (this._data.db !== null && typeof this._data.db !== constants.UNDEF) {
      if (this._data.db.open === true) {
        let notesTableExists = await this.tableExists(
          constants.MDJSE.DATABASE.TABLE_NAMES.NOTES
        )

        if (notesTableExists === true) {
          const id = utils.uuidv4()
          const created = utils.dateTimeNowISO()

          console.log(
            `${sfnc} target table [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}] exists, proceeding`
          )

          await this.runSql(
            `insert into ${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES} (key, created, note)
          values (?, ?, ?)`,
            [`${id}`, `${created}`, `${s}`]
          )
          console.log(
            `${sfnc} new note added to database table [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}] :: ${id} :: ${created} :: [${s}]`
          )
        } else {
          throw new Error(
            `${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_ATTEMPT_MADE_ON_NONEXIST_TABLE}`
          )
        }
      } else {
        console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
      }
    } else {
      console.log(`${sfnc} ${constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_NOT_CONNECTED}`)
    }
  }

  async getNoteByKey(k) {
    const sfnc = `${this.constructor.name}.getNoteByKey(${k})`
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
    const sfnc = `${this.constructor.name}.getAllNotes()`

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
    const sfnc = `${this.constructor.name}.getAllNoteKeys()`

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
    const sfnc = `${this.constructor.name}.deleteAllNotes()`

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

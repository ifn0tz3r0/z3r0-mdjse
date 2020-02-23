const inq = require('inquirer')
const treeify = require('treeify')

import { utils, constants, inqer, op, database, services, chalker } from './internal'

export default class operations {
  static getOps() {
    return [
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.mdjse.constants.treeified`, async () => {
        let showValues = true
        console.log(treeify.asTree(constants, showValues))
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.hello.world`, async () => {
        console.log(`hello world`)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.sleep`, async () => {
        let sleepMs = 1000
        console.log(`sleeping for ${sleepMs}ms`)
        await utils.sleep(sleepMs)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.throw.error`, async () => {
        throw new Error(`error: this is a thrown error`)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.new.guid`, async () => {
        console.log(utils.uuidv4())
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.press.any.key.to.continue`, async () => {
        await utils.clearConsole()
        utils.printNewline()
        await utils.anyKey()
        utils.printNewline()
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.iso.date.string`, async () => {
        console.log(utils.dateTimeNowISO())
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.random.int.0.to.100`, async () => {
        console.log(utils.randomInt(0, 100))
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.with.chalker`, async () => {
        chalker.printWithBrush(
          chalker.brushes.blackBgCyan,
          `this message was printed with chalker`
        )
        chalker.printBlackBgYellow(`this message was printed with chalker`)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(
        `z3r0-mdjse.input.password.with.minimum.required.length.input.hidden`,
        async () => {
          let minPasswordLen = 5
          let maskChar = null
          let password = await inqer.inputPass(
            `enter your new password (must be at least ${minPasswordLen} characters)`,
            minPasswordLen,
            maskChar
          )
          console.log(`you entered [${password}]`)
        }
      ),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(
        `z3r0-mdjse.input.password.with.minimum.required.length.input.masked`,
        async () => {
          let minPasswordLen = 5
          let maskChar = `$`
          let password = await inqer.inputPass(
            `enter your new password (must be at least ${minPasswordLen} characters):`,
            minPasswordLen,
            maskChar
          )
          console.log(`you entered [${password}]`)
        }
      ),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(
        `z3r0-mdjse.print.random.int.with.input.and.validation.and.default.values`,
        async () => {
          let radix = 10
          let defaultMin = utils.randomInt(0, 10000)
          let defaultMax = utils.randomInt(0, 10000)
          let min = parseInt(
            await inqer.inputInt(`input minimum int value (must be >= 0):`, defaultMin),
            radix
          )
          let max = parseInt(
            await inqer.inputInt(`input maximum int value (must be >= 0):`, defaultMax),
            radix
          )

          let r = utils.randomInt(min, max)

          let result = {
            min: min,
            max: max,
            result: r
          }

          let showValues = true
          console.log(treeify.asTree(result, showValues))
        }
      ),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.raw.json.object`, async () => {
        let jsonObject = {
          firstName: `firstName`,
          lastName: `lastName`,
          phoneNumbers: [`555-555-5555`, `555-555-5555`, `555-555-5555`]
        }
        console.log(jsonObject)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.stringified.json.object`, async () => {
        let jsonObject = {
          firstName: `firstName`,
          lastName: `lastName`,
          phoneNumbers: [`555-555-5555`, `555-555-5555`, `555-555-5555`]
        }
        let spaces = 2
        console.log(JSON.stringify(jsonObject, null, spaces))
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.treeified.json.object`, async () => {
        let jsonObject = {
          firstName: `firstName`,
          lastName: `lastName`,
          phoneNumbers: [`555-555-5555`, `555-555-5555`, `555-555-5555`]
        }
        let showValues = true
        console.log(treeify.asTree(jsonObject, showValues))
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.variant.treeified.json.object`, async () => {
        let firstName = await inqer.inputStr(`what is your first name?`)
        let jsonObject = {
          whatIsYourFirstName: {
            [firstName]: `< ${firstName} put into json key and treeified`
          }
        }
        let showValues = true
        console.log(treeify.asTree(jsonObject, showValues))
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.string.input`, async () => {
        let name = await inqer.inputStr(`what is your first name?`)
        console.log(`your first name is [${name}]`)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(
        `z3r0-mdjse.string.input.with.validation.and.minimum.required.length`,
        async () => {
          let minLen = 2
          let name = await inqer.inputStr(
            `what is your first name? (must be 2 characters or longer):`,
            ``,
            minLen
          )
          console.log(`your first name is [${name}]`)
        }
      ),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(
        `z3r0-mdjse.string.input.with.validation.and.minimum.required.length.only.allow.charcters.a-zA-Z`,
        async () => {
          let minLen = 2
          let charsOnly = true
          let name = await inqer.inputStr(
            `what is your first name? (1) must be 2 characters or longer (2) must be letters of the alphabet (a-z or A-Z) (3) whitespace not allowed:`,
            ``,
            minLen,
            charsOnly
          )
          console.log(`your first name is [${name}]`)
        }
      ),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.http.get.bitcoin.prices`, async () => {
        let j = await services.getBtcPrices()

        if (j !== null && typeof j !== constants.UNDEF) {
          console.log(j)
        } else {
          throw new Error(`error: request returned null or undefined`)
        }
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.http.get.bitcoin.price.USD`, async () => {
        let j = await services.getBtcPrices()

        if (j !== null && typeof j !== constants.UNDEF) {
          if (j.USD !== null && typeof j.USD !== constants.UNDEF) {
            if (j.USD.buy !== null && typeof j.USD.buy !== constants.UNDEF) {
              console.log(`$${j.USD.buy}`)
            } else {
              throw new Error(`error: could not parse USD.buy field from json`)
            }
          } else {
            throw new Error(`error: could not parse USD field from json`)
          }
        } else {
          throw new Error(`error: request returned null or undefined`)
        }
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.http.get.bitcoin.prices.treeified`, async () => {
        let j = await services.getBtcPrices()

        if (j !== null && typeof j !== constants.UNDEF) {
          let showTreeValues = true
          console.log(treeify.asTree(j, showTreeValues))
        } else {
          throw new Error(`error: request returned null or undefined`)
        }
      }),
      new op(`z3r0-mdjse.sqlite3.database.admin.create.with.notes.table`, async () => {
        await database.createDb()
      }),
      new op(`z3r0-mdjse.sqlite3.database.admin.delete.all.notes`, async () => {
        if (database.dbExists()) {
          let db = new database()
          await db.connect()
          await db.deleteAllNotes()
          db.disconnect()
        } else {
          console.log(
            constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST
          )
        }
      }),
      new op(`z3r0-mdjse.sqlite3.database.admin.delete.database`, async () => {
        database.deleteDb()
      }),
      new op(
        `z3r0-mdjse.sqlite3.database.user.notes.list.all.notes.in.menu.get.note.by.key`,
        async () => {
          if (database.dbExists()) {
            let db = new database()
            await db.connect()

            let notes = await db.getAllNotes()

            if (notes !== null && typeof notes !== constants.UNDEF) {
              if (notes.constructor === Array) {
                console.log(notes)

                if (notes.length > 0) {
                  let inqerChoices = []

                  notes.map(n => {
                    inqerChoices.push({
                      name: `${n.created} :: ${n.key} :: [${n.note}]`,
                      value: {
                        key: n.key,
                        created: n.created,
                        note: n.note
                      }
                    })
                  })

                  let noteChoice = await inq
                    .prompt([
                      {
                        type: 'list',
                        message: 'select a note:',
                        choices: inqerChoices,
                        name: `noteChoice`,
                        pageSize: constants.MDJSE.MAX_MENU_LEN
                      }
                    ])
                    .then(answer => {
                      return answer.noteChoice
                    })

                  console.log(noteChoice)
                  console.log(noteChoice.key)

                  let rows = await db.getNoteByKey(noteChoice.key)
                  db.disconnect()

                  if (rows !== null && typeof rows !== constants.UNDEF) {
                    if (rows.constructor === Array) {
                      console.log(`${rows.length} row(s) returned`)

                      if (rows.length === 1) {
                        console.log(rows)
                        utils.printNewline()
                        console.log(`selected note: [${rows[0].note}]`)
                        utils.printNewline()
                      } else {
                        console.log(
                          constants.MDJSE.ERROR_MSGS
                            .ERROR_DATABASE_QUERY_EXPECTED_NO_MORE_THAN_ONE
                        )
                      }
                    } else {
                      console.log(
                        constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_EXPECTED_ARRAY
                      )
                    }
                  } else {
                    console.log(
                      constants.MDJSE.ERROR_MSGS
                        .ERROR_DATABASE_QUERY_RETURNED_NULL_OR_UNDEF
                    )
                  }
                } else {
                  utils.printNewline()
                  console.log(`no notes to select`)
                  utils.printNewline()
                }
              } else {
                console.log(constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_EXPECTED_ARRAY)
              }
            }
          } else {
            console.log(
              constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST
            )
          }
        }
      ),
      new op(`z3r0-mdjse.sqlite3.database.user.does.table.exist`, async () => {
        if (database.dbExists()) {
          let t = await inqer.inputStr(`input table name:`)

          let db = new database()
          await db.connect()
          let bTableExists = await db.tableExists(t)
          db.disconnect()
          utils.printNewline()
          console.log(`bTableExists = ${bTableExists}`)
          utils.printNewline()
        } else {
          console.log(
            constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST
          )
        }
      }),
      new op(`z3r0-mdjse.sqlite3.database.user.notes.new.note`, async () => {
        if (database.dbExists()) {
          let note = await inqer.inputStr(`new note:`)
          let db = new database()
          await db.connect()
          await db.addNewNote(note)
          db.disconnect()
        } else {
          console.log(
            constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST
          )
        }
      }),
      new op(`z3r0-mdjse.sqlite3.database.user.notes.get.notes.count`, async () => {
        if (database.dbExists()) {
          let db = new database()
          await db.connect()
          let countRows = await db.getNumNotes()

          if (countRows !== null && typeof countRows !== constants.UNDEF) {
            if (countRows.constructor === Array) {
              console.log(`${countRows.length} row(s) returned`)
              console.log(countRows)

              if (countRows.length === 1) {
                if (
                  countRows[0].count !== null &&
                  typeof countRows[0].count !== constants.UNDEF
                ) {
                  console.log(
                    `there are ${countRows[0].count} rows in the [${constants.MDJSE.DATABASE.TABLE_NAMES.NOTES}] table`
                  )
                }
              } else {
                console.log(`error: expected one row`)
              }
            } else {
              console.log(constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_EXPECTED_ARRAY)
            }
          }
        } else {
          console.log(
            constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST
          )
        }
      }),
      new op(`z3r0-mdjse.sqlite3.database.user.list.all.tables`, async () => {
        if (database.dbExists()) {
          let db = new database()
          await db.connect()
          let rows = await db.getAllTables()

          if (rows !== null && typeof rows !== constants.UNDEF) {
            if (rows.constructor === Array) {
              console.log(`${rows.length} row(s) returned`)
              console.log(rows)

              console.log(`${rows.length} table(s) found`)
              console.log(`table(s):`)
              rows.map(o => {
                console.log(`[${o.name}]`)
              })
            } else {
              console.log(constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_EXPECTED_ARRAY)
            }
          } else {
            console.log(
              constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_QUERY_RETURNED_NULL_OR_UNDEF
            )
          }
          db.disconnect()
        } else {
          console.log(
            constants.MDJSE.ERROR_MSGS.ERROR_DATABASE_COULD_NOT_CONNECT_DB_DOESNT_EXIST
          )
        }
      }) //*<------ add a comma when adding a new op...*/
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      /*
      new op(`z3r0-mdjse.new.unnamed.op`, async () => {

        //your code here...
        //your code here...
        //your code here...
        //your code here...

      })
      */
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
    ]
  }
}

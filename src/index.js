const inq = require('inquirer')

import { constants, utils, operations, database, chalker } from './internal'

const main = () => {
  let loop = true
  let opChoiceCache = null
  const exit = `[exit]`

  const ops = operations.getOps()

  let menu = []
  ops.map(o => {
    menu.push(o.id)
  })

  menu = menu.sort((a, b) => (a > b ? 1 : -1))
  menu.push(exit)
  ;(async () => {
    do {
      await utils.clearConsole()
      utils.printDivider()
      chalker.printAppTitle(constants.MDJSE.APP_TITLE)
      utils.printDivider()
      const bDbFound = database.dbExists()
      console.log(
        `{db detected @ ${constants.MDJSE.DATABASE.DATABASE_FILE} = ${bDbFound}}`
      )
      utils.printDivider()
      let opChoice = await inq
        .prompt([
          {
            type: 'list',
            message: 'select an operation:',
            choices: menu,
            name: `opChoice`,
            default: opChoiceCache,
            pageSize: constants.MDJSE.MAX_MENU_LEN
          }
        ])
        .then(answer => {
          return answer.opChoice
        })

      if (opChoice === exit) {
        loop = false
        break
      }

      opChoiceCache = opChoice

      let op = ops.find(o => {
        return o.id === opChoice
      })

      utils.printDivider()
      utils.printNewline()
      try {
        await op.method()
      } catch (e) {
        utils.printDivider()
        console.log(`an error occurred during the operation`)
        utils.printDivider()
        console.log(e)
        utils.printDivider()
      }

      utils.printNewline()
      utils.printDivider()

      const afterOpOptions = [`[main menu]`, exit]

      let exitChoice = await inq
        .prompt([
          {
            type: 'list',
            message: 'op complete, select an option:',
            choices: afterOpOptions,
            name: `exitChoice`,
            default: afterOpOptions[0]
          }
        ])
        .then(answer => {
          return answer.exitChoice
        })

      if (exitChoice === exit) {
        loop = false
      }
    } while (loop)
  })()
}

main()

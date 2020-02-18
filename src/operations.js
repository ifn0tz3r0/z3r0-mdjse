const treeify = require('treeify')

import { utils, constants, inqer, op, services, chalker } from './internal'

export default class operations {
  static getOps() {
    return [
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.print.app.constants.treeified`, async () => {
        let showValues = true
        console.log(treeify.asTree(constants, showValues))
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.hello.world`, async () => {
        console.log(`hello world`)
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.sleep`, async () => {
        let sleepMs = 5000
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
        await utils.printNewline()
        await utils.anyKey()
        await utils.printNewline()
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
      new op(`z3r0-mdjse.print.random.int.with.input`, async () => {
        let min = parseInt(await inqer.inputStr(`input minimum int value`))
        let max = parseInt(await inqer.inputStr(`input maximum int value`))

        let r = utils.randomInt(min, max)

        let result = {
          min: min,
          max: max,
          result: r
        }

        let showValues = true
        console.log(treeify.asTree(result, showValues))
      }),
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
      new op(`z3r0-mdjse.http.get.bitcoin.prices`, async () => {
        let j = await services.getBtcPrices()

        if (j !== null && typeof j !== constants.UNDEF) {
          console.log(j)
        } else {
          throw new Error(`error: request returned null or undefined`)
        }
      }),
      //  ///////////// ///////////// ///////////// ///////////// ///////////// /////////////
      new op(`z3r0-mdjse.http.get.bitcoin.prices.full.response`, async () => {
        let j = await services.getBtcPricesFullResponse()

        if (j !== null && typeof j !== constants.UNDEF) {
          let fullResponse = j

          let responseBody = fullResponse.body
          let statusCode = fullResponse.statusCode
          utils.printDivider()
          console.log(`request returned statusCode: ${statusCode}`)
          utils.printDivider()
          console.log(`request returned body:`)
          utils.printDivider()
          console.log(responseBody)
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
      }) /*<------ add a comma when adding a new op...*/
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

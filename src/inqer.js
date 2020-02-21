const inq = require(`inquirer`)

export default class inqer {
  static async inputStr(msg) {
    var q = [
      {
        type: 'input',
        name: 'input',
        message: msg
      }
    ]

    return await inq.prompt(q).then(answer => {
      return answer.input
    })
  }

  static async inputInt(msg) {
    var q = [
      {
        type: 'input',
        name: 'input',
        message: msg,
        validate: input => {
          return Number.isInteger(parseInt(input, 10))
        }
      }
    ]

    return await inq.prompt(q).then(answer => {
      return answer.input
    })
  }

  static async inputPass(msg) {
    var q = [
      {
        type: 'password',
        mask: 'X',
        name: 'input',
        message: msg
      }
    ]

    return await inq.prompt(q).then(answer => {
      return answer.input
    })
  }
}

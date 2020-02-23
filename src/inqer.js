const inq = require(`inquirer`)

import { constants, utils } from './internal'

export default class inqer {
  static async inputStr(msg, minLen = 0, charsOnly = false) {
    var q = [
      {
        type: 'input',
        name: 'i',
        message: msg,
        validate: async i => {
          if (i !== null && typeof i !== constants.UNDEF) {
            if (typeof i === constants.STR) {
              if (i.length >= minLen) {
                if (charsOnly) {
                  if (utils.regexStringContainsAllCharacters(i)) {
                    return true
                  } else {
                    return false
                  }
                } else {
                  return true
                }
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }
      }
    ]

    return await inq.prompt(q).then(answer => {
      return answer.i
    })
  }

  static async inputInt(msg, def = null) {
    var q = [
      {
        type: 'input',
        name: 'i',
        default: def,
        message: msg,
        validate: async i => {
          if (i !== null && typeof i !== constants.UNDEF) {
            if (typeof i === constants.STR) {
              if (utils.regexStringContainsAllIntegers(i)) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }
      }
    ]

    return await inq.prompt(q).then(answer => {
      return answer.i
    })
  }

  static async inputPass(msg, minLen = 1, maskChar = null) {
    var q = [
      {
        type: 'password',
        mask: constants.INQER_PASSWORD_MASK_CHAR,
        name: 'i',
        message: msg,
        mask: maskChar,
        validate: async i => {
          if (i !== null && typeof i !== constants.UNDEF) {
            if (typeof i === constants.STR) {
              if (i.length >= minLen) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }
      }
    ]

    return await inq.prompt(q).then(answer => {
      return answer.i
    })
  }
}

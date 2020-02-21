import { constants } from './internal'

export default class utils {
  static uuidv4() {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == `x` ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
  static strHasWhiteSpace(str) {
    return str.indexOf(' ') >= 0
  }
  static reverseStr(str) {
    return str === '' ? '' : this.reverseStr(str.substr(1)) + str.charAt(0)
  }
  static byteLenOfStr(str) {
    return encodeURI(str).split(/%..|./).length - 1
  }
  static maskStr(str, char = `*`) {
    return Array(str.length + 1).join(char)
  }
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  static printDivider() {
    console.log(constants.MDJSE.DIVIDER_STR)
  }
  static printNewline() {
    console.log(`\r\n`)
  }
  static regexStringContainsAllCharacters(s) {
    return /^[a-zA-Z]+$/.test(s)
  }
  static regexStringContainsAllIntegers(s) {
    return /^\d+$/.test(s)
  }
  static regexStringHasWhitespace(s) {
    return /\s/.test(s)
  }
  static dateTimeNow() {
    return new Date(Date.now()).getTime()
  }
  static dateTimeNowISO() {
    return new Date(Date.now()).toISOString()
  }
  // eslint-disable-next-line no-unused-vars
  static sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  static async clearConsole() {
    process.stdout.write(`\x1Bc`)
    await utils.sleep(50)
  }
  // eslint-disable-next-line no-unused-vars
  static anyKey(msg = `press any key to continue`) {
    console.log(msg)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    return new Promise(resolve =>
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false)
        resolve()
      })
    )
  }
}

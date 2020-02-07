const chalk = require('chalk')

export default class chalker {
  static brushes = {
    blackBgYellow: chalk.black.bgYellow,
    yellowBgRed: chalk.yellow.bgRed,
    yellowBgGray: chalk.gray.bgYellow.inverse,
    blackBgRed: chalk.black.bgRed,
    blackBgGreen: chalk.black.bgGreen,
    blackBgGray: chalk.gray.bgBlack.inverse,
    blackBgMagenta: chalk.black.bgMagenta,
    blackBgCyan: chalk.black.bgCyan,
    cyanBgBlack: chalk.black.bgCyan.inverse,
    cyanBgGray: chalk.gray.bgCyan.inverse,
    magentaBgGray: chalk.gray.bgMagenta.inverse,
    blackBgWhite: chalk.black.bgWhite,
    white: chalk.white,
    default: chalk.hex('#AAAAAA'),
    redBgGray: chalk.gray.bgRed.inverse,
    failure: chalk.hex('#FF0000').bgHex('#333333'),
    success: chalk.hex('#00FF00').bgHex('#333333'),
    warn: chalk.hex('#FFFF00').bgHex('#333333'),
    italicGray: chalk.italic.dim.gray
  }
  static printAppTitle(m) {
    console.log(chalker.brushes.cyanBgBlack(m))
  }
  static printBlackBgYellow(m) {
    console.log(chalker.brushes.blackBgYellow(m))
  }
  static printWithBrush(b, m) {
    console.log(b(m))
  }
}

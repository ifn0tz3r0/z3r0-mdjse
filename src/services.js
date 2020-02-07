const treeify = require('treeify')
const rp = require('request-promise-native')

export default class services {
  static async getBtcPrices() {
    var options = {
      method: `GET`,
      uri: `https://blockchain.info/ticker`,
      json: true
    }
    console.log(treeify.asTree(options, true))
    return await rp(options)
      .then(j => {
        return j
      })
      .catch(e => {
        console.log(e)
        return null
      })
  }
  static async getBtcPricesFullResponse() {
    var options = {
      method: `GET`,
      uri: `https://blockchain.info/ticker`,
      json: true,
      resolveWithFullResponse: true
    }
    console.log(treeify.asTree(options, true))
    return await rp(options)
      .then(j => {
        return j
      })
      .catch(e => {
        console.log(e)
        return null
      })
  }
}

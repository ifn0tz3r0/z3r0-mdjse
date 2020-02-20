const fetch = require('node-fetch')

export default class services {
  static async getBtcPrices() {
    return await fetch(`https://blockchain.info/ticker`, {
      method: `GET`,
      headers: {
        Accept: `application/json`
      }
    })
      .then(r => {
        console.log(`\r\n`)
        console.log(r.ok)
        console.log(r.status)
        console.log(r.statusText)
        console.log(r.headers.raw())
        console.log(r.headers.get(`content-type`))
        console.log(`\r\n`)
        return r.json()
      })
      .then(j => {
        return j
      })
      .catch(e => {
        console.error(e)
        return null
      })
  }
}

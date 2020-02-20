# z3r0-mdjse

menu driven javascript executor

my node -v
v8.12.0

utilizes: [nodejs, async/await, request-promise, inquirer, treeify, chalker, babel, JSON.stringify]

to install node modules run
`npm i`

then run
`npm start`

to remove node_modules
`npm run clean`

to remove node_nodules, install, and start
`npm run start-clean`

to disable linter errors, place the following at the top of the file
```
/* eslint-disable */
```


```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
z3r0-mdjse
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
? select an option: (Use arrow keys)
❯ z3r0-mdjse.hello.world 
  z3r0-mdjse.http.get.bitcoin.price.USD 
  z3r0-mdjse.http.get.bitcoin.prices 
  z3r0-mdjse.http.get.bitcoin.prices.full.response 
  z3r0-mdjse.http.get.bitcoin.prices.treeified 
  z3r0-mdjse.press.any.key.to.continue 
  z3r0-mdjse.print.app.constants.treeified 
  z3r0-mdjse.print.iso.date.string 
  z3r0-mdjse.print.new.guid 
  z3r0-mdjse.print.random.int.0.to.100 
  z3r0-mdjse.print.random.int.with.input 
  z3r0-mdjse.print.raw.json.object 
  z3r0-mdjse.print.stringified.json.object 
  z3r0-mdjse.print.treeified.json.object 
  z3r0-mdjse.print.variant.treeified.json.object 
  z3r0-mdjse.print.with.chalker 
  z3r0-mdjse.sleep 
  z3r0-mdjse.string.input 
  z3r0-mdjse.throw.error
```


new operations added in `./src/operations.js` will be loaded by the main menu

example of an 'op' in operations.js:
```
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
```

`src/services.js`
```
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
  ```
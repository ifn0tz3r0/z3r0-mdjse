# z3r0-mdjse

menu driven javascript executor

utilizes: [inquirer, treeify, chalker, babel]

to install node modules run
`npm i`

then run
`npm start`

to remove node_modules
`npm run clean`

to remove node_nodules, install, and start
`npm run start-clean`

to disable linter errors, place the following at the top of the file
/* eslint-disable */

new operations added in `./src/operations.js` will be loaded by the main menu



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
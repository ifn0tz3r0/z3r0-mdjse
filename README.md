# z3r0-mdjse

![](gitimg/z3r0-mdjse.gif)

menu driven javascript executor

my node -v
v8.12.0

utilizes: [nodejs, async/await, fetch, inquirer, treeify, chalker, babel, JSON.stringify]

1. clone and install node modules

    `npm i` on mac or windows

1. then run
    `npm start` on mac
    `npm run start-win` on windows



to remove node_modules
`npm run clean` on mac
`npm run clean-win` on windows

to remove node_nodules, re-install node_modules, and re-start
`npm run start-clean` on mac
`npm run start-clean-win` on windows

to disable linter errors, place the following at the top of the file
```
/* eslint-disable */
```

to run without lint `npm run q` (quick) on mac

to run without lint `npm run q-win` (quick) on windows

to disable lint altogether, remove the `npm run lint` sub-command within package.json



```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
z3r0-mdjse
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
database.dbExists() z3r0-mdjse-database.sqlite3
database.dbExists() z3r0-mdjse-database.sqlite3 exists = true
{db detected @ z3r0-mdjse-database.sqlite3 = true}
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
? select an operation: (Use arrow keys)
❯ z3r0-mdjse.hello.world 
  z3r0-mdjse.http.get.bitcoin.price.USD 
  z3r0-mdjse.http.get.bitcoin.prices 
  z3r0-mdjse.http.get.bitcoin.prices.treeified 
  z3r0-mdjse.input.password.with.minimum.required.length.input.hidden 
  z3r0-mdjse.input.password.with.minimum.required.length.input.masked 
  z3r0-mdjse.press.any.key.to.continue 
  z3r0-mdjse.print.iso.date.string 
  z3r0-mdjse.print.mdjse.constants.treeified 
  z3r0-mdjse.print.new.guid 
  z3r0-mdjse.print.random.int.0.to.100 
  z3r0-mdjse.print.random.int.with.input.and.validation.and.default.values 
  z3r0-mdjse.print.raw.json.object 
  z3r0-mdjse.print.stringified.json.object 
  z3r0-mdjse.print.treeified.json.object 
  z3r0-mdjse.print.variant.treeified.json.object 
  z3r0-mdjse.print.with.chalker 
  z3r0-mdjse.sleep 
  z3r0-mdjse.sqlite3.database.admin.create.database.with.notes.table 
  z3r0-mdjse.sqlite3.database.admin.delete.all.notes 
  z3r0-mdjse.sqlite3.database.admin.delete.database 
  z3r0-mdjse.sqlite3.database.user.does.table.exist 
  z3r0-mdjse.sqlite3.database.user.list.all.tables 
  z3r0-mdjse.sqlite3.database.user.notes.get.notes.count 
  z3r0-mdjse.sqlite3.database.user.notes.list.all.notes.in.menu.get.note.by.key 
  z3r0-mdjse.sqlite3.database.user.notes.new.note 
  z3r0-mdjse.string.input 
  z3r0-mdjse.string.input.with.validation.and.minimum.required.length 
  z3r0-mdjse.string.input.with.validation.and.minimum.required.length.only.allow.charcters.a-zA-Z 
  z3r0-mdjse.throw.error 
  [exit] 
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
  ```

sqlite3

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
z3r0-mdjse
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
database.dbExists() z3r0-mdjse-database.sqlite3
database.dbExists() z3r0-mdjse-database.sqlite3 exists = true
{db detected @ z3r0-mdjse-database.sqlite3 = true}
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
? select an operation: z3r0-mdjse.sqlite3.database.user.notes.list.all.notes
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


database.dbExists() z3r0-mdjse-database.sqlite3
database.dbExists() z3r0-mdjse-database.sqlite3 exists = true
database.dbExists() z3r0-mdjse-database.sqlite3
database.dbExists() z3r0-mdjse-database.sqlite3 exists = true
database.runSelect() sql = select count (*) as count from notes
database.connect() success = true, connected @ z3r0-mdjse-database.sqlite3
1 row(s) returned
[ { count: 3 } ]
there are 3 rows in the notes table
database.getAllNotes()
database.runSelect() sql = select * from notes order by created desc
3 row(s) returned
[ { key: '4c8702e3-38c9-497d-9819-785878881b1b',
    created: '2020-02-23T07:50:21.515Z',
    note: 'third note.' },
  { key: 'b3f28302-891d-4b5b-ba61-fd59ea75f51d',
    created: '2020-02-23T07:50:17.108Z',
    note: '2nd note.' },
  { key: '248a4b7f-4fc4-46ce-9b12-30f585df3467',
    created: '2020-02-23T07:50:12.231Z',
    note: 'first note.' } ]
4c8702e3-38c9-497d-9819-785878881b1b::2020-02-23T07:50:21.515Z::third note.
b3f28302-891d-4b5b-ba61-fd59ea75f51d::2020-02-23T07:50:17.108Z::2nd note.
248a4b7f-4fc4-46ce-9b12-30f585df3467::2020-02-23T07:50:12.231Z::first note.


░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
? op complete, select an option: (Use arrow keys)
❯ [main menu] 
  [exit]
```
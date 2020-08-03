const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE,(err)=>{
	if(err)
		console.error(err.message)
	else
		console.log('SQLITE CONNECTED')
		db.run(`CREATE TABLE rooms 
			(id INTEGER PRIMARY KEY AUTOINCREMENT,
			username text,
			room text
			)`
		, (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO rooms (username, room) VALUES (?,?)'
                db.run(insert, ["n4z34m","global1"])
                db.run(insert, ["n4z34m","global2"])
            }})
})
module.exports = db
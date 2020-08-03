const express = require('express')
const db = require("./database.js")
const bodyparser = require('body-parser') 

var app = express()
app.use(bodyparser.json())

app.get('/',(req,res)=>{
	res.send({'message':'ok'})
})
// get request users
app.get('/rooms',(req,res)=>{
	var sql = "select * from rooms"
 var params = []
 db.all(sql, params, (err, rows,field) => {
 	if(!err)
 		res.send(rows)
 	else
 		res.status(400).json({"error":err.message});
});
})
// get room by id
app.get('/rooms/:id',(req,res)=>{
	var sql = "select * from rooms WHERE id = ?"
 var params = [req.params.id]
 db.all(sql, params, (err, rows,field) => {
 	if(!err){
 	 		res.send(rows)
 	 		console.log(rows.length)
 	 	}
 	else{
 	 		res.status(400).json({"error":err.message});}
});
})

// get room by room
app.get('/room/:room',(req,res)=>{
	var sql = "select * from rooms WHERE room = ?"
 var params = [req.params.room]
 db.all(sql, params, (err, rows,field) => {
 	if(!err){
 	 		res.send({'code':rows.length})
 	 	}
 	else{
 	 		res.status(400).json({"error":err.message});}
});
})
// insert
app.post('/rooms',(req,res)=>{
// call rooms table
var usr = req.body;
var snd = {"is":"added"}
db.run('INSERT INTO rooms (username, room) VALUES (?,?)',[usr.name,usr.room],(err,field)=>{
	if(!err)
		res.send(snd)
	else
		res.status(400).json({"error": err.message})
		console.log(err)
})
});
// 404
app.use(function(req,res){
	res.status(404)
})
// listen
app.listen(3000,()=>{
	console.log('Server running..')
})
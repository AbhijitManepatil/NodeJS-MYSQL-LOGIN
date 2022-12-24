const mysql=require("mysql")
const express = require("express");

//body-parser to get the information from form
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

//express object as a app
const app = express();

//add css style to express app
// serve your css as static
app.use(express.static(__dirname));

//database connection object
const connection= mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"root",
    database:"myapp"
})


//connect to database check
connection.connect(function(error){
    if (error) throw error
    else console.log("connection to database successful!")
})


//render login page with get method
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})


//validate the form data with database
// add "encoder" object
app.post("/",encoder, function(req,res){
    //get form values
    var username = req.body.username;
    var password = req.body.password;
    
    connection.query("select * from login where username = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/welcome");
        } else {
            res.redirect("/");

        } 
        res.end();
        
        })
    })

//when login is success 
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html");
})

//set app port
app.listen(4500);
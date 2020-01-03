//Set up MySQL connection
const mysql=require("mysql");

const connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"burgers_db"
});
//heroku deployment


//Make connection
connection.connect(function(err){
    if(err){
        console.log("error connecting: "+err.stack);
        return;
    } 
    console.log("connected as id "+connection.threadId);
});

//Export connection for our orm to use
module.exports=connection;
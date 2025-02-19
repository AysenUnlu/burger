const express=require("express");
const PORT=process.env.PORT||3000;
const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars")
app.engine("handlebars",exphbs({defaultlayout:"main"}));
app.set("view engine","handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT,function(){
      console.log("Listening on Port "+PORT);
});
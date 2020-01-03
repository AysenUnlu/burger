## MVC ##
## Acrivity 1: Express Calculator ##

*  In this activity, we created an Express calculator application with one get route that is able to take in three parameters: an operation and two numbers.

* There are four operation values which a user may use: addition, subtraction, multiplication, and division.

* When the route is hit, our browser displays the result of the math operation.

* For example, when the user goes to the url <http://localhost:3000/add/10/1>, the page should display 11.

* As a bonus, I let the user enter the whole operation as a parameter and parsed the parameter to do the correct operation.

 ```javascript
 // Dependencies
var express = require("express");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Create express app instance.
var app = express();

// Routes
// What routes do you need to have? Which ones are optional?
// Add your routes here
app.get("/:operation/:num1/:num2", function(req, res) {

  // parse out the variables from the request
  // Parameters are received from the URL
  // Make sure they're converted to integers (and not strings)
  // Parameters are converted to integers

  const operation=req.params.operation;
  //console.log(operation);
  const number1=parseInt(req.params.num1);
  const number2=parseInt(req.params.num2);
   
  // Initialize the result variable to send later
  var result=0;
  // Switch statement chooses operation based on the operation parameter.
  switch (operation) {
  
  case "add":
    // Add your logic here. Pun intended.
     result=number1+number2;
    
    break;
  case "subtract":
    // Subtract logic
    result=number1-number2;
    break;
  case "multiply":
    // Multiply
    result=number1*number2;
    break;
  case "divide":
    // Divide
    result=number1/number2;
    break;
  default:
    // Handle anything that isn't specified
    result = "Sorry! The only valid operations are add, subtract, multiply, and divide.";
  }

  // We return the result back to the user in the form of a string
  res.send(result.toString());

});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

// BONUS - How could you use * + etc. inside the app.get()?
/*let result=0;
app.get("/:operation", function(req, res) {
  const op=req.params.operation;
  const index=op.search(/[\/\+\-\*]/);

  
  if(op.search()===-1){
    res.send("Not a valid operation!! Please follow the pattern: 'number1 operation number2' ");
  }
  else{

    let num1=0;
    let num2=0;
     
    let str=op.substring(0,index);
    num1=parseInt(str);
  
    const operation=op.substring(index,index+1);
    str=op.substring(index+1);
    console.log(str);
    num2=parseInt(str);
    

    switch (operation){
      case '+': result=num1+num2;break;
      case '-': result=num1-num2;break;
      case '*': result=num1*num2;break;
      case '/': result=num1/num2;break;   //%2F on the browser  
      default:"Not a valid operation!! Please choose addition, subtraction, multiplication or division!!";
    }
  
  res.send(result.toString());
  }

});  */

```
---
## Activity 3: SEINFELD APPLICATION ##

* In this activity, we created a Node Application with Express and MySQL with three Express routes.

  - Create a `/cast` route that will display all the actors and their data ordered by their id's.

  - Create a `/coolness-chart` route that will display all the actors and their data ordered by their coolness points.

  - Create a `/attitude-chart/:att` route that will display all the actors for a specific type of attitude.

  * Database schema:

```
DROP DATABASE IF EXISTS seinfeld;
CREATE DATABASE seinfeld;
USE seinfeld;
-- Create the table actors.
CREATE TABLE actors (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  coolness_points int NOT NULL,
  attitude varchar(60) NOT NULL,
  PRIMARY KEY(id)
);
-- Insert a set of records.
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("George", 70, "selfish");
		   
```

```javascript
const express=require("express");
    const mysql=require("mysql");
    app=express();
    const PORT=process.env.PORT||3000;
    

    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "orhanpamuk77",
        database:"seinfeld"
      });

    // Initiate MySQL Connection.
   connection.connect(function(err) {
     if (err) {
       console.error("error connecting: " + err.stack);
       return;
     }
     console.log("connected as id " + connection.threadId);
   });  

    app.listen(PORT,function(){
          console.log("The server is listening at port:"+PORT);
    });

    //Create a `/cast` route that will display all the actors and their data ordered by their id's. 

   app.get("/cast",(req,res)=>{
    connection.query("SELECT * FROM actors ORDER BY id", function(err, result) {
        if (err) throw err.messsage;
        // We then begin building out HTML elements for the page.
        var html = "<h1>  Seinfeld Cast </h1>";
    
        // Here we begin an unordered list.
        html += "<ul>";
    
        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
          html += "<li><p> ID: " + result[i].id + "</p>";
          html += "<p>Name: " + result[i].name + " </p>";
          html += "<p>Coolness Points: " + result[i].coolness_points + " </p>";
          html += "<p>Attitude: " + result[i].attitude + " </p></li>";
        }
    
        // We close our unordered list.
        html += "</ul>";
    
        // Finally we send the user the HTML file we dynamically created.
       
        res.send(html);
        
      });

   });

   //Create a `/coolness-chart` route that will display all the actors and their data ordered by their coolness points.
   app.get("/coolness-chart",(req,res)=>{
     connection.query("SELECT * FROM actors ORDER BY coolness_points DESC",function(err,result){
          if(err)throw err;
          var html="<h1> ACTORS ORDERED BY COOLNESS POINTS </h1>"
          html+="<ul>";
          for(let i=0;i<result.length;i++){
              html+="<li><p>ID: "+result[i].id+"</p>";
              html+="<li><p>Name: "+result[i].name+"</p>";
              html+="<li><p>Coolness Points: "+result[i].coolness_points+"</p>";
              html+="<li><p>Attitude: "+result[i].attitude+"</p></li>";
          }
          html+="</ul>";
          res.send(html);
          
     });

   });

   //Create a `/attitude-chart/:att` route that will display all the actors for a specific type of attitude.
   app.get("/attitude-chart/:att",(req,res)=>{
     const attitute=req.params.att;
     connection.query("SELECT * FROM actors WHERE attitude = ?",attitute,function(err,result){
         if (err) throw err;
         var html="<h1> ACTOR WITH ATTITUTE:<span>"+attitute.toUpperCase()+"</span></h1>";
          html+="<ul>";
          for(let i=0;i<result.length;i++){
              html+="<li><p>ID: "+result[i].id+"</p>";
              html+="<li><p>Name: "+result[i].name+"</p>";
              html+="<li><p>Coolness Points: "+result[i].coolness_points+"</p>";
              html+="<li><p>Attitude: "+result[i].attitude+"</p></li>";
          }
          html+="</ul>";
          res.send(html);
          

     });
   
   });

```
---
## Activity 5: BEN AND JERRY'S ##

* In this activity, we created our own Ben and Jerry's App where users can see all of the different flavors Ben and Jerry's have to offer while also getting specific information on a flavor by searching for it within the URL.
    
    
    ```javascript
    var icecreams = [
      {name: 'vanilla', price: 10, awesomeness: 3},
      {name: 'chocolate', price: 4, awesomeness: 8},
      {name: 'banana', price: 1, awesomeness: 1},
      {name: 'greentea', price: 5, awesomeness: 7},
      {name: 'jawbreakers', price: 6, awesomeness: 2},
      { name: "pistachio", price: 11, awesomeness: 15 }
    ];
    ```
    
  * Using handlebars and express, we created a route called `/icecream/:name`. When the route is hit, it displays the name, price and awesomeness for that specific ice cream.

  * We creates an `/icecreams` route. It loops over all the ice creams and display them all to the user.

* views
  * layouts
    * main.handlebars

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Ice creams</title>
	</head>
	<body>
		{{{ body }}}
	</body>
</html>

 ```
 ---
  * icecream.handlebars

 ```
   <p><b>Flavor:</b> {{name}}</p>
   <p><b>Price:</b> ${{price}}</p>
   <p><b>Awesomeness:</b> {{awesomeness}}</p>

 ```
---
* ics.handlebars
```
{{#each ics}}
  <p>Flavor: {{name}}</p>
  <p>Price: ${{price}}</p>
  <p>Awesomeness: {{awesomeness}}</p>
  <hr>
{{/each}}

```
---
* server.js

```javascript
// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");

// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Data
var icecreams = [
    {name: 'vanilla', price: 10, awesomeness: 3},
    {name: 'chocolate', price: 4, awesomeness: 8},
    {name: 'banana', price: 1, awesomeness: 1},
    {name: 'greentea', price: 5, awesomeness: 7},
    {name: 'jawbreakers', price: 6, awesomeness: 2},
    { name: "pistachio", price: 11, awesomeness: 15 }
  ];
// Routes
app.get("/icecream/:name", function(req, res) {
  const name=req.params.name;
  let ic="";
  for (let i of icecreams){
      if ((i.name)===name){
          ic=i;
          break;
      }
  }

  res.render("icecream", ic);
});

app.get("/icecreams", function(req, res) {
  res.render("ics", {ics:icecreams});
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

```

## Activity 6: HANDLEBARS ANIMALS:  

* dog.handlebars

```
<p><b>Animal Type:</b> {{animalType}}</p>
<p><b>Pet:</b> {{pet}}</p>
<p><b>Fierceness:</b> {{fierceness}}</p>

```
* index.handlebars
```
<ul>
  {{#each animals}}
    <li>
      <p><b>Type:</b> {{animalType}}</p>
      <p><b>Pet:</b> {{pet}}</p>
      <p><b>Fierceness:</b>{{fierceness}}</p>
    </li>
  {{/each}}
</ul>
```
* server.js

```javascript
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var animals = [
  {
    animalType: "dog",
    pet: true,
    fierceness: 4
  }, {
    animalType: "cat",
    pet: true,
    fierceness: 10
  }, {
    animalType: "giraffe",
    pet: false,
    fierceness: 4
  }, {
    animalType: "zebra",
    pet: false,
    fierceness: 8
  }, {
    animalType: "lion",
    pet: false,
    fierceness: 10
  }
];

// Handlebars requires an object to be sent to the dog.handlebars file. Lucky for us, animals[0] is an object!
app.get("/dog", function(req, res) {
  // 1. Send the dog object from the animals array to the dog.handlebars file.
     res.render("dog",animals[0]);

});

app.get("/all-pets", function(req, res) {
  // 2. Send the animals to the index.handlebars file. Remember that animals is an array and not an object.
    const animalPets=[]
    for (let i=0;i<animals.length;i++){
      if(animals[i].pet){
        animalPets.push(animals[i]);
      }
    }
    //const petAnimals=animals.filter(element=>element.pet==true);
    res.render("index",{myAnimal:animalPets})

});

app.get("/all-non-pets", function(req, res) {

  // 3. Send all the animals that are not pets to the index.handlebars file.
  const nonPets=[]
    for (let i=0;i<animals.length;i++){
      if(!animals[i].pet){
        nonPets.push(animals[i]);
      }
    }
    res.render("index",{myAnimal:nonPets});

});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

```
--- 
## Activity 08: Wishes ##

* In this activity, we created an app with Express, MySQL and Handlebars.

* We created a `schema.sql` file and created the following inside of that file:

    1. Made a database called "wishes_db"

    2. Inside of that database, made a table called "wishes" which has a wish column and an id column. The id is automatically incremented while also being the primary key.
```
-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS wishes_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE wishes_db;

USE wishes_db;

-- Create the table tasks.
CREATE TABLE wishes (
  id int NOT NULL AUTO_INCREMENT,
  wish varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO wishes (wish) VALUES ('Had a high paying job.');
INSERT INTO wishes (wish) VALUES ('Had a good health.');
INSERT INTO wishes (wish) VALUES ('Be with my loved ones.');

```

* In our `server.js` file, we created two routes: a get route for `'/'` and a post route for `'/'`.

* We rendered all of the wishes from the wishes table when the `'/'` get route is hit. Additionally show the form that the user can use to create a new wish. The form POSTs to the `'/'` route.

 * The `'/'` post route inserts the wish from the form into the wishes table and redirects the user back to the `'/'` get route.

```javascript
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "wishes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Root get route
app.get("/", function(req, res) {
  connection.query("SELECT * FROM wishes;", function(err, data) {
    if (err) throw err;

    res.render("index", { wishes: data });
  });
});

// Post route -> back to home
app.post("/", function(req, res) {
  
  // https://en.wikipedia.org/wiki/SQL_injection
  connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
    if (err) throw err;

    res.redirect("/");
    
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

---
## Activity 10: WATCH LIST ##
## Using the `terminal` or your favorite MySQL GUI

* In this activity, we created a full-stack application with Express, MySQL and Handlebars.

* We created a `schema.sql` file. Inside of that file, we did the following:

    1. Made a database called moviePlannerDB

    2. Inside of that database made a movies table which contains a movie column and an id column. The id is automatically incremented while also being the primary key.

    3. We run ur `schema.sql` file within MySQL Workbench before moving onto the next steps.

```
DROP DATABASE IF EXISTS moviePlannerDB;

-- Create the database moviePlannerDB and specified it for use.
CREATE DATABASE moviePlannerDB;

USE moviePlannerDB;

-- Create the table plans.
CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  movie varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO movies (movie) VALUES ('Pokemon XYZ');

```

* In our server.js file, we created four routes: `get`, `post`, `put`, and `delete`.

    * Rendered the main `index.handlebars` when the `'/'` get route is hit with all of the movies from the movies table.

    * Our application has a set of routes on `'/movies'` for create, update, and delete operations on the movies table.

    * There is a delete button next to each movie. When one of the delete buttons is clicked, the code sends a DELETE request to  delete the associated movie from our database.

    * Additionally, showed the form that the user can use to add a movie to be watched.  When the submit button is clicked, the code posts to the `'/movies'` route, which inserts the movie from the form into the movies table and return the ID of the new movie.

    * We  Have another form that updates a movie in the movies table. The form includes two inputs: an id input and a movie title input. We used a PUT method.

    * Best practices for REST include:
      * Put your REST API on it's own URL (e.g. `'/todos'`).
      * A POST that creates an item should return the ID of the item it created.
      * PUT and DELETE should specify the ID of the item they're intended to affect in the URL (e.g. `'/todos/123'`).
      * If the ID for the item specified in a PUT or DELETE couldn't be found, return a 404.
      * If an error occurs in the server, return an error code (e.g. 500).

* index.handlebars 

```
<h1>Movies To Watch</h1>

<ul>
  {{#each movies}}
    <li>
      <p>
        {{this.id}}. {{this.movie}}

        <button data-movieid="{{this.id}}" class="delmovie">Delete</button>
      </p>
    </li>
  {{/each}}
</ul>

<h2>Add a Movie to Watch</h2>
<form id="addmovie" class="button-size">
	<textarea type="text" name="movie"></textarea>
	<button type="submit">Save Movie!</button>
</form>

<h2>Update a Movie</h2>
<form id="updatemovie" class="button-size">
  <input type="text" name="id" placeholder="id">
	<textarea type="text" name="movie" placeholder="what do you want to update this movie title to?"></textarea>
	<button type="submit">Update Movie!</button>
</form>

<script type="text/javascript">
  $(".delmovie").on("click", function(event) {
    var id = $(this).data("movieid");

    // Send the DELETE request.
    $.ajax("/api/movies/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#addmovie").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMovie = {
      movie: $("#addmovie [name=movie]").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/movies", {
      type: "POST",
      data: newMovie
    }).then(
      function() {
        console.log("added new movie");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#updatemovie").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var id = $("[name=id]").val().trim();

    var updatedMovie = {
      movie: $("#updatemovie [name=movie]").val().trim()
    };

    // Send the PUT request.
    $.ajax("/api/movies/" + id, {
      type: "PUT",
      data: updatedMovie
    }).then(
      function() {
        console.log("updated id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
</script>

```
* server.js

```javascript

var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "moviePlannerDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the movies in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM movies;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { movies: data });
  });
});

// Create a new plan
app.post("/api/movies", function(req, res) {
  
  connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new plan
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update a plan
app.put("/api/movies/:id", function(req, res) {

  connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function(err, result) {

    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a plan
app.delete("/api/movies/:id", function(req, res) {
  connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

```

---

## Activity 11: QUOTES APP ##

* In this activity, using Express, MySQL, Handlebars, and the starter code as a jumping-off point, we creates a simple web application which allows users to create, read, update, and delete popular quotes.

  * Our application has two pages:

    * One shows all of the quotes within a database and allows users to create a new quote or delete an existing one. A button next to each, labeled "Update This Quote," takes users to the other page which shows the quote selected and allows them to update it with new information.

  * Code contained within the `schema.sql` and `seeds.sql` files are run beforehand so that we have a database with which to work.


* schema.sql

```
CREATE DATABASE quotes_db;
USE quotes_db;

CREATE TABLE quotes
(
	id int NOT NULL AUTO_INCREMENT,
	author varchar(255) NOT NULL,
	quote TEXT NOT NULL,
	PRIMARY KEY (id)
);
    
```
* seeds.sql

```
INSERT INTO quotes (quote, author) VALUES ('Know your "why" in any of your endeavors. That will push you through any wall you hit.', 'Albert Bahia');

INSERT INTO quotes (quote, author) VALUES ('In any moment of decision, the best thing you can do is the right thing, the next best thing is the wrong thing, and the worst thing you can do is nothing.', "Theodore Roosevelt");

INSERT INTO quotes (quote, author) VALUES ('Never leave home without your cardigan.', "Owens O'Brien");

INSERT INTO quotes (quote, author) VALUES ('Give me fuel, Give me fire, Give me that which I desire, Ooh!', "Nate Tuvera");

INSERT INTO quotes (quote, author) VALUES ("TiK ToK, on the clock; But the party don't stop no; Whoa-oh oh oh; Whoa-oh oh oh; Don't stop, make it pop; DJ, blow my speakers up", "Michael Stearne");

INSERT INTO quotes (quote, author) VALUES ("They told him don't you ever come around here; Don't want to see your face, you better disappear; The fire's in their eyes and their words are really clear; So beat it, just beat it", "Dan Orrico");

INSERT INTO quotes (quote, author) VALUES ("Sup bro?", "Ruby Pradhan");
```

* public/assets/css/styles.css
```
li {
  padding: 5px;
  margin: 5px;
  background: #faebd7;
}

.label {
  font-weight: bold;
}

.update-form {
  padding: 5px;
  margin: 5px;
  background: aqua;
}

.form-group {
  margin-bottom: 5px;
}
```
* public/assets/js/quotes.js

```
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delquote").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/quotes/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newQuote = {
      author: $("#auth").val().trim(),
      quote: $("#quo").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/quotes", {
      type: "POST",
      data: newQuote
    }).then(
      function() {
        console.log("created new quote");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".update-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var updatedQuote = {
      author: $("#auth").val().trim(),
      quote: $("#quo").val().trim()
    };

    var id = $(this).data("id");

    // Send the POST request.
    $.ajax("/api/quotes/" + id, {
      type: "PUT",
      data: updatedQuote
    }).then(
      function() {
        console.log("updated quote");
        // Reload the page to get the updated list
        location.assign("/");
      }
    );
  });
});

```
* views/layouts/main.handlebars

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
		<link rel="stylesheet" href="/assets/css/style.css" type="text/css" />
		<script src="https://code.jquery.com/jquery.js"></script>
		<script src="/assets/js/quotes.js"></script>
		<title>Quotes App</title>
	</head>
	<body>
		{{{ body }}}
	</body>
</html>

```
* views/index-handlebars

```
<h1>Quotes App</h1>

<p>Manage quotes with this app</p>

<!-- Pass in data from server.js -->
<ul>
  {{#each quotes}}
  	<li>
  		<p><span class="label">ID:</span> {{this.id}}</p>
      <p><span class="label">Quote:</span> {{this.quote}}</p>
      <p><span class="label">Author:</span> {{this.author}}</p>

      <button data-id="{{this.id}}" class="delquote">Delete</button>

      <a href="/{{this.id}}">Update this quote</a>
  	</li>
  {{/each}}
</ul>

<h2>Add a Quote</h2>

<form class="create-form">

  <div class="form-group">
    <label for="auth">Author:</label>
    <input type="text" id="auth" name="author">
  </div>

  <div class="form-group">
    <label for="quo">Quote:</label>
    <textarea id="quo" name="quote" rows="8" cols="40"></textarea>
  </div>

  <button type="submit">Add Quote</button>
</form>

```
* views/single-quote.handlebars

```
<h1>Update the quote with an id of {{this.id}}</h1>

<form data-id="{{this.id}}" class="update-form">

  <div class="form-group">
    <label for="auth">Author:</label>
    <input type="text" id="auth" name="author" value="{{this.author}}">
  </div>

  <div class="form-group">
    <label for="quo">Quote:</label>
    <textarea id="quo" name="quote" rows="8" cols="40">{{this.quote}}</textarea>
  </div>

  <button type="submit">Update Quote</button>
</form>

```
* server.js

```
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));//middleware. Anytime you want to make a 
//static request.Middleware is checked before anything

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "orhanpamuk77",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Serve index.handlebars to the root route, populated with all quote data.
app.get("/", function(req, res) {
   connection.query("SELECT * FROM quotes;",(err,data)=>{
            if (err){
              return res.status(500).end();
            }
            res.render("index",{quotes:data});
   });

});

// Serve single-quote.handlebars, populated with data that corresponds to the ID in the route URL.
app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM quotes WHERE id=?;",req.params.id,(err,data)=>{
        if (err){
          res.status(500).end();
        }
        res.render("single-quote",data[0]);

  });

});

// Create a new quote using the data posted from the front-end.
app.post("/api/quotes", function(req, res) {
  connection.query("INSERT INTO quotes (author,quote) VALUES (?,?)",[req.body.author,req.body.quote],(err,result)=>{
                if(err){
                  res.status(500).end();
                }
                // Send back the ID of the new plan
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
  });

});

// Delete a quote based off of the ID in the route URL.
app.delete("/api/quotes/:id", function(req, res) {
  connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Update a quote.
app.put("/api/quotes/:id", function(req, res) {
  connection.query("UPDATE quotes SET author = ?, quote=?  WHERE id = ?", [req.body.author,req.body.quote, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

```
---
## Activity 13: PARTY DATABASE ##

* In this activity, we created a holiday party planner application. We want to help create parties for our clients whilst also keeping track of all the events that we are hosting. In MySQL, we created a database called `party_db` with two tables structured like the tables below. Utilized the provided `schema.sql` and `seeds.sql` file in order to build the tables and seed initial values.

    | id | party_name              | party_type | party_cost | client_id |
    | -- | ----------------------- | ---------- | ---------- | --------- |
    | 1  | Everybody Loves Raymond | tv         | 500        | 1         |
    | 2  | Big Bang Theory         | tv         | 900        | 1         |
    | 3  | Top Gun                 | movie      | 200        | 2         |
    | 4  | Whiskey                 | grown-up   | 300        | 2         |
    | 5  | Cigar                   | grown-up   | 250        | 3         |

    | id | client_name |
    | -- | ----------- |
    | 1  | Bilal       |
    | 2  | Brianne     |
    | 3  | Vincent     |

* schema.sql
```
CREATE DATABASE party_db;

USE party_db;

CREATE TABLE clients
(
	id int NOT NULL AUTO_INCREMENT,
	client_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE parties
(
	id int NOT NULL AUTO_INCREMENT,
	party_name varchar(255) NOT NULL,
	party_type varchar(255) NOT NULL,
	party_cost int NOT NULL,
	client_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

* seeds.sql
```
INSERT INTO clients (client_name) VALUES ('Bilal');
INSERT INTO clients (client_name) VALUES ('Brianne');
INSERT INTO clients (client_name) VALUES ('Vincent');

INSERT INTO parties (party_name, party_type, party_cost, client_id) VALUES ('Everybody Loves Raymond', 'tv', 500, 1);
INSERT INTO parties (party_name, party_type, party_cost, client_id) VALUES ('Big Bang Theory', 'tv', 900, 1);
INSERT INTO parties (party_name, party_type, party_cost, client_id) VALUES ('Top Gun', 'movie', 200, 2);
INSERT INTO parties (party_name, party_type, party_cost, client_id) VALUES ('Whiskey', 'grown-up', 300, 2);
INSERT INTO parties (party_name, party_type, party_cost, client_id) VALUES ('Cigar', 'grown-up', 250, 3);

```

* We created a Node MySQL application with an ORM that executes once the server is launched.

* We did not need Express or Handlebars for this assignment. We used `console.log` to print the data collected to the console..

* We created a Node app and connect it to MySQL with a `config` folder and with a `connection.js` file inside of that folder.

* We created an `orm.js` file, and make an ORM do the following:

  * Console log all the party names.
  * Console log all the client names.
  * Console log all the parties that have a party-type of grown-up.
  * Console log all the clients and their parties.


* connection.js

```
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "parties_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

```
* orm.js
```
var connection = require("./connections");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
  select: function(colToList,tableInput) {
    var queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [colToList,tableInput ], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  
  selectWhere: function(tableInput,colToSearch,valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ??=?";
    console.log(queryString);
    connection.query(queryString, [tableInput,colToSearch,valOfCol], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  clientParties: function(whatToSelect,tableOne,tableTwo,onTableOneCol,onTableTwoCol) {
    var queryString =
      "SELECT ?? FROM ?? AS tOne LEFT JOIN ?? AS tTwo ON tOne.??= tTwo.?? ";

    connection.query(
      queryString,
      [whatToSelect,tableOne,tableTwo,onTableOneCol,onTableTwoCol],
      function(err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  }
};

module.exports = orm;

```
* server.js

```
var orm = require("./config/orm");

//Console log all the party names.
orm.select("party_name", "parties");
//Console log all the client names.
orm.select("client_name", "clients");
//Console log all the parties that have a party-type of grown-up.
orm.selectWhere("parties","party_type","grown-up")
// Console log all the clients and their parties.
orm.clientParties(["client_name","party_name"],"clients","parties","id","client_id");
```
---

## Activity 14:THE ASYNC PROBLEM ##

* In this activity, we corrected an async problem by using promises.
* orm.js

```
var connection = require("../config/connection.js");

var orm = {
  selectWhere:async function(tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
   return new Promise((resolve,reject)=>{
     connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      if (err) reject(err);
      return resolve(result);
    });
   });
    
  }
};

module.exports = orm;

```
* server.js

```
var orm = require("./config/orm.js");

async function init(){
let data=await orm.selectWhere("parties", "party_type", "grown-up");
console.log(data);
}

//console.log(data); // Data is undefined. Why? Because since database operations are asnchronous
//it does not wait for the database to get the data. Console log the data that's undefined. 

init();
```
---
## Activity 15:CALLBACKS REVIEW ##
* 01onClick.js

```
// 1. Explain the on click code below.
//   when the button with id "boomButton" is clicked, an anonymous function is executed
//   and boom is shown to the user in an alert

// 2. When the page loads does the anonymous function get executed?
// No

// 3. When does the anonymous function get executed?
// Anonymous function is executed when the button is clicked


$("#boomButton").on("click", function() {
  alert("boom");
});

```
* 02.js

```
var sum = function(numOne, numTwo) {
  return numOne + numTwo;
};

var multiply = function(numOne, numTwo) {
  return numOne * numTwo;
};

var addCallBacks = function(functionOne, functionTwo) {
  return functionOne(6, 2) + functionTwo(6, 3);
};

// What does this return?
addCallBacks(multiply, sum);
//(6*2)+(6+3)=21
```
* 03.js

```
var subtract = function(numOne, numTwo) {
  return numOne - numTwo;
};

var multiply = function(numOne, numTwo) {
  return numOne * numTwo;
};

var addCallBacks = function(functionOne, functionTwo) {
  return functionOne(6, 2) + functionTwo(6, 3);
};

// What does this return?
addCallBacks(subtract, multiply);
//It returns (6-2)+(6*3)=22

```
* 04.js

```
var sum = function(numOne, numTwo) {
  return numOne + numTwo;
};

var subtract = function(numOne, numTwo) {
  return numOne - numTwo;
};

var addCallBacks = function(functionOne, functionTwo) {
  return functionOne(6, 2) + functionTwo(6, 3);
};

// What does this return?
addCallBacks(subtract, sum);
//It returns (6-2)+(6+3)=13
```
* 05.js

```
var sum = function(numOne, numTwo) {
  return numOne + numTwo;
};

var subtract = function(numOne, numTwo) {
  return numOne - numTwo;
};

var addCallBacks = function(functionOne, functionTwo) {
  return functionOne(6, 2) + functionTwo(6, 3);
};

// What does this return?
addCallBacks(sum, subtract);
//It returns (6+2)+(6-3)=11

```

* 06.js

```
var sum = function(numOne, numTwo) {
  return numOne + numTwo;
};

var subtract = function(numOne, numTwo) {
  return numOne - numTwo;
};

var multiply = function(numOne, numTwo) {
  return numOne * numTwo;
};

var anythingGoes = function(functionOne, functionTwo, functionThree) {
  functionThree(functionOne(3, 4), functionTwo(7, 2));
};

// Challenge: what does this return?
anythingGoes(multiply, subtract, sum);
//It returns undefined because result of the 3 operations are not returned.

```

* 07.js

```
var sum = function(numOne, numTwo) {
  return numOne + numTwo;
};

var subtract = function(numOne, numTwo) {
  return numOne - numTwo;
};

var multiply = function(numOne, numTwo) {
  return numOne * numTwo;
};

var anythingGoes = function(functionOne, functionTwo, functionThree) {
  return functionThree(functionOne(3, 4), functionTwo(7, 2));
};

// Challenge: what does this return?
anythingGoes(multiply, subtract, sum);
//(3*4)+(7-2)=17 is returned

```
---
## Activity 17: Cats App ###

  * Add a delete button into the `index.handlebars` file next to each cat.

  * Add on to the following:

  * The `cats.js` file to add a jQuery event handler for the delete button.
  * The ORM to include a delete key and function
  * The cat model to include a delete key and function that uses the ORM
  * The `catsController.js` file to have a `/api/cats/:id` delete route, to call the delete key of the cat model, and to pass in arguments as necessary

* config/connection.js

```
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "cat_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

```
* config/orm.js

```
// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  delete: function(tableInput,condition, cb) {
    var queryString = "DELETE FROM " + tableInput+" WHERE "+condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;

```
* controllers/catsController.js

```
var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cats", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id",function(req,res){
  var condition="id = "+req.params.id;

  cat.delete(condition,function(result){
     if(result.affectedRows == 0){
       return res.status(404).end();
     }
     else{
       res.status(200).end();
     }
  });

});

// Export routes for server.js to use.
module.exports = router;

```
* db/schema.sql

```
CREATE DATABASE cat_db;
USE cat_db;

CREATE TABLE cats
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	sleepy BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
```

* models/cat.js
```
var orm = require("../config/orm.js");

var cat = {
  all: function(cb) {
    orm.all("cats", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("cats", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("cats", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition,cb){
     orm.delete("cats",condition,function(res){
          cb(res);
     });
  
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = cat;

```

* public/css

```
li {
  padding: 5px;
  margin: 5px;
  background: #faebd7;
}

.label {
  font-weight: bold;
}

.create-update-form {
  padding: 5px;
  margin: 5px;
  background: aqua;
}

.form-group {
  margin-bottom: 5px;
}

```

* public/js/cats.js

```
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(
      function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newCat
    }).then(
      function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-cat").on("click",function(event){
     event.preventDefault();
     var id=$(this).data("id");

     $.ajax("/api/cats/"+id,{
       type:"DELETE"
     }).then(
       function(){
         console.log("Deleted the cat with the id: "+id);
         location.reload();

       });

  });
});

```
* views/index.handlebars

```
<h1>Cats!</h1>

<h2>Cats that are not sleepy!</h2>

<ul>
  {{#each cats}}
    {{#unless sleepy}}
      {{> cats/cat-block sleep=true}}
    {{/unless}}
  {{/each}}
</ul>

<h2>Cats that are sleepy!</h2>

<ul>
  {{#each cats}}
    {{#if sleepy}}
      {{> cats/cat-block sleep=false}}
    {{/if}}
  {{/each}}
</ul>

<h2>Add a Cat</h2>
<form class="create-form">

  <div class="form-group">
    <label for="ca">Cat Name:</label>
    <input type="text" id="ca" name="name">
  </div>

  <div class="form-group">
    <label for="slee">Sleepy?</label><br>
    <input type="radio" name="sleepy" value="1" checked> Sleepy!<br>
    <input type="radio" name="sleepy" value="0"> Awake
  </div>

  <button type="submit">Add Cat</button>
</form>

```
* views/partials/cats/cat-block.handlebars

```
<li>
	{{name}}

	<button class="change-sleep" data-id="{{id}}" data-newsleep="{{sleep}}">
		{{#if sleep}}SLEEP TIME!{{else}}WAKE UP!{{/if}}
	</button>
	<button class="delete-cat" data-id="{{id}}">Delete</button>
</li>

```
* server.js

```
var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/catsController.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

```

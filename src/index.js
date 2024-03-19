import { config } from "dotenv";
import  Express  from "express";
import  {createPool}  from "mysql2/promise";

config()

const app = new Express();
const port = process.env.NODE_DOCKER_PORT || 3001;


const pool = createPool({ 
    host: process.env.MYSQLDB_HOST, 
    user: process.env.MYSQLDB_USERNAME, 
    password:  process.env.MYSQLDB_ROOT_PASSWORD, 
    port: process.env.MYSQLDB_DOCKER_PORT, 
    database: process.env.MYSQLDB_DATABASE 
})

// Define a route for the root URL ("/")    
app.get("/ping", (req, res) => {
    pool.query("SELECT now()") 
    .then((result) => {
        res.send(result[0]);
    })
    .catch((err) => {
        res.send(err);
    });
});



// Define a route for the "/users" URL
app.get("/", (req, res) => {

  res.send("Hello user!");
});

app.listen(port, () => {
  console.log("Server is listening on port: "+port);
});
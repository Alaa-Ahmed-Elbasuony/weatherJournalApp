// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// callback functions  (GET & POST)
const getAll = (req, res) => res.send(projectData);
app.get("/all", getAll);

const postData = (req, res) => {
  projectData = req.body;
  console.log(req.body);
  res.send({ msg: "data has added successfully" });
};
app.post("/add", postData);
//consle.log(projectData);

// Setup Server
const port = 9999;
const hostName = "127.0.0.1";

//test server
const listening = () =>
  console.log(`server is running at http://${hostName}:${port}/`);

app.listen(port, listening);

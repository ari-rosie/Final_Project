"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleNewUser,
  handleGetAccount,
  handleEdiblePlants,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/users/account/:email", handleGetAccount)
  .post("/users/new", handleNewUser)

  //TREFLE API ENDPOINTS
  .get("/plants/all", handleEdiblePlants)

  // .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));

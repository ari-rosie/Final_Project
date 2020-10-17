"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const {
  handleNewUser,
  handleGetAccount,
  handleGetGarden,
  handleEdiblePlants,
  handleUpdateGarden,
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
  .use(bodyParser.json({ limit: "50mb" }))
  .use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  )
  .use("/", express.static(path.join(__dirname, "build")))

  .post("/users/account/:email", handleGetAccount)
  .post("/users/new", handleNewUser)
  .put("/user/update-garden", handleUpdateGarden)
  .get("/users/garden/:email", handleGetGarden)
  .get("/plants/all", handleEdiblePlants)

  .get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })  

  // .use((req, res) => res.send("Not Found"))
  .listen(process.env.PORT || PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );

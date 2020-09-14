const { MongoClient } = require("mongodb");
const assert = require("assert");
const request = require("request-promise");

require("dotenv").config();
const { MONGO_URI, TREFLE_TOKEN, HARVEST_HELPER_TOKEN } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleGetGarden = async (req, res) => {
  const { email } = req.params;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");
    await db.collection("gardens").findOne({ _id: email }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, data: result })
        : res
            .status(404)
            .json({ status: 404, message: "Account not found. gardens" });
    });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const handleGetAccount = async (req, res) => {
  const { email } = req.params;
  const { username, password } = req.body;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    await db.collection("users").findOne({ email: email }, (err, result) => {
      result && result.username === username && result.password === password
        ? res.status(201).json({ status: 201, data: result })
        : res
            .status(404)
            .json({ status: 404, message: "Account not found. users" });
    });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const handleNewUser = async (req, res) => {
  const { newUser, newGarden } = req.body;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const addedUser = await db.collection("users").insertOne(newUser);
    const addedGarden = await db.collection("gardens").insertOne(newGarden);
    assert.equal(1, addedUser.insertedCount);
    assert.equal(1, addedGarden.insertedCount);
    res.status(201).json({ status: 201, data: req.body });

    client.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: error.message });
  }
};

const handleEdiblePlants = async (req, res) => {
  const reqObj = {
    headers: { Accept: "application/json" },
    uri: `http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${HARVEST_HELPER_TOKEN}`,
  };
  try {
    const data = await request(reqObj);
    res.status(200).json({ status: 200, data: data });
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateGarden = async (req, res) => {
  const { newGarden, email } = req.body;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");
    console.log(newGarden);
    console.log("email .......", email);
    // const setGarden = await db
    //   .collection("users")
    //   .updateOne({ email: email }, { $set: { garden: newGarden } });
    // assert.equal(1, setGarden.matchedCount);
    // assert.equal(1, setGarden.modifiedCount);

    return res.status(201).json({
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleNewUser,
  handleGetAccount,
  handleGetGarden,
  handleEdiblePlants,
  handleUpdateGarden,
};

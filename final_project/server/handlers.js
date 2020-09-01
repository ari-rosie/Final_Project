const { MongoClient } = require("mongodb");
const assert = require("assert");
const request = require("request-promise");

require("dotenv").config();
const { MONGO_URI, TREFLE_TOKEN, HARVEST_HELPER_TOKEN } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleGetAccount = async (req, res) => {
  const { email } = req.params;
  const { username, password } = req.query;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    await db.collection("users").findOne({ email: email }, (err, result) => {
      result && result.username === username && result.password === password
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, message: "Account not found." });
      client.close();
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
const handleNewUser = async (req, res) => {
  const { newUser } = req.body;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const addedUser = await db.collection("users").insertOne(newUser);
    assert.equal(1, addedUser.insertedCount);
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

    const setGarden = await db
      .collection("users")
      .updateOne({ email: email }, { $set: { garden: newGarden } });
    assert.equal(1, setGarden.matchedCount);
    assert.equal(1, setGarden.modifiedCount);

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
  handleEdiblePlants,
  handleUpdateGarden,
};

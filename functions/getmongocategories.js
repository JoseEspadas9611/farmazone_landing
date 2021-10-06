const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async () => {
  const { MONGO_URI_DESARROLLO } = process.env;
  const client = new MongoClient(MONGO_URI_DESARROLLO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    let data = [];
    await client
      .db("Farmazone")
      .collection("categories")
      .find({})
      .forEach((category) => data.push(category));
    return data;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context, callback) {
  if (event.httpMethod == "GET") {
    try {
      const data = await getData();
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({ categories: data }),
      });
    } catch (err) {
      console.log(err);
      callback(null, {
        statusCode: 400,
        headers,
        body: JSON.stringify({ msg: err.message }),
      });
    }
  }
};

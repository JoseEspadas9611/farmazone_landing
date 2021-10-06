/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (userId, address, statusCode,location) => {
  const { MONGO_URI_DESARROLLO } = process.env;
  const client = new MongoClient(MONGO_URI_DESARROLLO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    if (statusCode != 400) {
      await client.connect();
      let data = [];
      const results = await client
        .db("Farmazone")
        .collection("user_addresses")
        .insertOne({
          user_id: userId,
          addresses: [{ address, date: new Date(),location }],
        });
      return data;
    }
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context) {
  if (event.httpMethod == "POST") {
    const { user_id, address,location } = JSON.parse(event.body);
    let statusCode = 0;
    typeof user_id == "string" ? (statusCode = 400) : (statusCode = 200);

    try {
      const data = await getData(user_id, address, statusCode,location);
      console.log("=====DATA=======");
      console.log(data);
      console.log("================");
      return {
        statusCode,
        headers,
        body:
          statusCode == 200
            ? JSON.stringify({
                result_code: 0,
                msg: "Usuario registrado con éxito.",
              })
            : JSON.stringify({
                result_code: 1,
                msg: "Fallo al registrar usuario.",
              }),
      };
    } catch (err) {
      console.log(err); // output to netlify function log
      return {
        statusCode,
        headers,
        body: JSON.stringify({ result_code: 1, msg: err.message }),
      };
    }
  }
};

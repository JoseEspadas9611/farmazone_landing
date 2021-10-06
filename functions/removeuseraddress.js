/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (userId, address) => {
  // console.log("USER ID EN GET DATA: " + userId);
  // console.log("ADDRESS EN GET DATA: " + address);
  const { MONGO_URI_DESARROLLO } = process.env;
  const client = new MongoClient(MONGO_URI_DESARROLLO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    let data = [];
    const results = await client
      .db("Farmazone")
      .collection("user_addresses")
      .updateOne(
        { user_id: userId },
        { $pull: { addresses: { address: address } } }
      );
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context) {
  if (event.httpMethod == "POST") {
    // const { user_id } = JSON.parse(event.body)
    const { user_id, address } = JSON.parse(event.body);
    // console.log("=====user_id=======");
    // console.log(user_id);
    // console.log(address);
    // console.log("================");

    try {
      await getData(user_id, address);
      //   console.log("=====DATA=======");
      //   console.log(data);
      //   console.log("================");
      return {
        statusCode: 200,
        headers,
        // body: JSON.stringify({ data: data[0] }),
        body: JSON.stringify({
          error_code: 0,
          msg: "Dirección borrada con éxito.",
        }),
      };
    } catch (err) {
      console.log(err); // output to netlify function log
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ result_code: 1, msg: err.message }),
      };
    }
  }
};

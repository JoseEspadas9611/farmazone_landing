/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (userId) => {
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
      .aggregate({ $match: { user_id: userId } }, { $unwind: "$addresses" })
      .forEach((x) => data.push(x.addresses));
    return data.length ? data.sort((a, b) => (a.date > b.date ? 1 : -1)) : [];
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context) {
  if (event.httpMethod == "POST") {
    const { user_id } = JSON.parse(event.body);

    try {
      const data = await getData(user_id);
      if (data.length < 1) {
        let newData = data[1].relay;
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ data: data[0] }),
      };
    } catch (err) {
      console.log(err); // output to netlify function log
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ data: [] }),
      };
    }
  }
};

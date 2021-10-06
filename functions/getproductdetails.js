/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (business_id, products) => {
  const { MONGO_URI_DESARROLLO } = process.env;
  const client = new MongoClient(MONGO_URI_DESARROLLO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    let data = [];
    const results = await client
      .db("Ordering")
      .collection(business_id)
      .find({ sku: { $in: products } })
      .forEach((x) => data.push(x));
    return data;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context) {
  if (event.httpMethod == "POST") {
    const { products, business_id } = JSON.parse(event.body);
    //console.log(event.body);
    console.log("products: " + products);
    console.log("business_id: " + business_id);
    try {
      const data = await getData(business_id, products);
      // console.log("=====DATA=======");
      // console.log(data);
      // console.log("================");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ data }),
      };
      console.log("SUCCESSFUL");
    } catch (err) {
      console.log(err); // output to netlify function log
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ msg: err.message }),
      };
    }
  }
};

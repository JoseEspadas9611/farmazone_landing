/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (order) => {
  const { MONGO_URI_DESARROLLO } = process.env;
  const client = new MongoClient(MONGO_URI_DESARROLLO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    d = new Date();
    let arr = "";
    let arr2 = "";
    d.toLocaleDateString("es-MX")
      .split("/")
      .forEach((e) => (arr += e));
    d.toLocaleTimeString("es-MX")
      .split(":")
      .forEach((e) => (arr2 += e));

    const doxQuantity = await client
      .db("Farmazone")
      .collection("purchaseOrder")
      .count();

    const maxNumber = 10;
    const minNumber = 1;

    const randomId =
      doxQuantity +
      1 +
      "0" +
      arr +
      "0" +
      arr2 +
      "0" +
      Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

    order.id = randomId;
    const results = await client
      .db("Farmazone")
      .collection("purchaseOrder")
      .insertOne(order);
    return { results, randomId };
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context) {
  if (event.httpMethod == "POST") {
    const { order } = JSON.parse(event.body);
    try {
      const { results, randomId } = await getData(order);
      // console.log(data);
      if (results.insertedCount) {
        let body = {
          error_code: 0,
          order_id: randomId,
          msg: "Orden registrada con éxito.",
        };
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(body),
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: "Error en registro de orden",
        };
      }
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

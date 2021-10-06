const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (userId, address, location) => {
  const { MONGO_URI_DESARROLLO } = process.env;
  const client = new MongoClient(MONGO_URI_DESARROLLO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    let data = [];
    d = new Date();
    const results = await client
      .db("Farmazone")
      .collection("user_addresses")
      .find({ user_id: userId })
      .forEach((x) => data.push(x));
    const result = data[0].addresses.filter(
      (addressItem) => addressItem.address == address
    );
    let endResult = true;
    if (result.length) {
      endResult = false;
      return endResult;
    } else {
      await client
        .db("Farmazone")
        .collection("user_addresses")
        .update(
          { user_id: userId },
          {
            $push: {
              addresses: {
                address: address,
                date: new Date(),
                location: location,
              },
            },
          }
        );
      return endResult;
    }
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

exports.handler = async function (event, context) {
  if (event.httpMethod == "POST") {
    const { user_id, address, location } = JSON.parse(event.body);
    try {
      data = await getData(user_id, address, location);
      if (data) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            error_code: 0,
            msg: "Dirección actualizada con éxito",
          }),
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error_code: 0,
            msg: "No se agrego la dirección",
          }),
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

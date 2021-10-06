/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (client_id) => {
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
        .collection("purchaseOrder")
        .find({"client.id":parseInt(client_id)},{"id":0})
        .forEach((order) => data.push({order}));// necesita el forEach para terminar de esperar a la base de datos de lo contrario envía un cursor de Mongo
    return data;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};



exports.handler = async function (event, context) {
  if (event.httpMethod == "GET") {
    let client_id = event.queryStringParameters.client_id
    try {
        const data = await getData(client_id);
        if (data.length != 0){    
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ data: data }),
                };
        }else{
            return {
                statusCode: 200,
                headers,
                body:JSON.stringify({
                error_code:3,
                msg: "No se encontraron datos",
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
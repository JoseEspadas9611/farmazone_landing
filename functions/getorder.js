/* eslint-disable */
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const headers = {
  "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*",
};

const getData = async (business_id,limit) => {
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
      .find({"business_id":business_id}).sort({_id:-1}).limit(parseInt(limit))
      .forEach((order) => data.push({order})); // necesita el forEach para terminar de esperar a la base de datos de lo contrario envía un cursor de Mongo
    return data;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
};

const getDataPOST = async (order_id) => {
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
        .find({"id":order_id})
        .forEach((x) => data.push(x)); // necesita el forEach para terminar de esperar a la base de datos de lo contrario envía un cursor de Mongo
      return data;
    } catch (err) {
      console.log(err); // output to netlify function log
    } finally {
      await client.close();
    }
  };

exports.handler = async function (event, context) {
  if (event.httpMethod == "GET") {
    let business_id = event.queryStringParameters.business_id 
    let limit = event.queryStringParameters.limit
    try {
        const data = await getData(business_id,limit);
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
  }else if(event.httpMethod == "POST"){
    const { order_id } = JSON.parse(event.body);
    try {
        const data = await getDataPOST(order_id);
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
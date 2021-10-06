const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
  const URL = "https://apiv4.ordering.co/v400/es/farmazone/business";
  const { API_KEY } = process.env;

  let options = {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
      "x-api-key": API_KEY,
    },
    params: {
      type: "1",
      params: "id,name,address,slug,open,phone,cellphone,logo",
    },
  };

  /* SELECCION DE METHOD  */

  if (event.httpMethod == "POST") {
    // const { lat, lng } = JSON.parse(event.body);
    // const location = { lat, lng };
    console.log("Evento post");
    const { location } = JSON.parse(event.body);
    options.params.location = location;
    console.log(typeof location);

    // Parsing and cleansing
    const cleanJSON = (body) => {
      //console.log("cleanJSON");
      let response = {
        error: true,
      };

      const makeBusinessList = (result) => {
        let businessList = [];
        //console.log("body.pagination.total" + body.pagination.total);
        for (let i = 0; i < body.pagination.total; i++) {
          businessList.push({
            id: result[i].id,
            name: result[i].name,
            address: result[i].address,
            slug: result[i].slug,
            open: result[i].open,
            location: result[i].location,
          });
        }
        //console.log(businessList);
        return businessList;
      };

      if (!body.error && body.error != undefined) {
        let result = JSON.parse(JSON.stringify(body.result));
        console.log("hubo error? " + body.error);
        response.error = false;
        response.businessFound = body.pagination.total;
        console.log("Linea 56. Antes de ejecutar makeBusinessList()");
        response.businessList = makeBusinessList(result);
        return JSON.stringify(response);
      }
      response.msg = JSON.stringify(body.message);
      return JSON.stringify(response);
    };
    // Respuesta al front end
    const send = (statusCode, body) => {
      callback(null, {
        statusCode,
        headers: {
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Origin": "*",
        },
        body: cleanJSON(body),
      });
    };

    const findBusiness = () => {
      axios
        .get(URL, options)
        .then((res) => send(200, res.data))
        .catch((err) => send(400, err));
    };

    findBusiness();
  }
};

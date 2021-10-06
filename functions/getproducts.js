const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
  // Request a la API
  const ORDERING_API = "https://apiv4.ordering.co/v400/en/farmazone/business";
  const { API_KEY } = process.env;
  // "business_id" debe ser un numero no un string
  const { business_id: BUSINESS_ID, category: CATEGORY_ID } = JSON.parse(
    event.body
  );

  let { limit, start_at } = JSON.parse(event.body);

  const URL = `${ORDERING_API}/${JSON.stringify(
    BUSINESS_ID
  )}/categories/${JSON.stringify(CATEGORY_ID)}/products`;

  const options = {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
      "x-api-key": API_KEY,
    },
    params: {
      params: "id,name,price,sku,description,in_offer,offer_price,images",
      limit: JSON.stringify(limit),
      start: JSON.stringify(start_at),
    },
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

  // Llamada a la API
  const getProductsList = () => {
    axios
      .get(URL, options)
      .then((res) => send(200, res.data))
      .catch((err) => send(400, err));
  };

  /* Función cleanJSON(): retira elementos innecesarios o privados de Ordering
     y los entrega limpios al front end
  */
  const cleanJSON = (body) => {
    let response = {
      error: true,
    };

    if (!body.error && body.error != undefined) {
      response.error = false;
      response.productsLength = body.pagination.total;
      response.products = body.result;
      return JSON.stringify(response);
    }
    response.msg = JSON.stringify(body.message);
    return JSON.stringify(response);
  };

  if (event.httpMethod == "POST") {
    /* options.params.params no puede ser un string vacio
    xq si lo es Ordering.co nos entrega toda la info */
    getProductsList();
  }
};

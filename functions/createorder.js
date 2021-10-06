const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
  // Request a la API
  const URL = "https://apiv4.ordering.co/v400/en/farmazone/orders";
  const { API_KEY } = process.env;
  // "business_id" debe ser un numero no un string
  const data = JSON.parse(event.body);

  const options = {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "X-APP-X": "web",
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
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        Vary: "Origin",
      },
      body: cleanJSON(body),
    });
  };

  // Llamada a la API
  const postToOrdering = () => {
    // console.log("data");
    // console.log(data);
    // console.log("type data");
    // console.log(typeof data);
    axios
      .post(URL, data, options)
      .then((res) => send(200, res.data))
      .catch((err) => send(400, err));
  };

  /* Función cleanJSON(): retira elementos innecesarios o privados de Ordering
     y los entrega limpios al front end
  */
  const cleanJSON = (body) => {
    console.log("<body>");
    console.log(body);
    console.log("</body>");
    let response = {
      error: true,
    };

    if (!body.error) {
      const r = body.result;
      response.error = false;
      response.order_id = r.id;
      response.customer_id = r.customer_id;
      response.paymethod_id = r.paymethod_id;
      response.purchase = r.products;
      response.customer = r.customer;
      return JSON.stringify(response);
    }
    response.msg = JSON.stringify(body.message);
    return JSON.stringify(response);
  };

  if (event.httpMethod == "POST" && data.customer_id) {
    /* options.params.params no puede ser un string vacio
    xq si lo es Ordering.co nos entrega toda la info */
    postToOrdering();
  }
};

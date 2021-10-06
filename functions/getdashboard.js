const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
  // Request a la API
  const URL = "https://apiv4.ordering.co/v400/es/farmazone/orders";

  const { API_KEY } = process.env;
  // "business_id" debe ser un numero no un string

  const bearerToken = event.headers.authorization;

  const options = {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
      "Content-Type": "application/json",
      Authorization: bearerToken,
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
  const getFromOrdering = () => {
    console.log("headers");
    console.log(bearerToken);
    console.log("type token");
    console.log(typeof bearerToken);
    axios
      .get(URL, options)
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
      response.orders_quantity = body.pagination.total;
      response.orders = r.map((order) => {
        let elem = {
          id: order.id,
          uuid: order.uuid,
          paymethod_id: order.paymethod_id,
          business_id: order.business_id,
          delivery_type: order.delivery_type,
          delivery_datetime: order.delivery_datetime,
          app_id: order.app_id,
          created_at: order.created_at,
          updated_at: order.updated_at,
          hash_key: order.hash_key,
          products: order.products,
          paymethod_id: order.paymethod.id,
          paymethod: order.paymethod.name,
          customer: {
              id: order.customer.id,
              name: order.customer.name,
              lastname: order.customer.lastname,
              phone: order.customer.phone,
              email: order.customer.email,
          },
          business: {
            id: order.business.id,
            name: order.business.name,
          },
        };
        return elem;
      });
      return JSON.stringify(response);
    }
    response.msg = JSON.stringify(body.message);
    return JSON.stringify(response);
  };

  if (event.httpMethod == "GET") {
    /* options.params.params no puede ser un string vacio
    xq si lo es Ordering.co nos entrega toda la info */
    getFromOrdering();
  }
};

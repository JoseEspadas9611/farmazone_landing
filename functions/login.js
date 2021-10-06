const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
  // Request a la API
  const URL = "https://apiv4.ordering.co/v400/en/farmazone/auth";
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
    console.log("data");
    console.log(data);
    console.log("type data");
    console.log(typeof data);
    axios
      .post(URL, data, options)
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

    if (!body.error) {
      const r = body.result;
      response.error = false;
      response.client = { id: r.id };
      response.client.name = r.name;
      response.client.address = r.address;
      response.client.phone = r.phone;
      response.client.email = r.email;
      response.client.token = r.session.access_token;
      return JSON.stringify(response);
    }
    response.msg = JSON.stringify(body.message);
    return JSON.stringify(response);
  };

  if (event.httpMethod == "POST") {
    /* options.params.params no puede ser un string vacio
    xq si lo es Ordering.co nos entrega toda la info */
    postToOrdering();
  }
};

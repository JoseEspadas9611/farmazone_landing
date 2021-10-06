const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
  // Request a la API
  const URL = "https://apiv4.ordering.co/v400/en/farmazone/users";
  const { API_KEY } = process.env;
  const data = JSON.parse(event.body);
  console.log("DATA HAST ARRIBA: " + JSON.stringify(data));
  let errorMessages = [{}];
  // const jsonBody = JSON.parse(event.body);
  // jsonBody.email -->  "julioml@dagsasc.com"

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
    let info = "";
    if (statusCode != 200) {
      info = body.response.data.result;
    } else {
      info = body;
    }
    console.log("INFO: " + info);
    let res = "";
    if (statusCode != 200) {
      for (let i = 0; i < info.length; i++) {
        if (info[i] == "The Email has already been taken.") {
          errorMessages[i] = {
            error_code: 1,
            message_error: "El correo ya está registrado.",
          };
        } else if (info[i] == "The Password must be at least 8 characters.") {
          errorMessages[i] = {
            error_code: 2,
            message_error: "La contraseña debe tener al menos 8 caracteres.",
          };
        } else if (info[i] == "The Email must be a valid email address.") {
          errorMessages[i] = {
            error_code: 3,
            message_error: "El email debe ser válido",
          };
        }
      }
      res = JSON.stringify({ error_mgs: errorMessages });
    } else {
      console.log("ELSE");
      res = cleanJSON(body);
    }
    console.log("ERROR MESSAGES: " + JSON.stringify(errorMessages));
    callback(null, {
      statusCode,
      headers: {
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        Vary: "Origin",
      },
      body: res,
    });
  };

  // Llamada a la API
  const postToOrdering = () => {
    console.log("data " + data);
    console.log("type data " + typeof data);
    axios
      //Primer parametro de axios es URL, el segundo es el JSON (data) y el tercero es options (headers y queries)
      // Para ordering data (JSON) se manda como objeto, en cambio para la lambda se manda como string
      .post(URL, data, options)
      .then((res) => send(200, res.data))
      .catch((err) => send(400, err));
  };

  /* Función cleanJSON(): retira elementos innecesarios o privados de Ordering
     y los entrega limpios al front end
  */
  const cleanJSON = (body) => {
    console.log("BODY CLEAN JSON: " + JSON.stringify(data.result));
    console.log("<body>");
    console.log(body);
    console.log("</body>");
    let response = {
      error: true,
    };
    const r = body.result;
    response.error = false;
    response.client = { id: r.id };
    response.client.name = r.name;
    response.client.address = r.address;
    response.client.phone = r.phone;
    response.client.email = r.email;
    response.client.token = r.session.access_token;
    return JSON.stringify(response);
  };

  if (event.httpMethod == "POST") {
    /* options.params.params no puede ser un string vacio
    xq si lo es Ordering.co nos entrega toda la info */
    postToOrdering();
  }
};

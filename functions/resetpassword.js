const axios = require("axios");
require("dotenv").config();

exports.handler = function (event, context, callback) {
    // Request a la API
    const URL = "https://apiv4.ordering.co/v400/en/farmazone/users/reset";
    const data = JSON.parse(event.body);

    const options = {
        headers: {
            Accept: "application/json, text/plain, */*",
            "User-Agent": "*",
            "Content-Type": "application/json",
            "X-APP-X": "web",
        },
    };

    // Respuesta al front end
    const send = (statusCode, body) => {
        let res = "";
        // callback ---> enviar json body al usuario diciendo este correo ya está registrado
        if (statusCode == 200) {
            res = cleanJSON(body);
        } else {
            res = JSON.stringify({ result: "Fallo al restablecer contraseña." })
        }
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
        // console.log("data");
        // console.log(data);
        // console.log("type data");
        console.log(typeof data);
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
        // console.log("<body>");
        // console.log(body.result);
        // console.log("</body>");
        let response = {
            error: true,
        };
        const res = body;
        response.error = false;
        response.result = res.result;
        return JSON.stringify(response);
    };

    if (event.httpMethod == "POST") {
        /* options.params.params no puede ser un string vacio
        xq si lo es Ordering.co nos entrega toda la info */
        postToOrdering();
    }
};

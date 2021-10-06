# Integracion de frontend de Farmazone con API lambdas

## APIs en Netlify lambda conectadas a Ordering.co

### Obtener categorias de Ordering
 
TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getcategories

Ejemplo:

```yaml
{ "business_id": 83 }
```

Resultado:

```yaml
{
  "error": false,
  "categoriesLength": 40,
  "categories": [{ "id": 1232, "name": "Antiinfeccioso" }, ...],
}
```

### Obtener categorías de MongoDB

TIPO: GET

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getmongocategories


Resultado:

```yaml
{
  "categories": [
    {
      "_id": "609d9fcc4a641f275a937003",
      "webcategory_id": 1,
      "name": "Alta Especialidad",
      "image_url": "https://res.cloudinary.com/farmazone/image/upload/c_scale,q_auto:best,w_728/v1620772595/categorias_farmazone/Alta%20especialidad.jpg"
    },
      ...
   ],
}
```


### Obtener negocio

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getbusiness

Ejemplo:

```yaml
{ 
  "business_id": 83 
}
```

Resultado:

```yaml
{
  "error": false,
  "business":
    {
      "id": 83,
      "name": "Farmazone - Guadalupe Inn",
      "address": "1000 West 5th Street, Austin, TX, USA",
      "slug": "SanAngel",
      "phone": "5513137476",
      "cellphone": null,
      "email": "Sanangel@farmazone.com.mx",
    },
}
```

### Obtener todos los negocios

TIPO: GET

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getbusiness

Resultado:

```yaml
{
  "error": false,
  "businessLength": 18,
  "businessList":
    [
      {
        "id": 78,
        "name": "Farmazone Narvarte",
        "address": "Icacos 38, Narvarte Oriente, Ciudad de México, CDMX, México",
        "slug": "Narvarte",
        "open": false,
        "location":
          { "lat": 19.3989185, "lng": -99.1524245, "zipcode": -1, "zoom": 15 },
      },
      ...,
    ],
}
```

### Consultar productos por id de categoría en MongoDB
 
TIPO: GET

CONTENT-TYPE: application/json
QUERYSTRINGPARAMETERS: category_id
URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getproductsbycategory

Ejemplo:

```yaml
 {
    "category_id":1
 }
```


Resultado:


```yaml
{
  "data": [
    {
      "_id": "6136979bfc65d517169dc8db",
      "sku": "7503000645477",
      "description": "AMAL 8MG TAB C10 ",
      "category": {
        "id": 1,
        "name": "ALTA ESPECIALIDAD"
      },
      "taxes": [],
      "brand": {
        "id": 94,
        "name": "AMAL"
      },
      "subcategory": {
        "id": 53,
        "name": "ANTIEMETICOS Y ANTINAUSEAS"
      },
      "department": {
        "id": 48,
        "name": "TRACTO ALIMENTARIO Y METABOLIS"
      },
      "price": 848,
      "images": "https://res.cloudinary.com/farmazone/image/upload/v1621023798/productos/7501001147594.jpg"
    },
    ...
   ]
}
 ```


### Obtener productos de Ordering

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getproducts

Ejemplo:

```yaml
{ "business_id": 59, ? OBLIGATORIO
    "category"
  : 390, ? OBLIGATORIO
    "limit"
  : 3, ? OPCIONAL
    "start_at"
  : 2 	     OPCIONAL }
```

Resultado:

```yaml
{
  "error": false,
  "productsLength": 3,
  "products":
    [
      {
        "id": 14856,
        "name": "Proalid Ungüento con 15 g (1 mg)",
        "price": 419,
        "sku": null,
        "description": "Proalid Ungüento con 15 g Tacrolimus (1 mg)",
        "in_offer": false,
        "offer_price": null,
      },

      {
        "id": 14857,
        "name": "Italdermol Crema con 30 g (0.1/15 g)",
        "price": 507,
        ...,
      },

      {
        "id": 14858,
        "name": "Italdermol 10 Gasas con Crema con 4 g (150 mg)",
        "price": 695,
        ...,
      },
    ],
}
```

### Obtener negocio teniendo coordenadas de localización

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/findbusiness

Ejemplo:

```yaml
{ 
  "location": "19.34403985031544, -99.15059790738852" 
}
```

Resultado:

```yaml
{
  "error": false,
  "businessFound": 1,
  "businessList":
    [
      {
        "id": 83,
        "name": "Farmazone - Guadalupe Inn",
        "address": "1000 West 5th Street, Austin, TX, USA",
        "slug": "SanAngel",
        "open": false,
      },
    ],
}
```


### Obtener disponibilidad de producto por SKU en otras tiendas

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getproductavailability

Ejemplo:

```yaml
{
  "products": [
    "7502225096866",
    "7501043162135"
  ],
  "business_id": "150"
}
```

Resultado:

```yaml
{
  "data":
    [
      {
        "_id": "60cd596cf35917ed511d2be1",
        "sku": "7502225096866",
        "category_id": 1858,
        "product_id": "189114",
        "busines_id": 150,
        "categoria": "Alta Especialidad",
      },
      {
        "_id": "60cd596cf35917ed511d2fc0",
        "sku": "7501043162135",
        "category_id": 1861,
        "product_id": "190105",
        "busines_id": 150,
        "categoria": "Cuidado Bucal",
      },
    ],
}
```


### Buscar detalles de un producto por SKU

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getproductdetails

Ejemplo:

```yaml
{
  "products": [
    "7502225096866",
    "7501043162135"
  ],
  "business_id": "150"
}
```

Resultado:

```yaml
{
  "data":
    [
      {
        "_id": "60cd596cf35917ed511d2be1",
        "sku": "7502225096866",
        "category_id": 1858,
        "product_id": "189114",
        "busines_id": 150,
        "categoria": "Alta Especialidad",
      },
      {
        "_id": "60cd596cf35917ed511d2fc0",
        "sku": "7501043162135",
        "category_id": 1861,
        "product_id": "190105",
        "busines_id": 150,
        "categoria": "Cuidado Bucal",
      },
    ],
}
```

### Registrar nuevo usuario

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/createuser

Ejemplo:

```yaml
{
  "name": "Juan Pablo",
  "address": "Avenida de las Jacarandas, Pue., México",
  "email": "insomnia@live.com",
  "password": "netlify123",
  "phone": "5500456789"
}
```

Resultado:

```yaml
{
  "error": false,
  "client": {
    "id": 833,
    "name": "Juan Pablo",
    "address": "Avenida de las Jacarandas, Pue., México",
    "phone": "5500456789",
    "email": "insomnia@live.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3 ... "
  }
}
```

### Iniciar sesión como usuario

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/login

Ejemplo:

```yaml
{
  "email": "smartdog@canine.com",
  "password": "randompass012"
}
```

Resultado:

```yaml
{
  "error": false,
  "client": {
    "id": 833,
    "name": "Erik Olafson",
    "address": "Calle 23, Col. Chamizal, Son., México",
    "phone": "550123456",
    "email": "northern@live.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3 ... "
  }
}
```

### Generar una orden para MongoDB

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/createmongoorder

Ejemplo:

```yaml
{
	"order": {
		"id": "",
		"client": {
			"id": 2000,
			"name": "Jacinto el cartero"
		},
		"products": [
			{
				"id": "1",
				"sku": "7502001165533",
				"name": "Ac.Nalidixico/Fenazopiridina 20 Tabletas (500/50 Mg) ",
				"price": 80.5
			},
			{
				"id": "2",
				"sku": "7502208891549",
				"name": "Loperamida 2Mg 12Tab",
				"price": 140.5
			}
		],
  "status": 4,
  "price": 221,
  "delivery": {
    "cost": 180.5,
    "delivered": false,
    "driver": "Manolo",
    "notes": "Mi casa es de color azul frente a una paletería",
    "address": "Avenida de las Jacarandas, Manolete, Michoacán, CDMX",
    "addressee": "La Manolita"
  },
  "payment_id": 2
  }
}
```

Resultado

```yaml
{
  "error_code": 0,
  "order_id": "1801092021222451100",
  "msg": "Orden registrada con éxito."
}
```


#### Clave de órdenes

<table>
<tr>
<th>Status</th><th>Significado</th>
</tr>
<tr>
<td>1</td><td>Entregada</td>
</tr>
<tr>
<td>2</td><td>Recibida</td>
</tr>
<tr>
<td>3</td><td>Pendiente</td>
</tr>
<tr>
<td>4</td><td>En camino</td>
</tr>
<tr>
<td>5</td><td>Cancelada</td>
</tr>
</table>

<table>
<tr>
<th>Payment ID</th><th>Significado</th>
</tr>
<tr>
<td>1</td><td>Efectivo</td>
</tr>
<tr>
<td>2</td><td>Tarjeta</td>
</tr>
<tr>
<td>3</td><td>Paypal</td>
</tr>
</table>

### Obtener lista de ordenes realizadas

TIPO: GET

AUTHORIZATION: Bearer Token

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getdashboard

Es necesario haber iniciado sesión para tener el session token

Resultado:

```yaml
{
  "error": false,
  "orders_quantity": 4,
  "orders": [
    {
      "id": 983,
      "uuid": "5b15d6da-f848-4daa-ae38-10c6a972933c",
      "paymethod_id": 3,
      "paymethod": "Paypal",
      "business_id": 150,
      "delivery_type": 1,
      "delivery_datetime": "2021-05-07 13:23:21",
      "app_id": "web",
      "created_at": "2021-07-14 17:58:19",
      "updated_at": "2021-07-15 00:38:05",
      "hash_key": "b86e5fd7865366asdfghjc08efcf90ecaa47d21",
      "products": [
        {
          "id": 1312,
          "product_id": 189104,
          "order_id": 983,
          "name": "BIBERÓN EVENFLO CLASSIC DE VIDRIO CON CAPACIDAD DE 4 OZ EMPAQUE 1 U",
          "price": 21.66,
          "quantity": 2,
          "comment": null,
          "ingredients": [],
          "options": [],
          "featured": false,
          "upselling": false,
          "in_offer": false,
          "offer_price": null,
          "images": "https://res.cloudinary.com/farmazone/image/upload/v1621023798/productos/7501027511065.png",
          "category_id": 1859,
          "total": 43
        }
      ],
      "business": {
        "id": 983,
        "name": "San Angel"
      }
      "customer": {
        "id": 983,
        "name": "Chucky Muneco",
        "lastname": null,
        "phone": null,
        "email": "chucky@yupi.com"
      },
    },
    ...
  ]
}
```


### Usuario olvidó su contraseña

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/forgotpassword

Ejemplo:

```yaml
{
  "email": "smartdog@canine.com",
}
```

Resultado:

```yaml
{
  "error": false,
  "result": "OK"
}
```

Y se envía un mail a su correo electrónico con un link de una URL


### Usuario cambia su contraseña

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/resetpassword

Ejemplo:

```yaml
{
  "code": "qw-5623d-rtyu",
  "random": "rtyu-56.ghjk",
  "password": "supersecreto123",
}
```

Resultado:

```yaml
{
  "error": false,
  "result": ["RESET_PASSWORD_SUCCESSFUL"]
}
```

Los campos ```code``` y ```random``` se obtienen de los queries de la URL recibida en el link del mail


### Obtener direcciones ingresadas por usuario

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getuseraddresses

Ejemplo:

```yaml
{
  "user_id": 712,
}
```

Resultado:

```yaml
{
  "data": [
    [
      {
        "address": "Av. Chimalhuacan 525 Col.Benito Juarez",
        "date": "2021-08-12T16:52:30.082Z"
      },
      {
        "address": "Santorini 45 Col Llaveros",
        "date": "2021-08-10T16:53:30.388Z"
      }
    ]
  ]
}
```


### Eliminar dirección de un usuario

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/removeuseraddress

Ejemplo:

```yaml
{
  "user_id": 737,
  "address": "Calle Lago Saraz 175. Col Hipodromo Condesa, CDMX"
}
```

Resultado: 

```yaml
{
  "error_code": 0,
  "msg": "Dirección borrada con éxito."
}
```


### Insertar nueva dirección de usuario

TIPO: POST

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/updateuseraddress

```yaml
{
  "user_id": 100,
  "address": "Camino del Herrero 5, Col. Sancho, Guanajuato, CDMX"
}
```
Resultado:

```yaml
{ 
    "error_code": 0,
    "msg": "Dirección actualizada con éxito" 
}
```


### Registrar usuario con su dirección

TIPO: POST

CONTENT-TYPE: application/json

URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/createuseraddress

Ejemplo:

```yaml
{
	"user_id": 1007,
	"address": "Camino del Sinaloense 65, Col. Sancho, Guanajuato, CDMX"
}
```

Resultado: 

```yaml
{
  "result_code": 0,
  "msg": "Usuario registrado con éxito."
}
```

### obtener Ordenes con un limite dinamico
 
TIPO: GET
CONTENT-TYPE: application/json
QUERYSTRINGPARAMETERS: business_id,limit
URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getorder

Ejemplo:

```yaml
{
  "business_id":152,
	"limit":5
}
```
Resultado:
respuesta 200
```yaml
{
{
  "data": [
    {
      "order": {
        "_id": "613c31dcbb272d000946a182",
        "payment_id": 1,
        "client": {
          "name": "Jorgito",
          "id": 810,
          "email": "jorgemc@dagsasc.com",
          "address": "Lafontaine, Polanco, Polanco III Secc, 11540 Ciudad de México, CDMX, México",
          "phone": "+525589784512",
          "logged": true,
          "token": false
        },
        "business_id": 152,
        "delivery": {
          "cost": 0,
          "delivered": false,
          "driver": "",
          "address": "Avenida de las Jacarandas, Col. Manolo, Michoacán, Mex",
          "notes": "Mi casa es de color azul",
          "addressee": ""
        },
        "products": [
          {
            "sku": 7502216930865,
            "quantity": 1
          },
          {
            "sku": 3664798027549,
            "quantity": 2
          },
          {
            "sku": 7501108763475,
            "quantity": 1
          },
          {
            "sku": 7501299309452,
            "quantity": 0
          },
          {
            "sku": 7501299308851,
            "quantity": 0
          }
        ],
        "status": 4,
        "price": 0,
        "id": "210119202104343606"
      }
    }
  ]
}
}

```

### Obtener ordenes por id de orden
 
TIPO: POST
CONTENT-TYPE: application/json
URL:https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getorder

Ejemplo:

```yaml
{
	"order_id": "210119202104343606"
}
```
Resultado:
respuesta 200
```yaml
{
  "data": [
    {
      "x": {
        "_id": "613c31dcbb272d000946a182",
        "payment_id": 1,
        "client": {
          "name": "Jorgito",
          "id": 810,
          "email": "jorgemc@dagsasc.com",
          "address": "Lafontaine, Polanco, Polanco III Secc, 11540 Ciudad de México, CDMX, México",
          "phone": "+525589784512",
          "logged": true,
          "token": false
        },
        "business_id": 152,
        "delivery": {
          "cost": 0,
          "delivered": false,
          "driver": "",
          "address": "Avenida de las Jacarandas, Col. Manolo, Michoacán, Mex",
          "notes": "Mi casa es de color azul",
          "addressee": ""
        },
        "products": [
          {
            "sku": 7502216930865,
            "quantity": 1
          },
          {
            "sku": 3664798027549,
            "quantity": 2
          },
          {
            "sku": 7501108763475,
            "quantity": 1
          },
          {
            "sku": 7501299309452,
            "quantity": 0
          },
          {
            "sku": 7501299308851,
            "quantity": 0
          }
        ],
        "status": 4,
        "price": 0,
        "id": "210119202104343606"
      }
    }
  ]
}
```


### Obtener ordenes por id de cliente
 
TIPO: GET
CONTENT-TYPE: application/json
QUERYSTRINGPARAMETERS: client_id
URL: https://hardcore-poitras-19aebd.netlify.app/.netlify/functions/getorderbyclient

Ejemplo:

```yaml
{
	"client_id": 810
}
```
Resultado:
respuesta 200
```yaml
{
	"data":[{
		"order":{
			"_id": "613c2b57f234510008a758d2",
        	"payment_id": 1,
			"client":{...},
			"business_id":152,
			"delivery":{...},
			"products": "[{\"sku\":7502216930865,\"quantity\":1},{\"sku\":3664798027549,\"quantity\":1},{\"sku\":7501108763475,\"quantity\":1}]",
        	"status": 4,
        	"price": 0,
        	"id": 90119202140647060
		},
		{"order":{...}},
		{"order":{...}}
	}
	]
}
```




### Obtener mesas por id de mesero
TIPO: POST

CONTENT-TYPE: application/json

URL: https://agitated-babbage-25cadb.netlify.app/.netlify/functions/gettablesbywaiter

Ejemplo:

```yaml
{
  "business_id":"411",
  "waiter_id":810
}
```
Resultado:
respuesta 200
```yaml
{
  "data": [
    {
      "table_id": 678,
      "active": true,
      "capacity": 4,
      "name": "Entrada",
      "reserved": true,
      "current_orders": []
    }
  ]
}
```


### Modificar el estatus de la orden
 
TIPO: POST
CONTENT-TYPE: application/json
URL: https://localhost:9000/updatestatusorder

Ejemplo:

```yaml
{
	"order_id":"201492021020435507",
	"email_client":"manuelhv@dagsasc.com",
	"status":1
}
```
Resultado:
respuesta 200
```yaml
{
  "error_code": 0,
  "msg": "Estatus actualizado con exito"
}
```
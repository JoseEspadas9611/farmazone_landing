# Integracion de frontend de Farmazone con API lambdas

## APIs en Netlify lambda conectadas a Mongo

### Obtener categorías de MongoDB

TIPO: GET

CONTENT-TYPE: application/json

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getmongocategories


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


### Consultar productos por id de categoría en MongoDB
 
TIPO: GET

CONTENT-TYPE: application/json
QUERYSTRINGPARAMETERS: category_id
URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getproductsbycategory

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



### Obtener negocio teniendo coordenadas de localización

TIPO: POST

CONTENT-TYPE: application/json

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/findbusiness

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getproductavailability

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getproductdetails

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

### Registrar nuevo usuario Ordering

TIPO: POST

CONTENT-TYPE: application/json

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/createuser

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

### Iniciar sesión como usuario Ordering

TIPO: POST

CONTENT-TYPE: application/json

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/login

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/createmongoorder

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


### Usuario olvidó su contraseña Ordering

TIPO: POST

CONTENT-TYPE: application/json

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/forgotpassword

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


### Usuario cambia su contraseña Ordering
 
TIPO: POST

CONTENT-TYPE: application/json

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/resetpassword

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getuseraddresses

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/removeuseraddress

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/updateuseraddress

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

URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/createuseraddress

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
URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getorder

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
URL:https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getorder

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
URL: https://quirky-kowalevski-2d10e5.netlify.app/.netlify/functions/getorderbyclient

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

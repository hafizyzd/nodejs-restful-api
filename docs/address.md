# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers : 
- Authorization : token 

Request Body:
```json
{
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code": "kode pos"
}
```
Reponse Body Success:

Request Body:
```json
{
    "data" : {
        "id" : 1,
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "kode pos"
    }
}
```

Reponse Body Error:

```json
{
    "errors" : "Country is required"
}
```

## Update Addres API

Endpoint : PUT /api/contacts/:contactID/addresses/:addressId

Headers : 
- Authorization : token 

Request Body:
```json
{
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code": "kode pos"
}
```

Reponse Body Success:
```json
{
    "data" : {
        "id" : 1,
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "kode pos"
    }
}
```

Reponse Body Error:

```json
{
    "errors" : "Country is required"
}
```

## Get Address API 

Endpoint : GET/api/contacts/:contactId/addresses/:addressId

Headers : 
- Authorization : token 

Reponse Body Success:
```json
{
    "data" : {
        "id" : 1,
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "kode pos"
    }
}
```

Reponse Body Error:
```json
{
    "errors" : "Contact is not found"
}
```

## List Address API 

Endpoint : GET /api/contacts/:contactId/addresses

Headers : 
- Authorization : token 

Reponse Body Success:

```json
{
    "data": [
        {
            "id" : 1,
            "street" : "jalan apa",
            "city" : "kota apa",
            "province" : "provinsi apa",
            "country" : "negara apa",
            "postal_code": "kode pos"
        },
        {
            "id" : 1,
            "street" : "jalan apa",
            "city" : "kota apa",
            "province" : "provinsi apa",
            "country" : "negara apa",
            "postal_code": "kode pos"
        }
    ]
}
```
Reponse Body Error:
```json
{
    "errors" : "Contact is not found"
}
```

## Remove Address API 

Endpoint : DELETE /api/contacts/:contactId/addresses:addressId

Headers : 
- Authorization : token 

Reponse Body Success:
```json
{
    "data" : "OK"
}
```
Reponse Body Error:

```json
{
    "errors" : "Contact is not found"
}
```
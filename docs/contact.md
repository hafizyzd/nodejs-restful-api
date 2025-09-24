# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers: 
-Authorization : token 

Request Body:

```json
{
    "first_name" : "Hafiz",
    "last_name" : "Yazid",
    "email" : "hafiz@gmail.com",
    "pohone" : "6282375151"
}
```

Reponse Body Success:
```json
{
    "data":{
        "id" : 1,
        "first_name" : "Hafiz",
        "last_name" : "Yazid",
        "email" : "hafiz@gmail.com",
        "pohone" : "6282375151"
    }
}
```
Reponse Body Error:

```json
{
    "errors" : "email is not valid format"
}
```


## Update ConTact API

Endpoint : PUT /api/contacts/:id

Headers: 
-Authorization : token 

Request Body:

```json
{
    "first_name" : "Hafiz",
    "last_name" : "Yazid",
    "email" : "hafiz@gmail.com",
    "pohone" : "6282375151"
}
``` 
Reponse Body Success:

```json
{
    "data":{
        "id" : 1,
        "first_name" : "Hafiz",
        "last_name" : "Yazid",
        "email" : "hafiz@gmail.com",
        "pohone" : "6282375151"
    }
}
```

Reponse Body Error:
```json
{
    "errors" : "email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:ID

Headers: 
-Authorization : token 

Reponse Body Success:
```json
{
    "data":{
        "id" : 1,
        "first_name" : "Hafiz",
        "last_name" : "Yazid",
        "email" : "hafiz@gmail.com",
        "pohone" : "6282375151"
    }
}
```

Reponse Body Error:
```json
{
    "errors" : "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers: 
-Authorization : token 

Quert params:
- name : Search by first_name or last_name, using LIKE, optional
- email : Search by email using LIKE, optional
- phone : Search by phone using LIKE, optional
- page : number of page dafault 1 
- size : size per page, dafault 10

Reponse Body Success:
```json
{
    "data" : [
        {
            "id" : 1,
            "first_name" : "Hafiz",
            "last_name" : "Yazid",
            "email" : "hafiz@gmail.com",
            "pohone" : "6282375151"
        },
        {
            "id" : 2,
            "first_name" : "Hafiz",
            "last_name" : "Yazid",
            "email" : "hafiz@gmail.com",
            "pohone" : "6282375151"
        },
    ],
    "paging" :{
        "page" : 1,
        "total_page" : 3,
        "total_item": 30
    }
}
```

Reponse Body Error:


## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers: 
-Authorization : token 

Reponse Body Success:
```json
{
    "data" : "OK"
}
```
Reponse Body Error:
```json
{
    "errors" : "contact is not found"
}

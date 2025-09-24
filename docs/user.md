# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body : 

```json
{
    "username" : "hym",
    "password" : "rasasia",
    "name" : "Yazid Muhammad"
} 
```
Reponse Body Success: 

```json
{
    "data" : {
        "username" : "hym",
        "name" : "Yazid Muhammad"
    }
} 
```

Reponse Body Error: 

```json
{
    "erros" : "username already registed"
} 
```

## Login User API

Endpoint : POST /api/users/login

Request Body : 
```json
{
    "username" : "hym",
    "password" : "rahasia"
}    
```

Reponse Body Success: 
```json
{
    "data" : {
        "token" : "unique-token"
    }
} 
```
Response Body Error:

```json
{
    "errors" : "username or password wrong"
}
```


## Update User API

Endpoint: PATCH /api/users/current

Headers: 
- Authorization : token

Request Body:
```json
{
    "name" : "Yazid" , //optional
    "password" : "new passwprd", //optional
}
```

Reponse Body Success: 

```json
{
    "data" : {
        "username" : "hym",
        "name" : "Yazid Muhammad Lagi"
    }
} 
```

Response Body Error:

```json
{
    "errors" : "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers: 
- Authorization : token 


Response Body Success :

```json
{
    "data" : {
        "username" : "hym",
        "name" : "Yazid Muhammad"
    }
}
```
Resonse Body Error :
```json
{
    "errors" : "Unauthorized"
}
```
## Logout User API

Endpoint : DELETE /api/users/logout

Headers: 
- Authorization : token 

Response Body Success:

```json
{
    "data": "OK"
}
```

Response Body Error: 

```json
{
    "errors" : "unauthorized"
}
```
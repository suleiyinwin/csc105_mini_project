# CSC105_mini Project_ mini Blog
This repository contain backend and frontend

## To run the frontend and backend in developmode 
For frontend, use
```
    npm run dev
```
For backend, use
```
    node index.js
```
# Mini Personal Blog App

### All of the responses will be wrapped with this data before sending
| Parameter | Type | Description |
|-----|:----:|:-----|
| success| boolean | the status of request|
| msg | string | message for each request |
| data | JSON | the actual data |

### Login

#### URL
`POST /login`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String|username|
|password|String| password|

Example
```
   {
     "email" : "test@gmail.com",
     "password" : "12"
   }


```


#### Success
Response

###### Status Code
` 200`  login success
#### Response Body
| Parameter | Type | Description |
|----------|:-------------:|:------|
|email|String| user email
|username|String| username
|id|String| user id


Example
```
{
   "email":"test@gmail.com",
   "username":"test",
   "id" : "1",
   
}

```
**noted: If success, the Response will be sent with cookie named UserToken**
### Register

#### URL
`POST /register`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String|username |
|email| String | email |
|password|String| password|

Example
```
   {
    "email":"test@gmail.com",
    "username":"test",
     "password" : "12"
   }


```

#### Success

###### Status Code
` 200`  register success

no response body

### get logged in user

#### URL
`GET /me`

#### Request Body 
No Request Body


#### Success

###### Status Code
` 200`  got data

| Parameter | Type | Description |
|----------|:-------------:|:------|
|email|String| user email
|username|String| username
|id|String| user id

Example
```
{
   "email":"test@gmail.com",
   "username":"test",
   "id" : "1",
}

```

### getPostsByuser 

#### URL
`GET /post`

#### Request Body 
No Request Body

#### Success

###### Status Code
` 200`  found posts

Response

| Parameter | Type | Description |
|----------|:-------------:|:------|
| no parameter | Array of post | all posts related to user |

#### post
the post object
| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of post |
| userId | string | id of user |
| title | string | title of post |
| category | string | title of category |
| description | string | title of description |
| updatedAt | DateTime | latest updated time |
| createdAt | DateTime | create Time |

Example
```
[
    {
        "id" : "1",
        "userId" : "1",
        "title" : "this is title",
        "category":"this is category",
        "description":"this is description",
        "updatedAt" : "2023-04-25T14:58:58.264Z",
        "createdAt" : "2023-04-25T14:58:58.264Z",
    }
]

```
###View Post Detail

Response 
| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of post |
| userId | string | id of user |
| title | string | title of post |
| category | string | title of category |
| description | string | title of description |
| updatedAt | DateTime | latest updated time |
| createdAt | DateTime | create Time |

### Create Post


#### URL
`POST /post`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
| title | string | title of post |
| category | string | title of category |
| description | string | title of description |

#### Success
Response

###### Status Code
` 200`  success

| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of post |
| userId | string | id of user |
| title | string | title of post |
| category | string | title of category |
| description | string | title of description |
| updatedAt | DateTime | latest updated time |
| createdAt | DateTime | create Time |

Example
```
    {
        "id" : "1",
        "userId" : "1",
        "title" : "this is title",
        "category":"this is category",
        "description":"this is description",
        "updatedAt" : "2023-04-25T14:58:58.264Z",
        "createdAt" : "2023-04-25T14:58:58.264Z",
    }

```

### Edit post

#### URL
`PATCH /post`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of post |


#### Success
Response

###### Status Code
` 200`  success

| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of post |
| userId | string | id of user |
| title | string | title of post |
| category | string | title of category |
| description | string | title of description |
| updatedAt | DateTime | latest updated time |
| createdAt | DateTime | create Time |

Example
```
[
    {
        "id" : "1",
        "userId" : "1",
        "title" : "this is title",
        "category":"this is category",
        "description":"this is description",
        "updatedAt" : "2023-04-25T14:58:58.264Z",
        "createdAt" : "2023-04-25T14:58:58.264Z",
    }
]

```


### Delete post

#### URL
`DELETE /post/:postId`

### Parameter
| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | String | id of post
 
#### Request Body 
No Request Body

#### Success
Response

###### Status Code
` 200`  delete success

no response body


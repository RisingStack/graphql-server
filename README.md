# graphql-server
[ ![Codeship Status for RisingStack/graphql-server](https://codeship.com/projects/434da740-03bb-0133-00c5-7a6771ab2ee8/status?branch=master)](https://codeship.com/projects/89250)  
GraphQL server with Mongoose (MongoDB) and Node.js

## Like this? Check out our GraphQL ORM: [graffiti](https://github.com/RisingStack/graffiti)

**Example GraphQL query:**
```
user(id: "1") {
  name
  friends {
    name
  }
}
```

**Example response:**
```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "friends": [
        {
          "name": "Friend One"
        },
        {
          "name": "Friend Two"
        }]
      }
    }
  }
```

**Example GraphQL mutation:**
```
mutation updateUser($userId: String! $name: String!) {
  updateUser(id: $userId name: $name) {
    name
  }
}
```

## Used technologies

* GraphQL
* MongoDB with Mongoose
* Node/IO.js
* Babel

## How to start

You need `iojs` or >= `Node.js` v0.12.x

### install dependencies

```
npm install
```

### seed database
```
npm run seed
```

### start server
```
npm start
```

### run client
```
npm run client
```

## How to test

```
npm test
```

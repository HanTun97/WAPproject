const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bookstore CRUD REST API",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: 'Development server'
            },
        ],
        components: {
            schemas: {
                Login: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'User Account Name'
                        },
                        password: {
                            type: 'string',
                            description: 'User Account Password'
                        }
                    },
                    example: {
                        username: 'John',
                        password: '111'
                    }
                },
                Produts: {
                    parameters: {
                        name: 'auth',
                        in: 'header',
                        required: true,
                        type: 'string'
                    }
                }
            },
            responses: {
                200: {
                    description: '{"username": "John", "accessToken": "1-John-1685081526165"}',
                    contents: 'application/json'
                },
                401: {
                    description: '{"error": "Invalid username and password!"}',
                    contents: 'application/json'
                }
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
              }
        },
        security: [{
            ApiKeyAuth: []  //Bearer 1-John-1685083667037
          }]
    },
    apis: ['./routes/userRouter.js', './routes/productRouter.js'], // files containing annotations as above
}

module.exports = options


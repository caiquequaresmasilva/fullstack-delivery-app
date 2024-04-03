
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.3",
    "info": {
      "title": "Beer Delivery API",
      "description": "This API aims to manipulate delivery orders, users and products from a beer delivery web app.",
      "contact": {
        "name": "Caíque Quaresma Silva",
        "email": "caique.quaresma@gmail.com"
      },
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "https://my-delivery-app-api.vercel.app/",
        "description": "Vercel Deploy"
      }
    ],
    "paths": {
      "/user/login": {
        "post": {
          "summary": "User login",
          "description": "This route allows an user to log in and get the access token",
          "tag": [
            "User"
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "email",
                    "password"
                  ],
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email"
                    },
                    "password": {
                      "type": "string",
                      "format": "password"
                    }
                  }
                },
                "example": {
                  "email": "customer@customer.com",
                  "password": "customerCUSTOMER42"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/Token"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid login data"
            }
          }
        }
      },
      "/user": {
        "post": {
          "summary": "User register.Requires an admin authentication token to create a seller",
          "description": "This route allows the registration of a new user. Create a new admin is not allowed. Only an authenticated admin can create a new seller.",
          "tag": [
            "User"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                },
                "example": {
                  "name": "Customer",
                  "email": "customer@test.com",
                  "password": "customerTEST42",
                  "role": "customer"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "New user registered",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "$ref": "#/components/schemas/Token"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid user data format"
            },
            "403": {
              "description": "You are not allowed to perform this action"
            }
          }
        },
        "get": {
          "summary": "List of customers and seller.Requires an admin authentication token",
          "description": "This routes returns the list of customers ans seller. Requires an admin authentication token.",
          "tag": [
            "User"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid"
                        },
                        "name": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string",
                          "format": "email"
                        },
                        "role": {
                          "type": "string",
                          "$ref": "#/components/schemas/Role"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid authentication token"
            },
            "403": {
              "description": "You are not allowed to perform this action"
            }
          }
        }
      },
      "/user/{id}": {
        "delete": {
          "summary": "Delete user by id. Admin only.Requires authentication token",
          "description": "This route allows to delete a customer or seller. Admin access only.Requires authentication token",
          "tag": [
            "User"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "User id for delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  },
                  "example": {
                    "message": "User deleted"
                  }
                }
              }
            },
            "401": {
              "description": "Invalid authentication token"
            },
            "403": {
              "description": "You are not allowed to perform this action"
            }
          }
        }
      },
      "/order": {
        "post": {
          "summary": "Order creation.Customer only.Requires authentication token",
          "description": "This route allows the creation of a new delivery order by a customer.Requires authentication token",
          "tag": [
            "Order"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Order"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Order created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid order data format"
            },
            "401": {
              "description": "Invalid authentication token"
            },
            "403": {
              "description": "You are not allowed to perform this action"
            }
          }
        },
        "get": {
          "summary": "List of orders available for a seller or customer.Requires authentication token",
          "description": "This routes returns the list of orders. Requires authentication token",
          "tag": [
            "Order"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer"
                        },
                        "deliveryAddress": {
                          "type": "string"
                        },
                        "deliveryNumber": {
                          "type": "string"
                        },
                        "totalPrice": {
                          "type": "number"
                        },
                        "saleDate": {
                          "type": "string",
                          "format": "date"
                        },
                        "status": {
                          "type": "string",
                          "$ref": "#/components/schemas/Status"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid authentication token"
            }
          }
        }
      },
      "/order/{id}": {
        "get": {
          "summary": "Return order details by id. Requires authentication token",
          "description": "This route returns the order details of a customer or seller. Requires authentication token",
          "tag": [
            "Order"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Order id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "totalPrice": {
                        "type": "number"
                      },
                      "saleDate": {
                        "type": "string",
                        "format": "date"
                      },
                      "status": {
                        "type": "string",
                        "$ref": "#/components/schemas/Status"
                      },
                      "customer": {
                        "type": "string"
                      },
                      "seller": {
                        "type": "string"
                      },
                      "products": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "quantity": {
                              "type": "integer"
                            },
                            "name": {
                              "type": "string"
                            },
                            "price": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid authentication token"
            },
            "404": {
              "description": "Order not found"
            }
          }
        },
        "patch": {
          "summary": "Update order status. Requires authentication token",
          "description": "This route allows to update an order status following the sequence: 'Pending'->'Preparing'->'Moving'->'Delivered'. Sellers can't update to 'Delivered'. Customers can update just to 'Delivered' when available. Requires authentication token",
          "tag": [
            "Order"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Order id",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "$ref": "#/components/schemas/Status"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Order created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "example": {
                      "message": "Order updated"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Incorrect status update attempt"
            },
            "401": {
              "description": "Invalid authentication token"
            },
            "403": {
              "description": "You are not allowed to perform this action"
            },
            "404": {
              "description": "Order not found"
            }
          }
        }
      },
      "/product": {
        "get": {
          "summary": "List of products available.Requires authentication token",
          "description": "This routes returns the list of products. Requires authentication token",
          "tag": [
            "Product"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "$ref": "#/components/schemas/Product"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid authentication token"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Role": {
          "type": "string",
          "enum": [
            "customer",
            "seller",
            "admin"
          ]
        },
        "Status": {
          "type": "string",
          "enum": [
            "Pending",
            "Preparing",
            "Moving",
            "Delivered"
          ]
        },
        "User": {
          "type": "object",
          "required": [
            "name",
            "email",
            "password",
            "role"
          ],
          "properties": {
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string",
              "format": "email"
            },
            "password": {
              "type": "string",
              "format": "password"
            },
            "role": {
              "type": "string",
              "$ref": "#/components/schemas/Role"
            }
          }
        },
        "Token": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "token": {
              "type": "string"
            },
            "role": {
              "type": "string",
              "$ref": "#/components/schemas/Role"
            }
          }
        },
        "Product": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid"
            },
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "imagePath": {
              "type": "string"
            }
          }
        },
        "Order": {
          "type": "object",
          "required": [
            "sellerId",
            "deliveryAddress",
            "deliveryNumber",
            "totalPrice",
            "products"
          ],
          "properties": {
            "sellerId": {
              "type": "string",
              "format": "uuid"
            },
            "deliveryAddress": {
              "type": "string"
            },
            "deliveryNumber": {
              "type": "string"
            },
            "totalPrice": {
              "type": "number"
            },
            "products": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid"
                  },
                  "quantity": {
                    "type": "integer"
                  }
                }
              }
            }
          }
        }
      },
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}


export function schema(min) {

  const schema = {
    "type": "object",
    "properties": {
      "users": {
        "type": "array",
        "minItems": min,
        "maxItems": min,
        "items": {
          "type": "object",
          "properties": {
            "firstname": {
              "type": "string",
              "faker": "name.firstName"
            },
             "middlename": {
                "type": "string",
                "faker": "name.firstName"
              },
            "lastname": {
              "type": "string",
              "faker": "name.lastName"
            },
            "dateofbirth": {
              "type": "string",
              "faker": "date.past"
            },
              "type": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 1
                }
          },
          "required": ["firstname", "middlename", "lastname", "dateofbirth", "type"]
        }
      }
    },
    "required": ["users"]
  };
  
return schema;
}

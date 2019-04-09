define({ "api": [
  {
    "type": "post",
    "url": "v1/auth/login",
    "title": "Login",
    "description": "<p>Get an accessToken</p>",
    "version": "1.0.0",
    "name": "Login",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token.tokenType",
            "description": "<p>Access Token's type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token.accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token.refreshToken",
            "description": "<p>Token to get a new accessToken after expiration time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "token.expiresIn",
            "description": "<p>Access Token's expiration time in miliseconds</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "user.createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Incorrect email or password</p>"
          }
        ]
      }
    },
    "filename": "src/api/services/auth/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/auth/signUp",
    "title": "Sign Up",
    "description": "<p>Sign Up a new user</p>",
    "version": "1.0.0",
    "name": "Sign_Up",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "userType",
            "description": "<p>User's userType</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "sendMeSkillShapeNotification",
            "description": "<p>User's notification choice</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "signUpType",
            "description": "<p>User's Sign up  type</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "birthYear",
            "description": "<p>User's Birth Year</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "token.tokenType",
            "description": "<p>Access Token's type</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "token.accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "token.refreshToken",
            "description": "<p>Token to get a new accessToken after expiration time</p>"
          },
          {
            "group": "Created 201",
            "type": "Number",
            "optional": false,
            "field": "token.expiresIn",
            "description": "<p>Access Token's expiration time in miliseconds</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "token.timezone",
            "description": "<p>The server's Timezone</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Created 201",
            "type": "Date",
            "optional": false,
            "field": "user.createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ]
      }
    },
    "filename": "src/api/services/auth/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/schools/getSchools",
    "title": "Get Schools List",
    "description": "<p>Get a list of Schools</p>",
    "version": "1.0.0",
    "name": "Get_School_List",
    "group": "Schools",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "schoolName",
            "description": "<p>Name of the School</p>"
          },
          {
            "group": "Parameter",
            "type": "[Number]",
            "optional": true,
            "field": "coords",
            "description": "<p>Coordinates of the class type location</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": true,
            "field": "skillCategoryIds",
            "description": "<p>Skill category ids</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": true,
            "field": "skillSubjectIds",
            "description": "<p>Skill subject ids</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "experienceLevel",
            "description": "<p>experience required in class type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender of users in class type</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "age",
            "description": "<p>User's age in class</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "locationName",
            "description": "<p>Class type location</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>List of School.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ]
      }
    },
    "filename": "src/api/services/schools/school.route.js",
    "groupTitle": "Schools"
  },
  {
    "type": "post",
    "url": "v1/classTypes/getClassTypes",
    "title": "Get Class Types",
    "description": "<p>Get a list of class types</p>",
    "version": "1.0.0",
    "name": "Get_Class_Types",
    "group": "classTypes",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "schoolName",
            "description": "<p>Name of the School</p>"
          },
          {
            "group": "Parameter",
            "type": "[Number]",
            "optional": true,
            "field": "coords",
            "description": "<p>Coordinates of the class type location</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": true,
            "field": "skillCategoryIds",
            "description": "<p>Skill category ids</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": true,
            "field": "skillSubjectIds",
            "description": "<p>Skill subject ids</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "experienceLevel",
            "description": "<p>experience required in class type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender of users in class type</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "age",
            "description": "<p>User's age in class</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "locationName",
            "description": "<p>Class type location</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>List of class Types.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ]
      }
    },
    "filename": "src/api/services/classTypes/classType.route.js",
    "groupTitle": "classTypes"
  }
] });

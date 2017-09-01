import path from 'path';

const APP_NAME = `your-app-name`;
const DB_NAME = `your-app-name-dev`;
const CLIENT = '/client';

export default {
  secret: `your_secret_key`, // Secret Key
  server: { // Express
    ip: 'localhost',
    port: 8000,
  },
  io: { // Socket.io
    port: 8001, // public port listen
    example: true, // router -> http://localhost:8000/socket
    redis: { // Redis config
      host: '127.0.0.1',
      port: 6379
    }
  },
  'redis-jwt': { // Sessions
    //host: '/tmp/redis.sock', //unix domain
    host: '127.0.0.1', //can be IP or hostname
    port: 6379, // port
    maxretries: 10, //reconnect retries, default 10
    //auth: '123', //optional password, if needed
    db: 0, //optional db selection
    secret: 'secret_key', // secret key for Tokens!
    multiple: false, // single or multiple sessions by user
    KEA: true // Enable notify-keyspace-events KEA
  },
  mongoose: { // MongoDB
    // uri: mongodb://username:password@host:port/database?options
    uri: `mongodb://localhost:27017/${DB_NAME}`,
    options: {
      useMongoClient: true
    },
    seeds: [
      {
        path: '/api/models/seeds/user',
        plant: 'alway' //  once - alway - never
      }, {
        path: '/api/models/seeds/hello',
        plant: 'alway'
      }
    ]
  },
  // Roles: if a user has multiple roles, will take the time of the greater role
  roles: [
    {
      role: 'user',
      time: 60, // minutes
    }, {
      role: 'admin',
      time: 'infinite'
    }
  ],
  path: {
    disabled: '/:url(api|auth|assets|lib)/*' // paths 404
  },
  email: { // Email
    host: 'hostexample',
    secure: true,
    port: 465,
    auth: {
      user: 'example@gmail.com',
      pass: 'examplePassword'
    }
  },
  swagger: { // Swagger
    enabled: true, // router -> http://localhost:8000/docs/
    info: {
      version: 'v1.0',
      title: APP_NAME,
      description: `RESTful API ${APP_NAME}`,
      "contact": {
        "name": "Developer",
        "url": "http://www.example.com",
        "email": "example@example.com"
      },
      "license": {
        "name": "MIT",
        "url": "https://github.com/kevoj/nodetomic-api/blob/master/LICENSE"
      }
    }
  },
  oAuth: { // oAuth
    local: {
      enabled: true
    },
    facebook: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/facebook/callback'
    },
    twitter: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/twitter/callback'
    },
    google: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/google/callback'
    },
    github: {
      enabled: true,
      clientID: '52be92c9a41f77a959eb',
      clientSecret: '76c9bb03c689d098506822fa80dba372a1fe29c8',
      callbackURL: '/auth/github/callback'
    },
    bitbucket: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/bitbucket/callback'
    }
  },
  // globals
  mode: process.env.NODE_ENV || 'development', // mode
  name: APP_NAME, // name 
  node: parseInt(process.env.NODE_APP_INSTANCE) || 0, // node instance
  root: path.normalize(`${__dirname}/../..`), // root
  base: path.normalize(`${__dirname}/..`), // base
  client: `${path.normalize(`${__dirname}/../..`)}${CLIENT}`, // client
  log: true // logs
};

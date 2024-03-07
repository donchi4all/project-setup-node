import secret from '../modules/secret';
import defaults from "./defaults";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  dirs: {
    api: 'api',
    public: 'public',
    migrations: 'migrations/compiled',
  },

  got: {
    retry: {
      limit: 3,
      methods: ['GET', 'PUT', 'DELETE'],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
    timeout: 500000,
  },

  swagger: {
    route: '/api/docs',
  },

  client: {
    resetPassword: '/new-password'
  },

  corsOptions: {
    origin: secret.Cors.origin,
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Accept',
      'Content-Length',
      'Content-Type',
      'Authorization',
      'boundary',
      'VFDBankAuth',
      'API-Key',
    ],
    credentials: true,
    preflightContinue: false,
  },
  rbacConfig: {
    mysqlConfig: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 3306,
      username: process.env.DB_USERNAME
    }
  },
  defaults
};
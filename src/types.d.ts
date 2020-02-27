import {IUser} from './models/User';

declare global {
  namespace Express {
    export interface User extends IUser {}
  }

  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'test' | 'dev' | 'production';
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      PORT: string;
      MONGODB_URI: string;
      MONGODB_URI_TEST: string;
      GOOGLE_APPLICATION_CREDENTIALS_JSON: string;
      FIREBASE_DB_URL: string;
    }
  }
}

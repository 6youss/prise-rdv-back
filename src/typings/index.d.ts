import { IUser } from "../models/User";

declare global {
  namespace Express {
    export interface User extends IUser {}
  }

  namespace NodeJS {
    export interface ProcessEnv {
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      PORT: string;
      MONGODB_URI_LOCAL: string;
    }
  }
  type FieldError = string;
  type FieldErrors = Record<string, FieldError>;
}

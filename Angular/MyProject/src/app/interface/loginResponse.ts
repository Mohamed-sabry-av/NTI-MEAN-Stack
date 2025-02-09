import { User } from "./auth";

export interface LoginResponse {
    accessToken: string;
    user: User; 
    userType:string;
    roleName:string;
    userId:string;
  }
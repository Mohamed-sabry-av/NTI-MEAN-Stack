export interface User{
    length?: number;
    _id?: string;
    fullName?: string;
    name?: string;
    email: string;
    password: string;
    userType: string|UserType;   
    createdAt?: string;
    updatedAt?: string;
}

export interface UserType{
    _id: string;
    name: string;
    RoleDetails?: string;
    createdAt?: string;
    updatedAt?: string;
}
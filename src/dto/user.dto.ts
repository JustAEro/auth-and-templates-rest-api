export type UserResponse = {
    id: string;
    name: string;
    email: string;
    role: string;
}

export type CreateUser = { 
  name: string, 
  email: string, 
  password: string, 
  role: string; 
}
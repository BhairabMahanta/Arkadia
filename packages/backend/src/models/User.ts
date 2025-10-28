export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  createdAt: Date;
}

export type UserInput = Omit<User, 'id' | 'createdAt'>;
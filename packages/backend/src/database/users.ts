import bcrypt from 'bcrypt';
import { User, UserInput } from '../models/User';

// Simple in-memory database for now
export class UserDatabase {
  private users: Map<string, User> = new Map();
  private emailIndex: Map<string, string> = new Map(); // email -> userId
  private usernameIndex: Map<string, string> = new Map(); // username -> userId

  async createUser(userInput: UserInput): Promise<User> {
    // Check if email or username already exists
    if (this.emailIndex.has(userInput.email)) {
      throw new Error('Email already exists');
    }
    if (this.usernameIndex.has(userInput.username)) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    const newUser: User = {
      ...userInput,
      id: Date.now().toString(),
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.set(newUser.id, newUser);
    this.emailIndex.set(newUser.email, newUser.id);
    this.usernameIndex.set(newUser.username, newUser.id);

    return newUser;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    const userId = this.emailIndex.get(email);
    return userId ? this.users.get(userId) : undefined;
  }

  getUserByUsername(username: string): User | undefined {
    const userId = this.usernameIndex.get(username);
    return userId ? this.users.get(userId) : undefined;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // Return user without password
  sanitizeUser(user: User): Omit<User, 'password'> {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}
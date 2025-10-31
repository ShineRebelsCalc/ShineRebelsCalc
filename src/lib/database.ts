import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: string;
  is_demo: boolean;
}

export interface UserSession {
  id: number;
  email: string;
  name: string;
  is_demo: boolean;
}

class AuthDatabase {
  private db: Database.Database;
  private JWT_SECRET = 'brewing-calculator-secret-key-2024';

  constructor() {
    this.db = new Database('users.db');
    this.initializeDatabase();
    this.createDemoAccount();
  }

  private initializeDatabase() {
    // Create users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_demo BOOLEAN DEFAULT FALSE
      )
    `);

    // Create user_profiles table for future use
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        profile_name TEXT NOT NULL,
        profile_data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
  }

  private createDemoAccount() {
    const demoEmail = 'demo@brewingcalc.com';
    const existingDemo = this.db.prepare('SELECT id FROM users WHERE email = ?').get(demoEmail);
    
    if (!existingDemo) {
      const hashedPassword = bcrypt.hashSync('demo123', 10);
      this.db.prepare(`
        INSERT INTO users (email, password, name, is_demo)
        VALUES (?, ?, ?, ?)
      `).run(demoEmail, hashedPassword, 'Demo User', true);
    }
  }

  async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string; user?: UserSession }> {
    try {
      // Check if user already exists
      const existingUser = this.db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (existingUser) {
        return { success: false, message: 'User already exists with this email' };
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert new user
      const result = this.db.prepare(`
        INSERT INTO users (email, password, name)
        VALUES (?, ?, ?)
      `).run(email, hashedPassword, name);

      const user: UserSession = {
        id: result.lastInsertRowid as number,
        email,
        name,
        is_demo: false
      };

      return { success: true, message: 'User registered successfully', user };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: UserSession; token?: string }> {
    try {
      const user = this.db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User;
      
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return { success: false, message: 'Invalid email or password' };
      }

      const userSession: UserSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        is_demo: user.is_demo
      };

      const token = jwt.sign(userSession, this.JWT_SECRET, { expiresIn: '7d' });

      return { 
        success: true, 
        message: 'Login successful', 
        user: userSession,
        token 
      };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  }

  async loginDemo(): Promise<{ success: boolean; message: string; user?: UserSession; token?: string }> {
    return this.login('demo@brewingcalc.com', 'demo123');
  }

  verifyToken(token: string): UserSession | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as UserSession;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  getUserById(id: number): User | null {
    try {
      return this.db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User;
    } catch (error) {
      return null;
    }
  }
}

export const authDb = new AuthDatabase();
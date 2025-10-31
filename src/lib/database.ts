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
  private STORAGE_KEY = 'brewing_calc_users';
  private SESSION_KEY = 'brewing_calc_session';

  constructor() {
    this.initializeDatabase();
    this.createDemoAccount();
  }

  private initializeDatabase() {
    // Initialize localStorage if it doesn't exist
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private hashPassword(password: string): string {
    // Simple hash function for demo purposes
    // In production, use a proper hashing library
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  private verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  private generateToken(user: UserSession): string {
    // Simple token generation for demo purposes
    const tokenData = {
      ...user,
      timestamp: Date.now(),
      expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    return btoa(JSON.stringify(tokenData));
  }

  private createDemoAccount() {
    const users = this.getUsers();
    const demoEmail = 'demo@brewingcalc.com';
    const existingDemo = users.find(user => user.email === demoEmail);
    
    if (!existingDemo) {
      const hashedPassword = this.hashPassword('demo123');
      const demoUser: User = {
        id: Date.now(),
        email: demoEmail,
        password: hashedPassword,
        name: 'Demo User',
        created_at: new Date().toISOString(),
        is_demo: true
      };
      users.push(demoUser);
      this.saveUsers(users);
    }
  }

  async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string; user?: UserSession }> {
    try {
      const users = this.getUsers();
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return { success: false, message: 'User already exists with this email' };
      }

      // Hash password
      const hashedPassword = this.hashPassword(password);

      // Create new user
      const newUser: User = {
        id: Date.now(),
        email,
        password: hashedPassword,
        name,
        created_at: new Date().toISOString(),
        is_demo: false
      };

      users.push(newUser);
      this.saveUsers(users);

      const userSession: UserSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        is_demo: newUser.is_demo
      };

      return { success: true, message: 'User registered successfully', user: userSession };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: UserSession; token?: string }> {
    try {
      const users = this.getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      const isValidPassword = this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return { success: false, message: 'Invalid email or password' };
      }

      const userSession: UserSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        is_demo: user.is_demo
      };

      const token = this.generateToken(userSession);

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
      const tokenData = JSON.parse(atob(token));
      
      // Check if token is expired
      if (Date.now() > tokenData.expires) {
        return null;
      }

      return {
        id: tokenData.id,
        email: tokenData.email,
        name: tokenData.name,
        is_demo: tokenData.is_demo
      };
    } catch (error) {
      return null;
    }
  }

  getUserById(id: number): User | null {
    try {
      const users = this.getUsers();
      return users.find(user => user.id === id) || null;
    } catch (error) {
      return null;
    }
  }
}

export const authDb = new AuthDatabase();
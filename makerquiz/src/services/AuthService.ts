const API_URL = 'https://glowing-memory-7vp59x5xjv7v3xwvq-8000.app.github.dev/api';

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean; 
  token: string | null;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, password2: string, email: string) => Promise<void>;
  logout: () => void;
}

class AuthService {
  login(username: string, password: string): Promise<LoginResponse> {
    return fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      });
  }

  register(username: string, password: string, password2: string, email: string): Promise<any> {
    return fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, password2, email }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      });
  }

  logout(): Promise<any> {
    return fetch(`${API_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
    }).then(response => response.json());
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();

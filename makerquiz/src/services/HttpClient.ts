import AuthService from './AuthService';

export const httpClient = {
  async get(url: string) {
    return this.request(url, 'GET');
  },

  async post(url: string, body?: any) {
    return this.request(url, 'POST', body);
  },

  async put(url: string, body?: any) {
    return this.request(url, 'PUT', body);
  },

  async delete(url: string) {
    return this.request(url, 'DELETE');
  },

  async request(url: string, method: string = 'GET', body?: any) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = AuthService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
      // Token expirou, limpar e redirecionar para login
      AuthService.clearTokens();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw error;
    }

    return response.json().catch(() => ({}));
  },
};

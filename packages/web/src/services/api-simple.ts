// Simple API client without external dependencies
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Client Configuration
const API_BASE_URL = 'http://localhost:3001';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// API Endpoints
export const contactApi = {
  submitContact: async (data: ContactFormData) => {
    return apiClient.post('/api/contact', data);
  },
};

// Future API endpoints
export const projectsApi = {
  getProjects: async () => {
    return apiClient.get('/api/projects');
  },
  getProject: async (id: string) => {
    return apiClient.get(`/api/projects/${id}`);
  },
};

export const reviewsApi = {
  getReviews: async () => {
    return apiClient.get('/api/reviews');
  },
};

export default apiClient;

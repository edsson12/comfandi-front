import { API_URL } from "../config";

/* eslint-disable @typescript-eslint/no-explicit-any */
class HttpInterceptor {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request(method: string, endpoint: string, body?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  public get(endpoint: string) {
    return this.request("GET", endpoint);
  }

  public post(endpoint: string, body: any) {
    return this.request("POST", endpoint, body);
  }

  public put(endpoint: string, body: any) {
    return this.request("PUT", endpoint, body);
  }

  public delete(endpoint: string) {
    return this.request("DELETE", endpoint);
  }
}

const api = new HttpInterceptor(API_URL);

export default api;

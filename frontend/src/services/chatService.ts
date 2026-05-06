import axios, { AxiosResponse } from 'axios';
import {
  ChatResponse,
  ThreadResponse,
  HistoryResponse,
  HealthResponse,
  ServiceInfoResponse,
  ChatRequest,
  NewThreadRequest
} from '@/types/chat';

class ChatService {
  private baseURL: string;
  private axiosInstance;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://fastapi-app-1061397264130.us-central1.run.app';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data?.detail) {
          throw new Error(error.response.data.detail);
        }
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - please try again');
        }
        if (error.code === 'ERR_NETWORK') {
          throw new Error('Network error - please check your connection');
        }
        throw new Error(error.message || 'An unexpected error occurred');
      }
    );
  }

  async sendMessage(message: string, passengerId: string, threadId?: string | null): Promise<ChatResponse> {
    try {
      const payload: ChatRequest = {
        message,
        passenger_id: passengerId,
        thread_id: threadId,
      };

      const response: AxiosResponse<ChatResponse> = await this.axiosInstance.post('/chat', payload);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async createNewThread(initialMessage?: string): Promise<ThreadResponse> {
    try {
      const payload: NewThreadRequest = {};
      if (initialMessage) {
        payload.initial_message = initialMessage;
      }

      const response: AxiosResponse<ThreadResponse> = await this.axiosInstance.post('/chat/new', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating new thread:', error);
      throw error;
    }
  }

  async getConversationHistory(threadId: string): Promise<HistoryResponse> {
    try {
      const response: AxiosResponse<HistoryResponse> = await this.axiosInstance.get(`/chat/${threadId}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<HealthResponse> {
    try {
      const response: AxiosResponse<HealthResponse> = await this.axiosInstance.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }

  async getServiceInfo(): Promise<ServiceInfoResponse> {
    try {
      const response: AxiosResponse<ServiceInfoResponse> = await this.axiosInstance.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching service info:', error);
      throw error;
    }
  }

  async testSimpleChat(): Promise<unknown> {
    try {
      const response = await this.axiosInstance.post('/test/simple-chat');
      return response.data;
    } catch (error) {
      console.error('Error testing simple chat:', error);
      throw error;
    }
  }

  // Retry mechanism for failed requests
  async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw lastError;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError!;
  }

  // Check if the service is available
  async isServiceAvailable(): Promise<boolean> {
    try {
      await this.checkHealth();
      return true;
    } catch {
      return false;
    }
  }
}

export const chatService = new ChatService();
export default ChatService;
import axios from 'axios'
import { chatService } from '@/services/chatService'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Mock axios instance
const mockAxiosInstance = {
  post: jest.fn(),
  get: jest.fn(),
  interceptors: {
    response: {
      use: jest.fn(),
    },
  },
}

describe('ChatService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedAxios.create.mockReturnValue(mockAxiosInstance as never)
  })

  describe('sendMessage', () => {
    it('sends message successfully', async () => {
      const mockResponse = {
        data: {
          response: 'Your flight is at 2:30 PM',
          thread_id: 'test-thread-id',
          timestamp: '2025-01-15T10:30:00Z',
          tool_calls: [],
        },
      }

      mockAxiosInstance.post.mockResolvedValue(mockResponse)

      const result = await chatService.sendMessage(
        'What time is my flight?',
        '3442 587242',
        'test-thread-id'
      )

      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('createNewThread', () => {
    it('creates new thread successfully', async () => {
      const mockResponse = {
        data: {
          thread_id: 'new-thread-id',
          timestamp: '2025-01-15T10:30:00Z',
        },
      }

      mockAxiosInstance.post.mockResolvedValue(mockResponse)

      const result = await chatService.createNewThread('Hello')

      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('checkHealth', () => {
    it('checks health successfully', async () => {
      const mockResponse = {
        data: {
          status: 'healthy',
          database_connected: true,
          agent_ready: true,
          timestamp: '2025-01-15T10:30:00Z',
        },
      }

      mockAxiosInstance.get.mockResolvedValue(mockResponse)

      const result = await chatService.checkHealth()

      expect(result).toEqual(mockResponse.data)
    })
  })
})
export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
  result: unknown;
}

export type MessageContentType = 'text' | 'destination' | 'flight' | 'hotel' | 'itinerary';

export interface MessageContent {
  type: MessageContentType;
  data: unknown;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tool_calls?: ToolCall[] | null;
  contentType?: MessageContentType;
}

export interface ChatThread {
  id: string;
  title: string;
  date: string;
  messages: number;
}

export interface ChatResponse {
  response: string;
  thread_id: string;
  timestamp: string;
  tool_calls: ToolCall[];
}

export interface ThreadResponse {
  thread_id: string;
  timestamp: string;
}

export interface HistoryResponse {
  thread_id: string;
  messages: ChatMessage[];
  total_messages: number;
}

export interface HealthResponse {
  status: string;
  database_connected: boolean;
  agent_ready: boolean;
  timestamp: string;
}

export interface ServiceInfoResponse {
  service: string;
  version: string;
  status: string;
  description: string;
  endpoints: Record<string, string>;
  timestamp: string;
}

export interface ChatState {
  messages: ChatMessage[];
  currentThreadId: string | null;
  isLoading: boolean;
  error: string | null;
  passengerId: string;
  showSuggestions: boolean;
  isTyping: boolean;
  sidebarOpen: boolean;
}

export interface ChatActions {
  sendMessage: (message: string) => Promise<void>;
  startNewConversation: () => Promise<void>;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  setIsTyping: (typing: boolean) => void;
  hideSuggestions: () => void;
  showSuggestions: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export interface ApiError {
  detail: string;
  status?: number;
}

export interface ChatRequest {
  message: string;
  passenger_id: string;
  thread_id?: string | null;
}

export interface NewThreadRequest {
  initial_message?: string;
}
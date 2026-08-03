import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postChatMessage } from '../../services/api';

const DEFAULT_SUGGESTIONS = {
  HR: [
    "What is Lalitendra's current notice period?",
    "What roles is he open to?",
    "What are his salary expectations?",
    "Can you share his resume PDF?"
  ],
  Interviewer: [
    "Explain your experience with MERN stack",
    "How did you handle state management?",
    "Walk me through your most challenging project",
    "What's your experience with cloud platforms?"
  ],
  Student: [
    "How did you start your dev career?",
    "What resources do you recommend for React?",
    "What skills should I focus on in 2025?"
  ],
  Freelancer: [
    "What services do you offer?",
    "What's your typical project timeline?",
    "How do we start working together?"
  ]
};

// Async thunk to send chat message and get response
export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async ({ message }, { getState, rejectWithValue }) => {
    try {
      const { chat } = getState();
      // Prepare the history up to this point (excluding the message that is currently being sent, 
      // or we can include the user message since the thunk is triggered after adding it).
      // Let's pass the chatHistory from state, but wait, the user's message is already in chatHistory
      // when we send this request. Let's make sure chatHistory has the correct format: { role: string, content: string }.
      const chatHistory = chat.chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const data = await postChatMessage(message, chat.userType, chatHistory);
      return data; // returns { answer: string, suggested_questions: string[] }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch response from chatbot");
    }
  }
);

const initialState = {
  chatHistory: [
    {
      role: 'assistant',
      content: "Hi there! I am Lalitendra's AI assistant. Ask me anything about his technical experience, projects, or background."
    }
  ],
  userType: 'HR', // Default persona
  suggestions: DEFAULT_SUGGESTIONS['HR'],
  isOpen: false, // UI visibility
  isLoading: false,
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    setChatOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setUserType: (state, action) => {
      const newType = action.payload;
      if (DEFAULT_SUGGESTIONS[newType]) {
        state.userType = newType;
        state.suggestions = DEFAULT_SUGGESTIONS[newType];
        
        // Reset/refresh initial message when switching persona to keep it relevant
        let initialMsg = "Hi there! I am Lalitendra's AI assistant. Ask me anything about his technical experience.";
        if (newType === 'HR') {
          initialMsg = "Hello! I am Lalitendra's assistant. Feel free to ask about his notice period, resume, or salary expectations.";
        } else if (newType === 'Interviewer') {
          initialMsg = "Hi! Ready to dive deep into my tech stack, system design, or engineering projects? Ask me anything technical!";
        } else if (newType === 'Student') {
          initialMsg = "Hey there! Happy to share my learning journey, resources, or career guidance. Let's chat!";
        } else if (newType === 'Freelancer') {
          initialMsg = "Greetings! I'm here to discuss project requirements, timelines, services, and how we can collaborate. Let me know what you need!";
        }
        
        state.chatHistory = [
          { role: 'assistant', content: initialMsg }
        ];
      }
    },
    addUserMessage: (state, action) => {
      state.chatHistory.push({
        role: 'user',
        content: action.payload
      });
    },
    clearChatHistory: (state) => {
      state.chatHistory = [
        {
          role: 'assistant',
          content: `Hi there! I am Lalitendra's AI assistant. Ask me anything about his experience.`
        }
      ];
      state.suggestions = DEFAULT_SUGGESTIONS[state.userType];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatHistory.push({
          role: 'assistant',
          content: action.payload.answer
        });
        if (action.payload.suggested_questions && action.payload.suggested_questions.length > 0) {
          state.suggestions = action.payload.suggested_questions;
        }
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.chatHistory.push({
          role: 'assistant',
          content: "Sorry, I am having trouble connecting to my knowledge base right now. Please make sure the local server is running on http://localhost:8000."
        });
      });
  }
});

export const { toggleChat, setChatOpen, setUserType, addUserMessage, clearChatHistory } = chatSlice.actions;
export default chatSlice.reducer;

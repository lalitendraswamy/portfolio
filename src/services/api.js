const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Sends a chat message to the portfolio RAG chatbot.
 * 
 * @param {string} message - The message text.
 * @param {string} userType - The persona type (HR, Interviewer, Student, Freelancer).
 * @param {Array<{role: string, content: string}>} chatHistory - The list of previous messages in the conversation.
 * @returns {Promise<{answer: string, suggested_questions: string[]}>}
 */
export const postChatMessage = async (message, userType, chatHistory = []) => {
  const url = `${BASE_URL}/chat`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        message,
        user_type: userType,
        chat_history: chatHistory,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error inside postChatMessage API:", error);
    throw error;
  }
};

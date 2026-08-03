import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  toggleChat, 
  setUserType, 
  addUserMessage, 
  sendChatMessage, 
  clearChatHistory 
} from '../../redux/slices/chatSlice';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaSpinner, 
  FaTrashAlt, 
  FaCommentDots 
} from 'react-icons/fa';
import './VirtualAssistant.css';

export const VirtualAssistant = ({ isEmbed = false }) => {
  const dispatch = useDispatch();
  const { 
    chatHistory, 
    userType, 
    suggestions, 
    isOpen, 
    isLoading 
  } = useSelector((state) => state.chat);

  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);

  // Auto-scroll the messages container to the bottom when messages or typing state changes
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isLoading, isOpen]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    // Dispatch adding the user's message to Redux store
    dispatch(addUserMessage(messageText));
    setInput('');

    // Dispatch the thunk to trigger the chatbot API
    dispatch(sendChatMessage({ message: messageText }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Safe custom markdown helper to render basic formatting (* lists, **bold**, `code`)
  const parseMarkdown = (text) => {
    if (!text) return null;
    
    const lines = text.split("\n");
    const elements = [];
    let inList = false;
    let listItems = [];
    
    const parseInline = (line) => {
      // Escape HTML entities to prevent XSS
      let formatted = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      
      // Bold: **text**
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Inline code: `code`
      formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
      return formatted;
    };
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        const itemText = trimmed.substring(2);
        listItems.push(parseInline(itemText));
      } else {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`}>
              {listItems.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          );
          inList = false;
        }
        
        if (trimmed) {
          elements.push(
            <p key={index} dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
          );
        }
      }
    });
    
    if (inList) {
      elements.push(
        <ul key="list-end">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    }
    
    return elements;
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isEmbed && (
        <button 
          className="va-fab" 
          onClick={() => dispatch(toggleChat())}
          aria-label="Toggle AI Virtual Assistant"
        >
          {isOpen ? <FaTimes size={22} /> : <FaRobot size={26} />}
          {!isOpen && <span className="va-fab-badge" />}
        </button>
      )}

      {/* Chat Panel */}
      <div className={isEmbed ? 'va-panel-embed' : `va-panel ${isOpen ? 'va-panel-active' : 'va-panel-enter'}`}>
        
        {/* Header */}
        <div className="va-header">
          <div className="va-header-info">
            <div className="va-avatar">
              <FaRobot color="#fff" size={20} />
            </div>
            <div className="va-title-container">
              <h4>Lalitendra's Assistant</h4>
              <div className="va-status">
                <span className="va-status-dot" />
                <span>Online (AI Mode)</span>
              </div>
            </div>
          </div>
          
          <div className="va-header-actions">
            <button 
              className="va-header-btn" 
              onClick={() => dispatch(clearChatHistory())} 
              title="Clear Conversation"
            >
              <FaTrashAlt size={14} />
            </button>
            {!isEmbed && (
              <button 
                className="va-header-btn" 
                onClick={() => dispatch(toggleChat())} 
                title="Close Chat"
              >
                <FaTimes size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Persona Tabs */}
        <div className="va-persona-selector">
          {['HR', 'Interviewer', 'Student', 'Freelancer'].map((persona) => (
            <button
              key={persona}
              className={`va-persona-tab ${userType === persona ? 'active' : ''}`}
              onClick={() => dispatch(setUserType(persona))}
            >
              {persona}
            </button>
          ))}
        </div>

        {/* Messages list */}
        <div ref={messagesContainerRef} className="va-messages-list">
          {chatHistory.map((message, index) => (
            <div key={index} className={`va-message-row ${message.role}`}>
              <div className="va-message-bubble">
                {parseMarkdown(message.content)}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isLoading && (
            <div className="va-message-row assistant">
              <div className="va-message-bubble">
                <div className="va-typing-indicator">
                  <div className="va-typing-dot" />
                  <div className="va-typing-dot" />
                  <div className="va-typing-dot" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Suggested Questions */}
        {suggestions && suggestions.length > 0 && (
          <div className="va-suggestions-container">
            <div className="va-suggestions-label">Suggested Questions</div>
            <div className="va-suggestions-list">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="va-suggestion-chip"
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="va-footer">
          <div className="va-input-container">
            <input
              type="text"
              className="va-input"
              placeholder={`Ask as ${userType}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="va-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <FaSpinner size={16} className="animate-spin" />
              ) : (
                <FaPaperPlane size={14} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualAssistant;

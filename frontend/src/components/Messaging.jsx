import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Messaging.css';

function Messaging({ account, provider, signer }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);

  // Encryption key derived from user's address (in production, use proper key management)
  const getEncryptionKey = () => {
    return CryptoJS.SHA256(account).toString();
  };

  const encryptMessage = (message) => {
    const key = getEncryptionKey();
    return CryptoJS.AES.encrypt(message, key).toString();
  };

  const decryptMessage = (encryptedMessage) => {
    try {
      const key = getEncryptionKey();
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return '[Decryption failed]';
    }
  };

  useEffect(() => {
    loadConversations();
  }, [account]);

  const loadConversations = () => {
    // Mock conversations
    const mockConversations = [
      {
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        lastMessage: 'Hey, how are you?',
        timestamp: Date.now() - 3600000
      }
    ];
    setConversations(mockConversations);
  };

  const loadMessages = (address) => {
    // Mock messages
    const mockMessages = [
      {
        id: 1,
        sender: address,
        content: 'Hey, how are you?',
        timestamp: Date.now() - 3600000,
        encrypted: true
      },
      {
        id: 2,
        sender: account,
        content: 'I\'m good! How about you?',
        timestamp: Date.now() - 3000000,
        encrypted: true
      }
    ];
    setMessages(mockMessages);
    setSelectedConversation(address);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Encrypt the message
      const encrypted = encryptMessage(newMessage);
      
      // In a real implementation:
      // 1. Store encrypted message in IPFS
      // 2. Store IPFS hash in smart contract or send via libp2p
      
      const message = {
        id: Date.now(),
        sender: account,
        content: newMessage,
        timestamp: Date.now(),
        encrypted: true
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleStartNewChat = () => {
    if (recipientAddress && recipientAddress.length === 42) {
      setSelectedConversation(recipientAddress);
      setMessages([]);
      setShowNewChat(false);
      setRecipientAddress('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="messaging">
      <div className="messaging-container">
        <div className="conversations-panel">
          <div className="panel-header">
            <h2>Messages</h2>
            <button onClick={() => setShowNewChat(true)} className="new-chat-button">
              + New
            </button>
          </div>
          
          {showNewChat && (
            <div className="new-chat-form">
              <input
                type="text"
                placeholder="Recipient address (0x...)"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
              <button onClick={handleStartNewChat}>Start</button>
              <button onClick={() => setShowNewChat(false)}>Cancel</button>
            </div>
          )}

          <div className="conversations-list">
            {conversations.length === 0 ? (
              <p className="no-conversations">No conversations yet</p>
            ) : (
              conversations.map(conv => (
                <div
                  key={conv.address}
                  className={`conversation-item ${selectedConversation === conv.address ? 'active' : ''}`}
                  onClick={() => loadMessages(conv.address)}
                >
                  <div className="conversation-address">
                    {conv.address.slice(0, 6)}...{conv.address.slice(-4)}
                  </div>
                  <div className="conversation-preview">{conv.lastMessage}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="chat-panel">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <span className="chat-address">
                  {selectedConversation.slice(0, 10)}...{selectedConversation.slice(-8)}
                </span>
                <span className="encryption-badge">🔐 Encrypted</span>
              </div>

              <div className="messages-container">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sender === account ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">{msg.content}</div>
                    <div className="message-time">{formatTime(msg.timestamp)}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="message-input-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type an encrypted message..."
                />
                <button type="submit" disabled={!newMessage.trim()}>
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messaging;

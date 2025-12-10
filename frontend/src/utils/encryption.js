import CryptoJS from 'crypto-js';

/**
 * Encryption utilities for privacy-centric features
 */

// Generate a key from user's address
export const generateKeyFromAddress = (address) => {
  return CryptoJS.SHA256(address).toString();
};

// Encrypt text with AES
export const encryptText = (text, key) => {
  try {
    return CryptoJS.AES.encrypt(text, key).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

// Decrypt text with AES
export const decryptText = (encryptedText, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Encrypt JSON data
export const encryptJSON = (data, key) => {
  const jsonString = JSON.stringify(data);
  return encryptText(jsonString, key);
};

// Decrypt JSON data
export const decryptJSON = (encryptedData, key) => {
  const decrypted = decryptText(encryptedData, key);
  if (decrypted) {
    try {
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Error parsing decrypted JSON:', error);
      return null;
    }
  }
  return null;
};

// Generate a shared encryption key for P2P messaging
// This is a simplified version. In production, use proper key exchange like ECDH
export const generateSharedKey = (address1, address2) => {
  const combined = [address1, address2].sort().join('');
  return CryptoJS.SHA256(combined).toString();
};

// Encrypt message for P2P communication
export const encryptMessage = (message, senderAddress, recipientAddress) => {
  const sharedKey = generateSharedKey(senderAddress, recipientAddress);
  return encryptText(message, sharedKey);
};

// Decrypt message for P2P communication
export const decryptMessage = (encryptedMessage, senderAddress, recipientAddress) => {
  const sharedKey = generateSharedKey(senderAddress, recipientAddress);
  return decryptText(encryptedMessage, sharedKey);
};

// Hash data
export const hashData = (data) => {
  return CryptoJS.SHA256(data).toString();
};

// Generate random salt
export const generateSalt = () => {
  return CryptoJS.lib.WordArray.random(128/8).toString();
};

export default {
  generateKeyFromAddress,
  encryptText,
  decryptText,
  encryptJSON,
  decryptJSON,
  generateSharedKey,
  encryptMessage,
  decryptMessage,
  hashData,
  generateSalt
};

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Messaging from './components/Messaging';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    // Check if wallet is already connected
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          setAccount(accounts[0].address);
          setProvider(provider);
          setSigner(signer);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setProvider(provider);
        setSigner(signer);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this application');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };

  return (
    <Router>
      <div className="app">
        <Header
          account={account}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
        />
        <main className="main-content">
          {!account ? (
            <div className="connect-prompt">
              <h2>Welcome to Decentralized Social Media</h2>
              <p>Connect your wallet to get started</p>
              <button onClick={connectWallet} className="connect-button">
                Connect Wallet
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Feed account={account} provider={provider} signer={signer} />} />
              <Route path="/profile/:address?" element={<Profile account={account} provider={provider} signer={signer} />} />
              <Route path="/messages" element={<Messaging account={account} provider={provider} signer={signer} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;

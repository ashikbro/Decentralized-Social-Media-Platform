import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ account, connectWallet, disconnectWallet }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🔐 DecentraNet</h1>
        </Link>
        
        {account && (
          <nav className="nav">
            <Link to="/" className="nav-link">Feed</Link>
            <Link to={`/profile/${account}`} className="nav-link">Profile</Link>
            <Link to="/messages" className="nav-link">Messages</Link>
          </nav>
        )}
        
        <div className="wallet-section">
          {account ? (
            <div className="wallet-info">
              <span className="account-address">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <button onClick={disconnectWallet} className="disconnect-button">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="connect-button-header">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

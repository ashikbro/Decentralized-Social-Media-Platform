# Decentralized Social Media Platform

A decentralized, privacy-first social media platform where users own and control their data via blockchain technology.

## 🌟 Features

- **Blockchain-Based Ownership**: User profiles and content ownership stored on-chain via Solidity smart contracts
- **IPFS Content Storage**: Decentralized content storage using InterPlanetary File System (IPFS)
- **Privacy-Centric**: End-to-end encrypted P2P messaging with AES encryption
- **Web3 Integration**: MetaMask wallet connection for user authentication
- **Social Features**:
  - Create and view posts
  - Like/unlike posts
  - Follow/unfollow users
  - Profile management
  - Private encrypted messaging

## 🏗️ Architecture

### Smart Contracts (Solidity)
- **UserProfile.sol**: Manages user profiles and ownership information
- **Content.sol**: Handles posts, likes, and content references
- **SocialGraph.sol**: Manages follower/following relationships

### Frontend (React)
- **React 19**: Modern UI framework
- **Ethers.js**: Ethereum blockchain interaction
- **React Router**: Client-side routing
- **Vite**: Fast build tool
- **CryptoJS**: Client-side encryption

### Storage
- **IPFS**: Decentralized content storage
- **Ethereum**: Smart contract data and ownership records

## 📋 Prerequisites

- Node.js (v20 or higher recommended)
- MetaMask browser extension
- An Ethereum wallet with test ETH (for deployment)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ashikbro/Decentralized-Social-Media-Platform.git
cd Decentralized-Social-Media-Platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Start Local Blockchain

```bash
# In a separate terminal, start a local Hardhat node
npx hardhat node
```

This will start a local Ethereum network and provide you with test accounts.

### 4. Deploy Smart Contracts

```bash
# Deploy contracts to local network
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract addresses and update `frontend/src/utils/contracts.js` with the new addresses.

### 5. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Connect MetaMask

1. Open MetaMask
2. Add the local network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
   - Currency Symbol: ETH
3. Import one of the test accounts from the Hardhat node output
4. Connect your wallet to the application

## 🔧 Smart Contract Compilation

```bash
npx hardhat compile
```

## 🧪 Running Tests

```bash
npx hardhat test
```

## 📦 Building for Production

```bash
cd frontend
npm run build
```

## 🔐 Security Features

- **Encryption**: Messages are encrypted using AES-256 before being stored
- **Wallet Authentication**: Uses MetaMask for secure wallet-based authentication
- **Decentralized Storage**: Content stored on IPFS to prevent centralized data control
- **Smart Contract Ownership**: Blockchain-enforced ownership of user data and content

## 🌐 Network Configuration

### Localhost (Development)
- RPC URL: http://127.0.0.1:8545
- Chain ID: 1337

### Testnet Deployment
To deploy to a testnet (e.g., Sepolia), update `hardhat.config.js` with your network configuration and private key.

## 📝 Smart Contract Interfaces

### UserProfile Contract
- `createProfile(username, profileIPFSHash)`: Create a new user profile
- `updateProfile(profileIPFSHash)`: Update profile information
- `getProfile(address)`: Get user profile data

### Content Contract
- `createPost(contentIPFSHash)`: Create a new post
- `likePost(postId)`: Like a post
- `unlikePost(postId)`: Unlike a post
- `getUserPosts(address)`: Get all posts by a user

### SocialGraph Contract
- `follow(address)`: Follow a user
- `unfollow(address)`: Unfollow a user
- `getFollowers(address)`: Get user's followers
- `getFollowing(address)`: Get users being followed

## 🛠️ Technology Stack

- **Blockchain**: Ethereum, Solidity 0.8.20
- **Development**: Hardhat
- **Frontend**: React 19, Vite
- **Web3**: Ethers.js v6
- **Storage**: IPFS HTTP Client
- **Encryption**: CryptoJS
- **Styling**: CSS3

## 📱 Application Structure

```
├── contracts/           # Solidity smart contracts
│   ├── UserProfile.sol
│   ├── Content.sol
│   └── SocialGraph.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── utils/      # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── test/               # Smart contract tests
└── hardhat.config.js   # Hardhat configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Disclaimer

This is a demonstration project. Do not use in production without proper security audits and testing.

## 🔮 Future Enhancements

- [ ] Image and video upload support
- [ ] NFT profile pictures
- [ ] Token-gated content
- [ ] DAO governance for platform decisions
- [ ] Mobile application
- [ ] Push notifications via EPNS
- [ ] Content moderation through community voting
- [ ] Integration with more Web3 wallets (WalletConnect)

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.


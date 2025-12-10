# Quick Start Guide

Get the Decentralized Social Media Platform up and running in 5 minutes!

## Prerequisites

- Node.js v20+ installed
- MetaMask browser extension
- Basic understanding of blockchain/Web3

## Setup Steps

### 1. Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/ashikbro/Decentralized-Social-Media-Platform.git
cd Decentralized-Social-Media-Platform

# Install dependencies
npm install
cd frontend && npm install && cd ..
```

### 2. Start Local Blockchain (30 seconds)

Open a terminal and run:

```bash
npm run node
```

Keep this terminal running. You'll see 20 test accounts with addresses and private keys.

### 3. Deploy Contracts (30 seconds)

Open a NEW terminal and run:

```bash
npm run deploy
```

You'll see output like:
```
UserProfile deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Content deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
SocialGraph deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

Copy these addresses!

### 4. Update Frontend Configuration (1 minute)

Edit `frontend/src/utils/contracts.js` and replace the contract addresses:

```javascript
export const CONTRACT_ADDRESSES = {
  UserProfile: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Your address here
  Content: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',     // Your address here
  SocialGraph: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'  // Your address here
};
```

### 5. Configure MetaMask (1 minute)

1. Open MetaMask
2. Click network dropdown → Add Network → Add network manually
3. Enter these details:
   - **Network Name:** Hardhat Local
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 1337
   - **Currency Symbol:** ETH
4. Click "Save"
5. Import a test account:
   - Copy a private key from the Hardhat node terminal
   - MetaMask → Account icon → Import Account → Paste private key

### 6. Start the Application (30 seconds)

```bash
npm run frontend
```

Visit: http://localhost:3000

### 7. Use the App!

1. Click "Connect Wallet" 
2. Approve the MetaMask connection
3. Start posting, following, and messaging!

## What Can You Do?

✅ **Create Posts** - Share your thoughts on the decentralized network  
✅ **Like Posts** - Interact with content  
✅ **Follow Users** - Build your social network  
✅ **Manage Profile** - Update your decentralized identity  
✅ **Send Encrypted Messages** - Private P2P communication  

## Common Issues

### "Cannot connect to blockchain"
- Make sure `npm run node` is still running
- Check MetaMask is on "Hardhat Local" network

### "Contract not found"
- Verify you updated the contract addresses
- Redeploy if needed: `npm run deploy`

### MetaMask shows $0 balance
- Make sure you imported a test account from Hardhat node
- Each test account has 10,000 ETH

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for testnet/mainnet deployment
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Explore the smart contracts in `contracts/` directory
- Customize the frontend in `frontend/src/` directory

## Need Help?

- Check existing GitHub Issues
- Read the full documentation
- Open a new issue with details

## Enjoy Your Decentralized Social Experience! 🚀

Welcome to Web3 social networking where YOU own your data!

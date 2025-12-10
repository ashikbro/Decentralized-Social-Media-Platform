# Deployment Guide

This guide explains how to deploy the Decentralized Social Media Platform to various networks.

## Prerequisites

- Node.js and npm installed
- MetaMask or another Web3 wallet
- ETH for gas fees (mainnet/testnet) or local Hardhat node

## Local Development Deployment

### 1. Start Local Blockchain

```bash
npm run node
```

This will:
- Start a local Ethereum network on http://127.0.0.1:8545
- Provide 20 test accounts with 10,000 ETH each
- Display private keys and addresses

### 2. Deploy Smart Contracts

In a new terminal:

```bash
npm run deploy
```

This will deploy:
- UserProfile contract
- Content contract
- SocialGraph contract

**Important:** Copy the deployed contract addresses from the output.

### 3. Update Frontend Configuration

Edit `frontend/src/utils/contracts.js` and update the `CONTRACT_ADDRESSES` object:

```javascript
export const CONTRACT_ADDRESSES = {
  UserProfile: '0xYourDeployedAddress',
  Content: '0xYourDeployedAddress',
  SocialGraph: '0xYourDeployedAddress'
};
```

### 4. Start Frontend

```bash
npm run frontend
```

Access the application at http://localhost:3000

## Testnet Deployment (Sepolia)

### 1. Update Hardhat Configuration

Edit `hardhat.config.js`:

```javascript
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

### 2. Create .env File

Create a `.env` file in the root directory:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**⚠️ Never commit the .env file! It's already in .gitignore**

### 3. Get Test ETH

- Visit https://sepoliafaucet.com/
- Request test ETH for your deployment wallet

### 4. Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. Verify Contracts (Optional)

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### 6. Update Frontend for Testnet

1. Update contract addresses in `frontend/src/utils/contracts.js`
2. Update `.env.example` with Sepolia network details
3. Build frontend: `npm run frontend:build`

## Mainnet Deployment

⚠️ **Exercise extreme caution when deploying to mainnet!**

### Pre-deployment Checklist

- [ ] Smart contracts audited by professional auditors
- [ ] Comprehensive testing completed
- [ ] Gas optimization performed
- [ ] Emergency pause functionality implemented (if needed)
- [ ] Multi-sig wallet setup for contract ownership
- [ ] Insurance/bug bounty program considered
- [ ] Legal compliance reviewed

### Deployment Steps

1. Follow testnet deployment steps but use mainnet configuration
2. Use a hardware wallet for deployment
3. Deploy to mainnet:

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

4. Verify contracts on Etherscan
5. Transfer ownership to multi-sig wallet (if applicable)
6. Monitor contracts closely after deployment

## IPFS Configuration

### Using Infura IPFS

1. Sign up at https://infura.io/
2. Create an IPFS project
3. Get your Project ID and Secret
4. Update `frontend/src/utils/ipfs.js` with credentials

### Using Local IPFS Node

1. Install IPFS: https://docs.ipfs.io/install/
2. Start IPFS daemon: `ipfs daemon`
3. Update `frontend/src/utils/ipfs.js`:

```javascript
ipfsClient = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});
```

## Frontend Hosting

### Vercel Deployment

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend: `cd frontend`
3. Deploy: `vercel`
4. Follow prompts to configure

### IPFS Hosting (Fully Decentralized)

1. Build frontend: `npm run frontend:build`
2. Add to IPFS: `ipfs add -r frontend/dist`
3. Access via IPFS gateway or pinning service

## Post-Deployment

1. Test all features thoroughly
2. Monitor gas costs
3. Set up monitoring and alerts
4. Document contract addresses
5. Update README with live URLs
6. Announce to community

## Troubleshooting

### Contract Deployment Fails

- Check wallet has sufficient ETH for gas
- Verify network configuration
- Check RPC endpoint is accessible
- Review error messages in console

### Frontend Can't Connect to Contracts

- Verify contract addresses are correct
- Check MetaMask is connected to correct network
- Clear browser cache and reload
- Check browser console for errors

### IPFS Upload Fails

- Verify IPFS node is running
- Check network connectivity
- Verify Infura credentials (if using)
- Try alternative IPFS gateway

## Security Considerations

- Use hardware wallets for mainnet deployments
- Never share private keys
- Implement rate limiting
- Monitor for unusual activity
- Have emergency response plan
- Regular security audits

## Support

For deployment issues:
1. Check the README.md
2. Search existing issues
3. Open a new issue with detailed logs
4. Join community Discord/Telegram (if available)

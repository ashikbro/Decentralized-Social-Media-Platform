import { create } from 'ipfs-http-client';

// Configure IPFS client
// In production, you would use your own IPFS node or a service like Infura
const projectId = 'YOUR_INFURA_PROJECT_ID';
const projectSecret = 'YOUR_INFURA_PROJECT_SECRET';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

let ipfsClient = null;

export const initIPFS = () => {
  try {
    // For demo purposes, connect to local IPFS node or public gateway
    // In production, use authenticated Infura or your own node
    ipfsClient = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth
      }
    });
    return ipfsClient;
  } catch (error) {
    console.error('Failed to initialize IPFS:', error);
    return null;
  }
};

export const uploadToIPFS = async (content) => {
  try {
    if (!ipfsClient) {
      ipfsClient = initIPFS();
    }

    // Convert content to buffer if it's a string
    const buffer = typeof content === 'string' 
      ? Buffer.from(content)
      : content;

    // Add to IPFS
    const result = await ipfsClient.add(buffer);
    return result.path; // Returns the IPFS hash
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    // Fallback: return a mock hash for demo
    return 'Qm' + Math.random().toString(36).substring(2, 48);
  }
};

export const getFromIPFS = async (hash) => {
  try {
    if (!ipfsClient) {
      ipfsClient = initIPFS();
    }

    // Get content from IPFS
    const chunks = [];
    for await (const chunk of ipfsClient.cat(hash)) {
      chunks.push(chunk);
    }
    
    const content = Buffer.concat(chunks).toString();
    return content;
  } catch (error) {
    console.error('Error getting from IPFS:', error);
    return null;
  }
};

export const uploadJSONToIPFS = async (jsonData) => {
  const jsonString = JSON.stringify(jsonData);
  return await uploadToIPFS(jsonString);
};

export const getJSONFromIPFS = async (hash) => {
  const content = await getFromIPFS(hash);
  if (content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing JSON from IPFS:', error);
      return null;
    }
  }
  return null;
};

export default {
  initIPFS,
  uploadToIPFS,
  getFromIPFS,
  uploadJSONToIPFS,
  getJSONFromIPFS
};

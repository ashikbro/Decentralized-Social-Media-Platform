import { ethers } from 'ethers';

/**
 * Contract ABIs and interaction utilities
 * In production, import these from the compiled contract artifacts
 */

// Contract addresses (update after deployment)
export const CONTRACT_ADDRESSES = {
  UserProfile: '0x0000000000000000000000000000000000000000',
  Content: '0x0000000000000000000000000000000000000000',
  SocialGraph: '0x0000000000000000000000000000000000000000'
};

// Simplified ABIs for demo
export const USER_PROFILE_ABI = [
  'function createProfile(string memory _username, string memory _profileIPFSHash) public',
  'function updateProfile(string memory _profileIPFSHash) public',
  'function getProfile(address _user) public view returns (string memory username, string memory profileIPFSHash, address owner, uint256 createdAt)',
  'function profileExists(address _user) public view returns (bool)',
  'event ProfileCreated(address indexed owner, string username, uint256 timestamp)',
  'event ProfileUpdated(address indexed owner, string profileIPFSHash, uint256 timestamp)'
];

export const CONTENT_ABI = [
  'function createPost(string memory _contentIPFSHash) public returns (uint256)',
  'function likePost(uint256 _postId) public',
  'function unlikePost(uint256 _postId) public',
  'function getPost(uint256 _postId) public view returns (uint256 id, address author, string memory contentIPFSHash, uint256 timestamp, uint256 likes)',
  'function getUserPosts(address _user) public view returns (uint256[] memory)',
  'function hasLikedPost(uint256 _postId, address _user) public view returns (bool)',
  'function getTotalPosts() public view returns (uint256)',
  'event PostCreated(uint256 indexed postId, address indexed author, string contentIPFSHash, uint256 timestamp)',
  'event PostLiked(uint256 indexed postId, address indexed liker, uint256 timestamp)',
  'event PostUnliked(uint256 indexed postId, address indexed unliker, uint256 timestamp)'
];

export const SOCIAL_GRAPH_ABI = [
  'function follow(address _user) public',
  'function unfollow(address _user) public',
  'function getFollowers(address _user) public view returns (address[] memory)',
  'function getFollowing(address _user) public view returns (address[] memory)',
  'function getFollowerCount(address _user) public view returns (uint256)',
  'function getFollowingCount(address _user) public view returns (uint256)',
  'function checkIsFollowing(address _follower, address _following) public view returns (bool)',
  'event Followed(address indexed follower, address indexed following, uint256 timestamp)',
  'event Unfollowed(address indexed follower, address indexed unfollowing, uint256 timestamp)'
];

// Get contract instance
export const getContract = (contractName, providerOrSigner) => {
  const address = CONTRACT_ADDRESSES[contractName];
  let abi;

  switch (contractName) {
    case 'UserProfile':
      abi = USER_PROFILE_ABI;
      break;
    case 'Content':
      abi = CONTENT_ABI;
      break;
    case 'SocialGraph':
      abi = SOCIAL_GRAPH_ABI;
      break;
    default:
      throw new Error(`Unknown contract: ${contractName}`);
  }

  return new ethers.Contract(address, abi, providerOrSigner);
};

// Helper functions for contract interactions
export const contractHelpers = {
  // User Profile
  async createProfile(signer, username, profileIPFSHash) {
    const contract = getContract('UserProfile', signer);
    const tx = await contract.createProfile(username, profileIPFSHash);
    return await tx.wait();
  },

  async getProfile(provider, address) {
    const contract = getContract('UserProfile', provider);
    return await contract.getProfile(address);
  },

  // Content
  async createPost(signer, contentIPFSHash) {
    const contract = getContract('Content', signer);
    const tx = await contract.createPost(contentIPFSHash);
    return await tx.wait();
  },

  async likePost(signer, postId) {
    const contract = getContract('Content', signer);
    const tx = await contract.likePost(postId);
    return await tx.wait();
  },

  async getUserPosts(provider, address) {
    const contract = getContract('Content', provider);
    return await contract.getUserPosts(address);
  },

  // Social Graph
  async followUser(signer, userAddress) {
    const contract = getContract('SocialGraph', signer);
    const tx = await contract.follow(userAddress);
    return await tx.wait();
  },

  async unfollowUser(signer, userAddress) {
    const contract = getContract('SocialGraph', signer);
    const tx = await contract.unfollow(userAddress);
    return await tx.wait();
  },

  async getFollowers(provider, address) {
    const contract = getContract('SocialGraph', provider);
    return await contract.getFollowers(address);
  },

  async getFollowing(provider, address) {
    const contract = getContract('SocialGraph', provider);
    return await contract.getFollowing(address);
  }
};

export default {
  CONTRACT_ADDRESSES,
  getContract,
  contractHelpers
};

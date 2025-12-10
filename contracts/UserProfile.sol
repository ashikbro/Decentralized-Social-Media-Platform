// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserProfile {
    struct Profile {
        string username;
        string profileIPFSHash;
        address owner;
        uint256 createdAt;
        bool exists;
    }

    mapping(address => Profile) public profiles;
    mapping(string => address) public usernameToAddress;
    
    event ProfileCreated(address indexed owner, string username, uint256 timestamp);
    event ProfileUpdated(address indexed owner, string profileIPFSHash, uint256 timestamp);

    modifier onlyProfileOwner() {
        require(profiles[msg.sender].exists, "Profile does not exist");
        require(profiles[msg.sender].owner == msg.sender, "Not profile owner");
        _;
    }

    function createProfile(string memory _username, string memory _profileIPFSHash) public {
        require(!profiles[msg.sender].exists, "Profile already exists");
        require(usernameToAddress[_username] == address(0), "Username already taken");
        require(bytes(_username).length > 0, "Username cannot be empty");

        profiles[msg.sender] = Profile({
            username: _username,
            profileIPFSHash: _profileIPFSHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            exists: true
        });

        usernameToAddress[_username] = msg.sender;
        emit ProfileCreated(msg.sender, _username, block.timestamp);
    }

    function updateProfile(string memory _profileIPFSHash) public onlyProfileOwner {
        profiles[msg.sender].profileIPFSHash = _profileIPFSHash;
        emit ProfileUpdated(msg.sender, _profileIPFSHash, block.timestamp);
    }

    function getProfile(address _user) public view returns (
        string memory username,
        string memory profileIPFSHash,
        address owner,
        uint256 createdAt
    ) {
        require(profiles[_user].exists, "Profile does not exist");
        Profile memory profile = profiles[_user];
        return (profile.username, profile.profileIPFSHash, profile.owner, profile.createdAt);
    }

    function profileExists(address _user) public view returns (bool) {
        return profiles[_user].exists;
    }
}

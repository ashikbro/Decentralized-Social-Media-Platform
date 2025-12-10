// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Content {
    struct Post {
        uint256 id;
        address author;
        string contentIPFSHash;
        uint256 timestamp;
        uint256 likes;
        bool exists;
    }

    uint256 private postCounter;
    mapping(uint256 => Post) public posts;
    mapping(address => uint256[]) public userPosts;
    mapping(uint256 => mapping(address => bool)) public postLikes;
    
    event PostCreated(uint256 indexed postId, address indexed author, string contentIPFSHash, uint256 timestamp);
    event PostLiked(uint256 indexed postId, address indexed liker, uint256 timestamp);
    event PostUnliked(uint256 indexed postId, address indexed unliker, uint256 timestamp);

    function createPost(string memory _contentIPFSHash) public returns (uint256) {
        require(bytes(_contentIPFSHash).length > 0, "Content hash cannot be empty");

        postCounter++;
        uint256 postId = postCounter;

        posts[postId] = Post({
            id: postId,
            author: msg.sender,
            contentIPFSHash: _contentIPFSHash,
            timestamp: block.timestamp,
            likes: 0,
            exists: true
        });

        userPosts[msg.sender].push(postId);
        emit PostCreated(postId, msg.sender, _contentIPFSHash, block.timestamp);
        
        return postId;
    }

    function likePost(uint256 _postId) public {
        require(posts[_postId].exists, "Post does not exist");
        require(!postLikes[_postId][msg.sender], "Already liked this post");

        posts[_postId].likes++;
        postLikes[_postId][msg.sender] = true;
        emit PostLiked(_postId, msg.sender, block.timestamp);
    }

    function unlikePost(uint256 _postId) public {
        require(posts[_postId].exists, "Post does not exist");
        require(postLikes[_postId][msg.sender], "Haven't liked this post");

        posts[_postId].likes--;
        postLikes[_postId][msg.sender] = false;
        emit PostUnliked(_postId, msg.sender, block.timestamp);
    }

    function getPost(uint256 _postId) public view returns (
        uint256 id,
        address author,
        string memory contentIPFSHash,
        uint256 timestamp,
        uint256 likes
    ) {
        require(posts[_postId].exists, "Post does not exist");
        Post memory post = posts[_postId];
        return (post.id, post.author, post.contentIPFSHash, post.timestamp, post.likes);
    }

    function getUserPosts(address _user) public view returns (uint256[] memory) {
        return userPosts[_user];
    }

    function hasLikedPost(uint256 _postId, address _user) public view returns (bool) {
        return postLikes[_postId][_user];
    }

    function getTotalPosts() public view returns (uint256) {
        return postCounter;
    }
}

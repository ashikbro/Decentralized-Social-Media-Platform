// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SocialGraph {
    mapping(address => address[]) public followers;
    mapping(address => address[]) public following;
    mapping(address => mapping(address => bool)) public isFollowing;
    
    event Followed(address indexed follower, address indexed following, uint256 timestamp);
    event Unfollowed(address indexed follower, address indexed unfollowing, uint256 timestamp);

    function follow(address _user) public {
        require(_user != msg.sender, "Cannot follow yourself");
        require(!isFollowing[msg.sender][_user], "Already following this user");

        following[msg.sender].push(_user);
        followers[_user].push(msg.sender);
        isFollowing[msg.sender][_user] = true;

        emit Followed(msg.sender, _user, block.timestamp);
    }

    function unfollow(address _user) public {
        require(isFollowing[msg.sender][_user], "Not following this user");

        // Remove from following list
        address[] storage followingList = following[msg.sender];
        for (uint256 i = 0; i < followingList.length; i++) {
            if (followingList[i] == _user) {
                followingList[i] = followingList[followingList.length - 1];
                followingList.pop();
                break;
            }
        }

        // Remove from followers list
        address[] storage followersList = followers[_user];
        for (uint256 i = 0; i < followersList.length; i++) {
            if (followersList[i] == msg.sender) {
                followersList[i] = followersList[followersList.length - 1];
                followersList.pop();
                break;
            }
        }

        isFollowing[msg.sender][_user] = false;
        emit Unfollowed(msg.sender, _user, block.timestamp);
    }

    function getFollowers(address _user) public view returns (address[] memory) {
        return followers[_user];
    }

    function getFollowing(address _user) public view returns (address[] memory) {
        return following[_user];
    }

    function getFollowerCount(address _user) public view returns (uint256) {
        return followers[_user].length;
    }

    function getFollowingCount(address _user) public view returns (uint256) {
        return following[_user].length;
    }

    function checkIsFollowing(address _follower, address _following) public view returns (bool) {
        return isFollowing[_follower][_following];
    }
}

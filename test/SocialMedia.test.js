import { expect } from "chai";
import hre from "hardhat";

describe("Decentralized Social Media Platform", function () {
  let userProfile, content, socialGraph;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await hre.ethers.getSigners();

    // Deploy contracts
    const UserProfile = await hre.ethers.getContractFactory("UserProfile");
    userProfile = await UserProfile.deploy();

    const Content = await hre.ethers.getContractFactory("Content");
    content = await Content.deploy();

    const SocialGraph = await hre.ethers.getContractFactory("SocialGraph");
    socialGraph = await SocialGraph.deploy();
  });

  describe("UserProfile", function () {
    it("Should create a user profile", async function () {
      await userProfile.connect(user1).createProfile("testuser", "QmTestHash123");
      
      const profile = await userProfile.getProfile(user1.address);
      expect(profile.username).to.equal("testuser");
      expect(profile.profileIPFSHash).to.equal("QmTestHash123");
      expect(profile.owner).to.equal(user1.address);
    });

    it("Should not allow duplicate usernames", async function () {
      await userProfile.connect(user1).createProfile("testuser", "QmHash1");
      
      await expect(
        userProfile.connect(user2).createProfile("testuser", "QmHash2")
      ).to.be.revertedWith("Username already taken");
    });

    it("Should update profile", async function () {
      await userProfile.connect(user1).createProfile("testuser", "QmHash1");
      await userProfile.connect(user1).updateProfile("QmHash2");
      
      const profile = await userProfile.getProfile(user1.address);
      expect(profile.profileIPFSHash).to.equal("QmHash2");
    });
  });

  describe("Content", function () {
    it("Should create a post", async function () {
      const tx = await content.connect(user1).createPost("QmPostHash123");
      const receipt = await tx.wait();
      
      const post = await content.getPost(1);
      expect(post.author).to.equal(user1.address);
      expect(post.contentIPFSHash).to.equal("QmPostHash123");
    });

    it("Should like and unlike a post", async function () {
      await content.connect(user1).createPost("QmPostHash123");
      
      await content.connect(user2).likePost(1);
      let post = await content.getPost(1);
      expect(post.likes).to.equal(1);
      
      await content.connect(user2).unlikePost(1);
      post = await content.getPost(1);
      expect(post.likes).to.equal(0);
    });

    it("Should not allow double likes", async function () {
      await content.connect(user1).createPost("QmPostHash123");
      await content.connect(user2).likePost(1);
      
      await expect(
        content.connect(user2).likePost(1)
      ).to.be.revertedWith("Already liked this post");
    });
  });

  describe("SocialGraph", function () {
    it("Should follow a user", async function () {
      await socialGraph.connect(user1).follow(user2.address);
      
      const following = await socialGraph.getFollowing(user1.address);
      const followers = await socialGraph.getFollowers(user2.address);
      
      expect(following).to.include(user2.address);
      expect(followers).to.include(user1.address);
    });

    it("Should not allow following yourself", async function () {
      await expect(
        socialGraph.connect(user1).follow(user1.address)
      ).to.be.revertedWith("Cannot follow yourself");
    });

    it("Should unfollow a user", async function () {
      await socialGraph.connect(user1).follow(user2.address);
      await socialGraph.connect(user1).unfollow(user2.address);
      
      const following = await socialGraph.getFollowing(user1.address);
      const followers = await socialGraph.getFollowers(user2.address);
      
      expect(following).to.not.include(user2.address);
      expect(followers).to.not.include(user1.address);
    });

    it("Should get follower and following counts", async function () {
      await socialGraph.connect(user1).follow(user2.address);
      
      const followingCount = await socialGraph.getFollowingCount(user1.address);
      const followerCount = await socialGraph.getFollowerCount(user2.address);
      
      expect(followingCount).to.equal(1);
      expect(followerCount).to.equal(1);
    });
  });
});

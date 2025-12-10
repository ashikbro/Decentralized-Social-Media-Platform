import React, { useState, useEffect } from 'react';
import './Feed.css';

function Feed({ account, provider, signer }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulate fetching posts (would integrate with smart contract)
  useEffect(() => {
    loadPosts();
  }, [account]);

  const loadPosts = async () => {
    // In a real implementation, this would fetch from the smart contract
    // For now, using mock data
    const mockPosts = [
      {
        id: 1,
        author: account,
        content: 'Welcome to the decentralized social network! Your data is yours.',
        timestamp: Date.now() - 3600000,
        likes: 5
      },
      {
        id: 2,
        author: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        content: 'This is amazing! Complete control over our data.',
        timestamp: Date.now() - 7200000,
        likes: 12
      }
    ];
    setPosts(mockPosts);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      // In a real implementation, this would:
      // 1. Upload content to IPFS
      // 2. Call smart contract to create post with IPFS hash
      
      const post = {
        id: Date.now(),
        author: account,
        content: newPost,
        timestamp: Date.now(),
        likes: 0
      };
      
      setPosts([post, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="feed">
      <div className="create-post">
        <h2>Create Post</h2>
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !newPost.trim()}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>

      <div className="posts">
        <h2>Feed</h2>
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to post!</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-header">
                <span className="post-author">
                  {post.author.slice(0, 6)}...{post.author.slice(-4)}
                </span>
                <span className="post-time">{formatTime(post.timestamp)}</span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button className="like-button">
                  ❤️ {post.likes}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';

function Profile({ account, provider, signer }) {
  const { address } = useParams();
  const profileAddress = address || account;
  const isOwnProfile = profileAddress.toLowerCase() === account.toLowerCase();

  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    avatar: ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [profileAddress]);

  const loadProfile = async () => {
    // In a real implementation, this would fetch from smart contract
    const mockProfile = {
      username: isOwnProfile ? 'Your Username' : 'User',
      bio: 'Decentralized social media enthusiast',
      avatar: '👤'
    };
    setProfile(mockProfile);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real implementation:
      // 1. Upload profile data to IPFS
      // 2. Update smart contract with new IPFS hash
      setEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{profile.avatar}</div>
          <h2>{profile.username}</h2>
          <p className="profile-address">
            {profileAddress.slice(0, 10)}...{profileAddress.slice(-8)}
          </p>
        </div>

        {editing ? (
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p className="profile-bio">{profile.bio}</p>
            {isOwnProfile && (
              <button onClick={() => setEditing(true)} className="edit-button">
                Edit Profile
              </button>
            )}
          </div>
        )}

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">0</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-value">0</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">0</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

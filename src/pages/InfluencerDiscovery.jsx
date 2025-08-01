import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Filter, Instagram, Youtube, Video } from 'lucide-react';

const InfluencerDiscovery = () => {
  const { influencers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedPlatform, setPlatform] = useState('');
  const [minFollowers, setMinFollowers] = useState('');

  const niches = ['Fashion', 'Technology', 'Fitness', 'Food', 'Travel', 'Beauty', 'Business'];
  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];

  const filteredInfluencers = influencers.filter(influencer => {
    return (
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedNiche === '' || influencer.niche === selectedNiche) &&
      (selectedPlatform === '' || influencer.platform === selectedPlatform) &&
      (minFollowers === '' || influencer.followers >= parseInt(minFollowers))
    );
  });

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':
        return <div className="platform-icon platform-instagram">IG</div>;
      case 'YouTube':
        return <div className="platform-icon platform-youtube">YT</div>;
      case 'TikTok':
        return <div className="platform-icon platform-tiktok">TT</div>;
      case 'Twitter':
        return <div className="platform-icon platform-twitter">TW</div>;
      default:
        return <Video size={20} />;
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ marginBottom: '8px' }}>Discover Influencers</h1>
          <p style={{ color: '#666' }}>Find the perfect influencers for your next campaign</p>
        </div>

        {/* Search and Filters */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <div className="search-bar">
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                placeholder="Search influencers by name..."
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '44px' }}
              />
            </div>
            <button className="btn">
              <Filter size={20} style={{ marginRight: '8px' }} />
              Filters
            </button>
          </div>

          <div className="filters">
            <select
              className="filter-chip"
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
            >
              <option value="">All Niches</option>
              {niches.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>

            <select
              className="filter-chip"
              value={selectedPlatform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Followers"
              className="filter-chip"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
              style={{ width: '150px' }}
            />
          </div>
        </div>

        {/* Influencer Grid */}
        <div className="grid grid-2">
          {filteredInfluencers.map(influencer => (
            <div key={influencer.id} className="card">
              <div className="influencer-profile">
                <div className="influencer-avatar">
                  {influencer.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '4px' }}>{influencer.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '8px' }}>
                    {getPlatformIcon(influencer.platform)}
                    <span>{influencer.handle}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                    <span style={{ background: '#e7edff', color: '#667eea', padding: '4px 8px', borderRadius: '4px' }}>
                      {influencer.niche}
                    </span>
                    <span style={{ color: '#666' }}>{influencer.location}</span>
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-value">{formatNumber(influencer.followers)}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{influencer.engagementRate}%</div>
                  <div className="stat-label">Engagement</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{formatNumber(influencer.avgLikes)}</div>
                  <div className="stat-label">Avg Likes</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{influencer.recentPosts}</div>
                  <div className="stat-label">Recent Posts</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button className="btn" style={{ flex: 1 }}>
                  View Profile
                </button>
                <button className="btn btn-secondary" style={{ flex: 1 }}>
                  Add to Campaign
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <h3 style={{ marginBottom: '16px', color: '#666' }}>No influencers found</h3>
            <p style={{ color: '#999' }}>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerDiscovery;
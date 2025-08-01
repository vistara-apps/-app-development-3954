import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Calendar, DollarSign, Users } from 'lucide-react';
import CreateCampaignModal from '../components/CreateCampaignModal';

const CampaignManagement = () => {
  const { campaigns, influencers } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getInfluencerNames = (influencerIds) => {
    return influencerIds.map(id => {
      const influencer = influencers.find(inf => inf.id === id);
      return influencer ? influencer.name : 'Unknown';
    }).join(', ');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'completed': return '#6c757d';
      case 'pending': return '#ffc107';
      default: return '#667eea';
    }
  };

  return (
    <>
      <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ marginBottom: '8px' }}>Campaign Management</h1>
              <p style={{ color: '#666' }}>Plan, execute, and monitor your influencer campaigns</p>
            </div>
            <button 
              className="btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} style={{ marginRight: '8px' }} />
              Create Campaign
            </button>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-3" style={{ marginBottom: '40px' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#667eea', borderRadius: '8px', padding: '12px', color: 'white' }}>
                  <Users size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>{campaigns.length}</p>
                  <p style={{ color: '#666', fontSize: '14px' }}>Total Campaigns</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#28a745', borderRadius: '8px', padding: '12px', color: 'white' }}>
                  <DollarSign size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>
                    ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                  </p>
                  <p style={{ color: '#666', fontSize: '14px' }}>Total Budget</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#fd79a8', borderRadius: '8px', padding: '12px', color: 'white' }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>
                    {campaigns.filter(c => c.status === 'active').length}
                  </p>
                  <p style={{ color: '#666', fontSize: '14px' }}>Active Campaigns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="grid">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ marginBottom: '8px' }}>{campaign.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#666' }}>
                      <span>{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
                      <span>${campaign.budget.toLocaleString()} budget</span>
                    </div>
                  </div>
                  <span 
                    style={{ 
                      background: getStatusColor(campaign.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}
                  >
                    {campaign.status}
                  </span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Collaborating with:</p>
                  <p style={{ fontWeight: '500' }}>{getInfluencerNames(campaign.influencers)}</p>
                </div>

                {campaign.performanceMetrics && (
                  <div className="stats-grid">
                    <div className="stat">
                      <div className="stat-value">{campaign.performanceMetrics.reach?.toLocaleString()}</div>
                      <div className="stat-label">Reach</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{campaign.performanceMetrics.engagement?.toLocaleString()}</div>
                      <div className="stat-label">Engagement</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{campaign.performanceMetrics.clicks?.toLocaleString()}</div>
                      <div className="stat-label">Clicks</div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="btn" style={{ flex: 1 }}>
                    View Details
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>
                    Edit Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>

          {campaigns.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <h3 style={{ marginBottom: '16px', color: '#666' }}>No campaigns yet</h3>
              <p style={{ color: '#999', marginBottom: '24px' }}>Create your first influencer marketing campaign to get started</p>
              <button 
                className="btn"
                onClick={() => setShowCreateModal(true)}
              >
                Create Your First Campaign
              </button>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateCampaignModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};

export default CampaignManagement;
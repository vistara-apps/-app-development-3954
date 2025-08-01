import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../context/DataContext';

const CreateCampaignModal = ({ onClose }) => {
  const { addCampaign, influencers } = useData();
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: '',
    selectedInfluencers: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const campaign = {
      ...formData,
      budget: parseInt(formData.budget),
      influencers: formData.selectedInfluencers,
      performanceMetrics: {
        reach: 0,
        engagement: 0,
        clicks: 0
      }
    };
    addCampaign(campaign);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInfluencerSelect = (influencerId) => {
    const updated = formData.selectedInfluencers.includes(influencerId)
      ? formData.selectedInfluencers.filter(id => id !== influencerId)
      : [...formData.selectedInfluencers, influencerId];
    
    setFormData({
      ...formData,
      selectedInfluencers: updated
    });
  };

  return (
    <div className="modal" onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content">
        <div style={{ position: 'relative' }}>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
          
          <h2 style={{ marginBottom: '24px' }}>Create New Campaign</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Campaign Name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input
                type="date"
                name="startDate"
                className="input"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="endDate"
                className="input"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="number"
              name="budget"
              placeholder="Campaign Budget ($)"
              className="input"
              value={formData.budget}
              onChange={handleChange}
              required
            />

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Select Influencers:
              </label>
              <div style={{ maxHeight: '200px', overflowY: 'auto', border: '2px solid #e1e5e9', borderRadius: '8px', padding: '8px' }}>
                {influencers.map(influencer => (
                  <label key={influencer.id} style={{ display: 'block', padding: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.selectedInfluencers.includes(influencer.id)}
                      onChange={() => handleInfluencerSelect(influencer.id)}
                      style={{ marginRight: '8px' }}
                    />
                    {influencer.name} ({influencer.handle}) - {influencer.niche}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn" style={{ width: '100%' }}>
              Create Campaign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
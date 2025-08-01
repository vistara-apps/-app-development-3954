import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [influencers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      handle: '@sarahjohnson',
      platform: 'Instagram',
      followers: 250000,
      engagementRate: 4.2,
      niche: 'Fashion',
      location: 'New York, USA',
      avatar: 'SJ',
      recentPosts: 15,
      avgLikes: 12500,
      avgComments: 320
    },
    {
      id: 2,
      name: 'Mike Chen',
      handle: '@mikechen_tech',
      platform: 'YouTube',
      followers: 850000,
      engagementRate: 6.8,
      niche: 'Technology',
      location: 'San Francisco, USA',
      avatar: 'MC',
      recentPosts: 8,
      avgLikes: 45000,
      avgComments: 1250
    },
    {
      id: 3,
      name: 'Emma Wilson',
      handle: '@emmawilson',
      platform: 'TikTok',
      followers: 1200000,
      engagementRate: 8.5,
      niche: 'Fitness',
      location: 'Los Angeles, USA',
      avatar: 'EW',
      recentPosts: 25,
      avgLikes: 98000,
      avgComments: 2800
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      handle: '@alexrod_food',
      platform: 'Instagram',
      followers: 420000,
      engagementRate: 5.3,
      niche: 'Food',
      location: 'Miami, USA',
      avatar: 'AR',
      recentPosts: 12,
      avgLikes: 22000,
      avgComments: 580
    },
    {
      id: 5,
      name: 'Lisa Park',
      handle: '@lisakpark',
      platform: 'Twitter',
      followers: 180000,
      engagementRate: 3.9,
      niche: 'Business',
      location: 'Austin, USA',
      avatar: 'LP',
      recentPosts: 20,
      avgLikes: 7000,
      avgComments: 150
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Fashion Collection',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      budget: 25000,
      status: 'active',
      influencers: [1, 4],
      performanceMetrics: {
        reach: 850000,
        engagement: 42000,
        clicks: 3200
      }
    },
    {
      id: 2,
      name: 'Tech Product Launch',
      startDate: '2024-05-15',
      endDate: '2024-07-15',
      budget: 50000,
      status: 'completed',
      influencers: [2],
      performanceMetrics: {
        reach: 1200000,
        engagement: 85000,
        clicks: 6800
      }
    }
  ]);

  const [contracts, setContracts] = useState([
    {
      id: 1,
      campaignId: 1,
      influencerId: 1,
      paymentAmount: 5000,
      paymentTerms: 'Net 30',
      contentRequirements: '3 Instagram posts, 5 stories',
      status: 'pending'
    },
    {
      id: 2,
      campaignId: 2,
      influencerId: 2,
      paymentAmount: 15000,
      paymentTerms: 'Net 15',
      contentRequirements: '2 YouTube videos, product review',
      status: 'completed'
    }
  ]);

  const addCampaign = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: Date.now(),
      status: 'active'
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const addContract = (contract) => {
    const newContract = {
      ...contract,
      id: Date.now(),
      status: 'pending'
    };
    setContracts([...contracts, newContract]);
  };

  return (
    <DataContext.Provider value={{
      influencers,
      campaigns,
      contracts,
      addCampaign,
      addContract
    }}>
      {children}
    </DataContext.Provider>
  );
};
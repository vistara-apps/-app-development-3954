import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Eye, MessageCircle, MousePointer } from 'lucide-react';

const Analytics = () => {
  const { campaigns, influencers } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Calculate analytics data
  const totalReach = campaigns.reduce((sum, c) => sum + (c.performanceMetrics?.reach || 0), 0);
  const totalEngagement = campaigns.reduce((sum, c) => sum + (c.performanceMetrics?.engagement || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.performanceMetrics?.clicks || 0), 0);
  const avgEngagementRate = totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(2) : 0;

  // Top performing influencers by engagement
  const influencerPerformance = influencers.map(inf => ({
    name: inf.name,
    engagement: inf.engagementRate,
    reach: inf.followers
  })).sort((a, b) => b.engagement - a.engagement);

  // Campaign performance over time
  const campaignPerformance = campaigns.map(campaign => ({
    name: campaign.name,
    reach: campaign.performanceMetrics?.reach || 0,
    engagement: campaign.performanceMetrics?.engagement || 0,
    clicks: campaign.performanceMetrics?.clicks || 0,
    budget: campaign.budget
  }));

  // Platform distribution
  const platformData = influencers.reduce((acc, inf) => {
    acc[inf.platform] = (acc[inf.platform] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(platformData).map(([platform, count]) => ({
    name: platform,
    value: count
  }));

  const COLORS = ['#667eea', '#764ba2', '#fd79a8', '#fdcb6e'];

  const metrics = [
    {
      title: 'Total Reach',
      value: totalReach.toLocaleString(),
      icon: <Eye size={24} />,
      color: '#667eea',
      change: '+12.5%'
    },
    {
      title: 'Total Engagement',
      value: totalEngagement.toLocaleString(),
      icon: <MessageCircle size={24} />,
      color: '#28a745',
      change: '+8.3%'
    },
    {
      title: 'Total Clicks',
      value: totalClicks.toLocaleString(),
      icon: <MousePointer size={24} />,
      color: '#fd79a8',
      change: '+15.7%'
    },
    {
      title: 'Avg Engagement Rate',
      value: `${avgEngagementRate}%`,
      icon: <TrendingUp size={24} />,
      color: '#fdcb6e',
      change: '+2.1%'
    }
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>Analytics Dashboard</h1>
            <p style={{ color: '#666' }}>Track your influencer marketing performance</p>
          </div>
          <select
            className="input"
            style={{ width: 'auto', marginBottom: '0' }}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">Last year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-2" style={{ marginBottom: '40px' }}>
          {metrics.map((metric, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{metric.title}</p>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: metric.color, marginBottom: '4px' }}>
                    {metric.value}
                  </p>
                  <p style={{ fontSize: '14px', color: '#28a745' }}>{metric.change} from last period</p>
                </div>
                <div style={{ color: metric.color }}>
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-2" style={{ marginBottom: '40px' }}>
          {/* Campaign Performance */}
          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Campaign Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reach" fill="#667eea" />
                <Bar dataKey="engagement" fill="#764ba2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution */}
          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Platform Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '24px' }}>Engagement Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#667eea" strokeWidth={3} />
              <Line type="monotone" dataKey="clicks" stroke="#fd79a8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Influencers */}
        <div className="card">
          <h3 style={{ marginBottom: '24px' }}>Top Performing Influencers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {influencerPerformance.slice(0, 5).map((influencer, index) => (
              <div key={influencer.name} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                background: index === 0 ? '#f0f7ff' : '#f8f9fa',
                borderRadius: '8px',
                border: index === 0 ? '2px solid #667eea' : '1px solid #e1e5e9'
              }}>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>{influencer.name}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    {influencer.reach.toLocaleString()} followers
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>
                    {influencer.engagement}%
                  </p>
                  <p style={{ fontSize: '12px', color: '#666' }}>Engagement Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
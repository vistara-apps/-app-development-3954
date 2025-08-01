import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { campaigns, influencers, contracts } = useData();

  if (!user) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Please login to access your dashboard</h2>
      </div>
    );
  }

  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalInfluencers = influencers.length;
  const pendingPayments = contracts.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.paymentAmount, 0);

  const campaignData = campaigns.map(campaign => ({
    name: campaign.name,
    budget: campaign.budget,
    reach: campaign.performanceMetrics?.reach || 0
  }));

  const stats = [
    {
      title: 'Active Campaigns',
      value: activeCampaigns.length,
      icon: <Target size={24} />,
      color: '#667eea'
    },
    {
      title: 'Total Budget',
      value: `$${totalBudget.toLocaleString()}`,
      icon: <DollarSign size={24} />,
      color: '#28a745'
    },
    {
      title: 'Influencers',
      value: totalInfluencers,
      icon: <Users size={24} />,
      color: '#fd79a8'
    },
    {
      title: 'Pending Payments',
      value: `$${pendingPayments.toLocaleString()}`,
      icon: <TrendingUp size={24} />,
      color: '#fdcb6e'
    }
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ marginBottom: '8px' }}>Welcome back, {user.name}!</h1>
          <p style={{ color: '#666' }}>Here's what's happening with your campaigns</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-2" style={{ marginBottom: '40px' }}>
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>{stat.title}</h3>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: stat.color }}>{stat.value}</p>
                </div>
                <div style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Campaign Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reach" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Budget Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="budget" stroke="#764ba2" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ marginTop: '40px' }}>
          <h3 style={{ marginBottom: '24px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <span>New campaign "Summer Fashion Collection" created</span>
              <span style={{ color: '#666', fontSize: '14px' }}>2 hours ago</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <span>Payment processed for @mikechen_tech</span>
              <span style={{ color: '#666', fontSize: '14px' }}>1 day ago</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <span>Campaign "Tech Product Launch" completed</span>
              <span style={{ color: '#666', fontSize: '14px' }}>3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
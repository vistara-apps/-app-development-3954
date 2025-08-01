import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import EnhancedChart from '../components/EnhancedChart';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const { campaigns, influencers, contracts } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <EmptyState 
          type="default"
          title="Please login to access your dashboard"
          description="Sign in to view your campaigns, analytics, and influencer data."
          actionText="Go to Login"
          onAction={() => window.location.href = '/'}
        />
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
          {loading ? (
            [...Array(4)].map((_, index) => (
              <SkeletonCard key={index} type="dashboard" />
            ))
          ) : (
            stats.map((stat, index) => (
              <div key={index} className="card non-interactive">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 className="text-muted text-small font-medium" style={{ marginBottom: '8px' }}>{stat.title}</h4>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: stat.color, margin: 0 }}>{stat.value}</p>
                  </div>
                  <div style={{ 
                    color: stat.color,
                    background: `${stat.color}15`,
                    padding: '12px',
                    borderRadius: '12px'
                  }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-2">
          <div className="card non-interactive">
            {loading ? (
              <SkeletonCard type="chart" />
            ) : (
              <EnhancedChart
                data={campaignData}
                type="bar"
                dataKey="reach"
                xAxisKey="name"
                title="Campaign Performance"
                loading={loading}
                color="#667eea"
                gradientId="reachGradient"
              />
            )}
          </div>

          <div className="card non-interactive">
            {loading ? (
              <SkeletonCard type="chart" />
            ) : (
              <EnhancedChart
                data={campaignData}
                type="area"
                dataKey="budget"
                xAxisKey="name"
                title="Budget Overview"
                loading={loading}
                color="#764ba2"
                gradientId="budgetGradient"
              />
            )}
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

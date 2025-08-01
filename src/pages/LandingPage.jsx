import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BarChart, Users, CreditCard } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Search size={32} />,
      title: 'Influencer Discovery',
      description: 'Find the perfect influencers for your brand with advanced filtering and search capabilities.'
    },
    {
      icon: <BarChart size={32} />,
      title: 'Analytics Dashboard',
      description: 'Track performance, engagement, and ROI with comprehensive analytics and reporting.'
    },
    {
      icon: <Users size={32} />,
      title: 'Campaign Management',
      description: 'Plan, execute, and monitor your influencer marketing campaigns from one central hub.'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Secure Payments',
      description: 'Handle influencer payments and contracts seamlessly with our integrated payment system.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Effortless influencer discovery and collaboration</h1>
          <p>Streamline your marketing success with the ultimate influencer platform</p>
          <Link to="/dashboard" className="btn" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: '#666' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Ready to transform your influencer marketing?</h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
            Join thousands of brands already using KOLS to scale their marketing success
          </p>
          <Link to="/dashboard" className="btn" style={{ background: 'white', color: '#667eea', fontSize: '18px', padding: '16px 32px' }}>
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
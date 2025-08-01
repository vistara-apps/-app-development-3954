import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const navigation = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Discovery', path: '/discovery' },
    { name: 'Campaigns', path: '/campaigns' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Payments', path: '/payments' },
  ];

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              KOLS.online
            </Link>
            
            {user && (
              <nav className="nav">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {user ? (
                <>
                  <ConnectButton />
                  <span>Welcome, {user.name}</span>
                  <button onClick={logout} className="btn btn-secondary">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="btn btn-secondary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="btn"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default Header;
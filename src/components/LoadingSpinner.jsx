import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#667eea' }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: `3px solid rgba(102, 126, 234, 0.1)`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;

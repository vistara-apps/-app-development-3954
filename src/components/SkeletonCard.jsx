import React from 'react';

const SkeletonCard = ({ type = 'default' }) => {
  const skeletonStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    borderRadius: '8px'
  };

  const SkeletonLine = ({ width = '100%', height = '16px', marginBottom = '12px' }) => (
    <div 
      style={{
        ...skeletonStyle,
        width,
        height,
        marginBottom
      }}
    />
  );

  const renderInfluencerSkeleton = () => (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div 
          style={{
            ...skeletonStyle,
            width: '64px',
            height: '64px',
            borderRadius: '50%'
          }}
        />
        <div style={{ flex: 1 }}>
          <SkeletonLine width="60%" height="20px" />
          <SkeletonLine width="40%" height="14px" />
          <SkeletonLine width="80%" height="14px" marginBottom="0" />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <SkeletonLine width="100%" height="24px" />
            <SkeletonLine width="60%" height="12px" marginBottom="0" />
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <SkeletonLine width="50%" height="40px" marginBottom="0" />
        <SkeletonLine width="50%" height="40px" marginBottom="0" />
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <SkeletonLine width="40%" height="14px" />
          <SkeletonLine width="60%" height="32px" marginBottom="0" />
        </div>
        <div style={{ width: '24px', height: '24px', ...skeletonStyle }} />
      </div>
    </div>
  );

  const renderChartSkeleton = () => (
    <div className="card">
      <SkeletonLine width="40%" height="20px" marginBottom="24px" />
      <div style={{ height: '300px', ...skeletonStyle }} />
    </div>
  );

  const renderDefault = () => (
    <div className="card">
      <SkeletonLine width="70%" height="20px" />
      <SkeletonLine width="100%" height="16px" />
      <SkeletonLine width="80%" height="16px" />
      <SkeletonLine width="60%" height="16px" marginBottom="0" />
    </div>
  );

  const skeletonTypes = {
    influencer: renderInfluencerSkeleton,
    dashboard: renderDashboardSkeleton,
    chart: renderChartSkeleton,
    default: renderDefault
  };

  return (
    <>
      {skeletonTypes[type]()}
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export default SkeletonCard;


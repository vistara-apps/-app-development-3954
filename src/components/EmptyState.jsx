import React from 'react';
import { Search, Users, BarChart, CreditCard, Plus } from 'lucide-react';

const EmptyState = ({ 
  type = 'default', 
  title, 
  description, 
  actionText, 
  onAction,
  icon: CustomIcon 
}) => {
  const getEmptyStateConfig = () => {
    const configs = {
      influencers: {
        icon: Users,
        title: 'No influencers found',
        description: 'Try adjusting your search criteria or filters to find the perfect influencers for your campaign.',
        actionText: 'Clear Filters',
        emoji: '👥'
      },
      campaigns: {
        icon: BarChart,
        title: 'No campaigns yet',
        description: 'Create your first campaign to start collaborating with influencers and tracking your marketing success.',
        actionText: 'Create Campaign',
        emoji: '🚀'
      },
      payments: {
        icon: CreditCard,
        title: 'No payments to process',
        description: 'Payment history and pending transactions will appear here once you start working with influencers.',
        actionText: 'View Campaigns',
        emoji: '💳'
      },
      analytics: {
        icon: BarChart,
        title: 'No data to display',
        description: 'Analytics and insights will appear here once you have active campaigns with performance data.',
        actionText: 'Create Campaign',
        emoji: '📊'
      },
      search: {
        icon: Search,
        title: 'No results found',
        description: 'We couldn\'t find any matches for your search. Try different keywords or adjust your filters.',
        actionText: 'Clear Search',
        emoji: '🔍'
      },
      default: {
        icon: Plus,
        title: 'Nothing here yet',
        description: 'Content will appear here once available.',
        actionText: 'Get Started',
        emoji: '📝'
      }
    };

    return configs[type] || configs.default;
  };

  const config = getEmptyStateConfig();
  const Icon = CustomIcon || config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalActionText = actionText || config.actionText;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      textAlign: 'center',
      minHeight: '300px'
    }}>
      {/* Animated Icon Container */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        animation: 'float 3s ease-in-out infinite',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)'
      }}>
        <Icon size={32} color="white" />
      </div>

      {/* Emoji decoration */}
      <div style={{
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.6,
        animation: 'bounce 2s ease-in-out infinite'
      }}>
        {config.emoji}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: '12px',
        maxWidth: '400px'
      }}>
        {finalTitle}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '1rem',
        color: '#718096',
        lineHeight: '1.6',
        marginBottom: '32px',
        maxWidth: '500px'
      }}>
        {finalDescription}
      </p>

      {/* Action Button */}
      {onAction && (
        <button
          onClick={onAction}
          className="btn"
          style={{
            fontSize: '16px',
            padding: '14px 28px',
            minWidth: '160px'
          }}
        >
          {finalActionText}
        </button>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default EmptyState;


import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentManagement = () => {
  const { contracts, influencers, campaigns } = useData();
  const { createSession } = usePaymentContext();
  const [paid, setPaid] = useState(false);

  const getInfluencer = (id) => influencers.find(inf => inf.id === id);
  const getCampaign = (id) => campaigns.find(camp => camp.id === id);

  const handlePayment = async (contract) => {
    try {
      await createSession();
      setPaid(true);
      console.log('Payment processed for contract:', contract.id);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#28a745" />;
      case 'pending':
        return <Clock size={20} color="#ffc107" />;
      default:
        return <AlertCircle size={20} color="#dc3545" />;
    }
  };

  const totalPending = contracts
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.paymentAmount, 0);

  const totalPaid = contracts
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + c.paymentAmount, 0);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ marginBottom: '8px' }}>Payment Management</h1>
          <p style={{ color: '#666' }}>Manage influencer payments and contracts</p>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-3" style={{ marginBottom: '40px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#ffc107', borderRadius: '8px', padding: '12px', color: 'white' }}>
                <Clock size={20} />
              </div>
              <div>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>
                  ${totalPending.toLocaleString()}
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>Pending Payments</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#28a745', borderRadius: '8px', padding: '12px', color: 'white' }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>
                  ${totalPaid.toLocaleString()}
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>Completed Payments</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#667eea', borderRadius: '8px', padding: '12px', color: 'white' }}>
                <DollarSign size={20} />
              </div>
              <div>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>
                  {contracts.length}
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>Total Contracts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="card">
          <h3 style={{ marginBottom: '24px' }}>Payment Contracts</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contracts.map(contract => {
              const influencer = getInfluencer(contract.influencerId);
              const campaign = getCampaign(contract.campaignId);
              
              return (
                <div key={contract.id} className="payment-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ marginBottom: '8px', color: 'white' }}>
                        {influencer?.name || 'Unknown Influencer'}
                      </h4>
                      <p style={{ opacity: 0.9, marginBottom: '4px' }}>
                        Campaign: {campaign?.name || 'Unknown Campaign'}
                      </p>
                      <p style={{ opacity: 0.7, fontSize: '14px' }}>
                        {contract.contentRequirements}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getStatusIcon(contract.status)}
                      <span style={{ textTransform: 'capitalize', fontSize: '14px' }}>
                        {contract.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                        ${contract.paymentAmount.toLocaleString()}
                      </p>
                      <p style={{ opacity: 0.7, fontSize: '14px' }}>
                        Payment Terms: {contract.paymentTerms}
                      </p>
                    </div>
                    
                    {contract.status === 'pending' && (
                      <button 
                        className="btn"
                        onClick={() => handlePayment(contract)}
                        style={{ background: 'white', color: '#667eea' }}
                      >
                        Process Payment
                      </button>
                    )}
                    
                    {contract.status === 'completed' && (
                      <span style={{ color: 'white', opacity: 0.9 }}>
                        ✓ Payment Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {contracts.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <h3 style={{ marginBottom: '16px', color: '#666' }}>No payment contracts</h3>
            <p style={{ color: '#999' }}>Create campaigns with influencers to manage payments</p>
          </div>
        )}

        {paid && (
          <div className="card" style={{ background: '#d4edda', border: '1px solid #c3e6cb', marginTop: '20px' }}>
            <p style={{ color: '#155724', textAlign: 'center', margin: '0' }}>
              ✓ Payment processed successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
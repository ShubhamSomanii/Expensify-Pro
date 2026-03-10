import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ totalAmount }) => {
  const [rate, setRate] = useState(null);
  const [currency, setCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'c69219a80539a67745a01c4a';
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'];

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        const data = await response.json();
        if (data.result === 'success') {
          setRate(data.conversion_rates[currency]);
        } else {
          throw new Error('Failed to fetch rates');
        }
      } catch (err) {
        setError('Market Offline');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [currency]);

  const convertedValue = rate ? (totalAmount * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---';

  return (
    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', borderTop: '4px solid hsl(var(--accent-secondary))' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Market</h4>
        </div>
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          style={{ padding: '0.4rem', fontSize: '0.8rem', borderRadius: '8px' }}
        >
          {currencies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        {loading ? (
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.8rem' }}>Synchronizing...</p>
        ) : error ? (
          <p style={{ color: 'hsl(var(--accent-danger))', fontSize: '0.8rem', fontWeight: '700' }}>{error}</p>
        ) : (
          <div>
            <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'hsl(var(--text-primary))', letterSpacing: '-0.04em' }}>
              {convertedValue}
            </span>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: 'hsl(var(--accent-secondary))', marginLeft: '0.5rem' }}>
              {currency}
            </span>
            <p style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', marginTop: '0.6rem', fontWeight: '600' }}>
              REAL-TIME USD PREVIEW
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

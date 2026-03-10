import React from 'react';

const SummaryPanel = ({ expenses, totalAmount }) => {
  const categories = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];
  
  const getCategoryTotal = (category) => {
    return expenses
      .filter(exp => exp.category === category)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  };

  return (
    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          Total Outflow
        </p>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: 1 }}>
          ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', color: 'hsl(var(--accent-secondary))' }}>Allocation Insights</h4>
        {categories.map(cat => {
          const catTotal = getCategoryTotal(cat);
          const percentage = totalAmount > 0 ? (catTotal / totalAmount) * 100 : 0;
          
          return (
            <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600' }}>
                <span style={{ color: 'hsl(var(--text-secondary))' }}>{cat}</span>
                <span>${catTotal.toFixed(0)} <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>({percentage.toFixed(0)}%)</span></span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${percentage}%`, 
                  height: '100%', 
                  background: percentage > 40 ? 'hsl(var(--accent-primary))' : 'hsl(var(--accent-secondary))',
                  transition: 'width 1.5s ease-out'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryPanel;

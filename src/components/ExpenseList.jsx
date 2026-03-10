import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food': return 'hsl(var(--accent-secondary))';
      case 'Travel': return 'hsl(var(--accent-primary))';
      case 'Marketing': return 'hsl(280, 90%, 70%)';
      case 'Utilities': return 'hsl(var(--accent-gold))';
      default: return 'hsl(var(--text-secondary))';
    }
  };

  return (
    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        {expenses.length === 0 ? (
          <div style={{ flex: 1, textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>🌘</div>
            <h4 style={{ color: 'hsl(var(--text-secondary))' }}>No records found in this cycle</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Try broadening your filters or add a new entry.</p>
          </div>
        ) : (
          expenses.map(expense => (
            <div
              key={expense.id}
              className="glass"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                borderLeft: `6px solid ${getCategoryColor(expense.category)}`,
                animation: 'fade-in-up 0.5s ease-out'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '800', color: getCategoryColor(expense.category), textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {expense.category}
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{expense.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                  {expense.date || 'Pending sync...'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <span style={{ fontWeight: '900', fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                  ${parseFloat(expense.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  style={{
                    background: 'rgba(255, 50, 50, 0.1)',
                    color: 'hsl(var(--accent-danger))',
                    padding: '0.6rem 1rem',
                    fontSize: '0.75rem',
                    borderRadius: '12px',
                    fontWeight: '800'
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          )).reverse()
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

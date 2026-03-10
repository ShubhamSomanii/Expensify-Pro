import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Food'
  });

  const categories = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;
    
    onAddExpense(formData);
    setFormData({ name: '', amount: '', category: 'Food' });
  };

  return (
    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
      <h3 style={{ marginBottom: '2rem', fontSize: '1.4rem', color: 'hsl(var(--accent-primary))', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>➕</span> New Transaction
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'hsl(var(--text-secondary))', textTransform: 'uppercase' }}>Label</label>
          <input
            type="text"
            placeholder="e.g. AWS Credits"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'hsl(var(--text-secondary))', textTransform: 'uppercase' }}>Amount ($)</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'hsl(var(--text-secondary))', textTransform: 'uppercase' }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="glass"
          style={{
            background: 'hsl(var(--accent-primary))',
            color: 'white',
            padding: '1.2rem',
            marginTop: '1rem',
            fontSize: '1rem',
            fontWeight: '700'
          }}
        >
          Confirm Transaction
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

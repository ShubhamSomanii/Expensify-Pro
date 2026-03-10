import React, { useState, useEffect, useMemo } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? parseFloat(saved) : 2000;
  });

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now(), date: new Date().toLocaleDateString() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const exportToCSV = () => {
    const headers = ['Name,Amount,Category,Date'];
    const rows = expenses.map(e => `${e.name},${e.amount},${e.category},${e.date}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const totalAmount = useMemo(() => 
    expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
  , [expenses]);

  const filteredExpenses = useMemo(() => 
    filter === 'All' ? expenses : expenses.filter(e => e.category === filter)
  , [expenses, filter]);

  const budgetUsage = (totalAmount / budget) * 100;

  return (
    <div className="container">
      <header style={{ marginBottom: '4rem', textAlign: 'center', position: 'relative' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', color: 'hsl(var(--accent-secondary))', fontWeight: '800', marginBottom: '1rem' }}>
          Intelligent Finance
        </p>
        <h1 className="total-display" style={{ marginBottom: '1rem' }}>
          Expensify Pro
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <span className="glass" style={{ padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem' }}>
            v2.0 Extreme
          </span>
          <button onClick={exportToCSV} className="glass" style={{ padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)' }}>
            📥 Export CSV
          </button>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ color: 'hsl(var(--text-secondary))' }}>Monthly Budget</h4>
              <input 
                type="number" 
                value={budget} 
                onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                style={{ width: '100px', padding: '0.4rem', fontSize: '0.9rem', textAlign: 'right' }}
              />
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{ 
                width: `${Math.min(budgetUsage, 100)}%`, 
                height: '100%', 
                background: budgetUsage > 100 ? 'hsl(var(--accent-danger))' : 'linear-gradient(90deg, hsl(var(--accent-secondary)), hsl(var(--accent-primary)))',
                transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
              <span>{budgetUsage.toFixed(1)}% used</span>
              <span>${totalAmount.toFixed(0)} / ${budget}</span>
            </div>
          </div>

          <SummaryPanel expenses={expenses} totalAmount={totalAmount} />
          <ExpenseForm onAddExpense={addExpense} />
          <CurrencyConverter totalAmount={totalAmount} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.8rem' }}>Ledger</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Food', 'Travel', 'Marketing', 'Utilities', 'Other'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="glass"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem',
                    background: filter === cat ? 'hsl(var(--accent-primary))' : 'transparent',
                    color: filter === cat ? 'white' : 'hsl(var(--text-secondary))',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
        </div>
      </main>

      <section id="features" style={{ marginTop: '8rem', padding: '6rem 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '900' }}>Future of Finance.</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.2rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.8' }}>
          Experience the most advanced personal expense tracker built with modern architecture and breathtaking visuals. 
          Manage your wealth with confidence and style.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {[
            { title: 'Neural Sync', desc: 'Real-time global currency analysis powered by high-speed APIs.', icon: '⚡' },
            { title: 'Smart Budget', desc: 'Visual markers for budget usage with dynamic color feedback.', icon: '🎯' },
            { title: 'Deep Insight', desc: 'Categorical breakdown of every cent spent across your lifecycle.', icon: '📉' }
          ].map(f => (
            <div key={f.title} className="glass" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', textAlign: 'left' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <button 
          className="glass" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ 
            padding: '1.2rem 3rem', 
            borderRadius: 'var(--radius-md)', 
            color: 'white', 
            fontSize: '1.1rem',
            border: '1px solid hsl(var(--accent-primary))',
            fontWeight: '700',
            letterSpacing: '0.05em'
          }}
        >
          GO BEYOND ↑
        </button>
      </section>
    </div>
  );
};

export default App;

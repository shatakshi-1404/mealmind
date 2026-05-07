import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ ingredients: 0, meals: 0, calories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ingRes, mealRes] = await Promise.all([
          API.get('/ingredients'),
          API.get('/meals')
        ]);
        const todayCalories = mealRes.data
          .filter(m => new Date(m.date).toDateString() === new Date().toDateString())
          .reduce((sum, m) => sum + (m.calories || 0), 0);

        setStats({
          ingredients: ingRes.data.length,
          meals: mealRes.data.length,
          calories: todayCalories
        });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const statCards = [
    { emoji: '🧺', label: 'Items in Pantry', value: stats.ingredients, color: '#FFF9C4', border: '#FFD600' },
    { emoji: '🍽️', label: 'Meals Logged', value: stats.meals, color: '#FFF3E0', border: '#FF6B2B' },
    { emoji: '🔥', label: "Today's Calories", value: stats.calories, color: '#E8F5E9', border: '#4CAF50' },
  ];

  if (loading) return <Loader text="Warming up the kitchen... 🍳" />;

  return (
    <div className="page-container">
      <div style={{
        background: 'linear-gradient(135deg, #FFD600, #FF6B2B)',
        borderRadius: 24, padding: '36px 40px', marginBottom: 36,
        color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ fontSize: '6rem', position: 'absolute', right: 30, top: -10, opacity: 0.3 }}>🍱</div>
        <h1 style={{ fontFamily: 'Fredoka One', fontSize: '2.4rem', marginBottom: 8 }}>
          Hey {user?.name}! 👋
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          What are we cooking today? Let's check your pantry 🥘
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: 36 }}>
        {statCards.map((card, i) => (
          <div key={i} className="card fade-in" style={{
            background: card.color, borderColor: card.border,
            textAlign: 'center', animationDelay: `${i * 0.1}s`
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 8 }}>{card.emoji}</div>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Fredoka One', color: '#1A1A2E' }}>
              {card.value}
            </div>
            <div style={{ color: '#666', fontWeight: 600 }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 20, fontSize: '1.6rem' }}>🚀 Quick Actions</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { href: '/pantry', label: '➕ Add Ingredients', style: 'btn-yellow' },
            { href: '/recipes', label: '🤖 Get AI Recipes', style: 'btn-primary' },
            { href: '/meallog', label: '📋 Log a Meal', style: 'btn-yellow' },
          ].map((btn, i) => (
            <a key={i} href={btn.href} className={`btn ${btn.style}`} style={{ textDecoration: 'none' }}>
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
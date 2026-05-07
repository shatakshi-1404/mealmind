import { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';

const mealEmojis = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍿' };

const MealLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calorieGoal] = useState(2000);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await API.get('/meals');
        setLogs(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchLogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/meals/${id}`);
      setLogs(logs.filter(l => l._id !== id));
    } catch (err) { console.error(err); }
  };

  const todayLogs = logs.filter(l => new Date(l.date).toDateString() === new Date().toDateString());
  const todayCalories = todayLogs.reduce((sum, l) => sum + (l.calories || 0), 0);
  const progress = Math.min((todayCalories / calorieGoal) * 100, 100);

  const grouped = logs.reduce((acc, log) => {
    const date = new Date(log.date).toDateString();
    acc[date] = acc[date] || [];
    acc[date].push(log);
    return acc;
  }, {});

  if (loading) return <Loader text="Fetching your food diary... 📋" />;

  return (
    <div className="page-container">
      <h1 className="page-title">📋 Meal Log</h1>
      <p className="page-subtitle">Track what you eat, hit your goals 💪</p>

      {/* Calorie Progress */}
      <div className="card" style={{ marginBottom: 30, background: 'linear-gradient(135deg, #FFF9C4, #FFD600)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: '1.3rem' }}>🔥 Today's Calories</h3>
          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
            {todayCalories} / {calorieGoal} kcal
          </span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 50, height: 16, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 50, transition: 'width 0.5s ease',
            width: `${progress}%`,
            background: progress > 90 ? '#F44336' : progress > 70 ? '#FF6B2B' : '#4CAF50'
          }} />
        </div>
        <div style={{ marginTop: 8, fontSize: '0.9rem', color: '#666' }}>
          {progress >= 100 ? '⚠️ Daily limit reached!' : `✅ ${calorieGoal - todayCalories} kcal remaining`}
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="empty-state card">
          <span className="emoji">🍽️</span>
          <h3>No meals logged yet!</h3>
          <p>Go to Recipes, get AI suggestions, and log your meals 🤖</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, dayLogs]) => (
          <div key={date} style={{ marginBottom: 28 }}>
            <h3 style={{ marginBottom: 14, fontSize: '1.1rem', color: '#888' }}>
              📅 {date === new Date().toDateString() ? '🟢 Today' : date}
              <span style={{ marginLeft: 8, fontSize: '0.9rem' }}>
                — {dayLogs.reduce((s, l) => s + (l.calories || 0), 0)} kcal total
              </span>
            </h3>
            <div className="grid-2">
              {dayLogs.map(log => (
                <div key={log._id} className="card fade-in" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                      {mealEmojis[log.mealType]} {log.recipeName}
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <span className="tag tag-orange">🔥 {log.calories || 0} kcal</span>
                      <span className="tag tag-blue" style={{ marginLeft: 6 }}>
                        {log.mealType}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleDelete(log._id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MealLog;
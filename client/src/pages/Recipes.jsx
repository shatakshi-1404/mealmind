import { useState } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [logged, setLogged] = useState({});

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/recipes/suggest');
      setRecipes(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error fetching recipes');
    } finally { setLoading(false); }
  };

  const logMeal = async (recipe) => {
    try {
      await API.post('/meals', {
        recipeName: recipe.name,
        calories: recipe.calories,
        mealType: 'lunch'
      });
      setLogged(prev => ({ ...prev, [recipe.name]: true }));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🍳 AI Recipe Suggestions</h1>
      <p className="page-subtitle">Tell me what's in your pantry, and I'll cook up some ideas! 🤖</p>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <button className="btn btn-primary" onClick={fetchRecipes} disabled={loading}
          style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
          {loading ? '🤖 Thinking...' : '✨ Suggest Recipes from My Pantry'}
        </button>
        <p style={{ color: '#aaa', marginTop: 12, fontSize: '0.9rem' }}>
          Powered by Google Gemini AI 🧠
        </p>
      </div>

      {loading && <Loader text="AI is cooking up ideas... 🧑‍🍳" />}

      {!loading && recipes.length === 0 && (
        <div className="empty-state card">
          <span className="emoji">🤖</span>
          <h3>No recipes yet!</h3>
          <p>Make sure you've added ingredients to your pantry first 🧺</p>
        </div>
      )}

      <div className="grid-2">
        {recipes.map((recipe, i) => (
          <div key={i} className="card fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontSize: '1.3rem', color: '#1A1A2E' }}>🍽️ {recipe.name}</h3>
              <span style={{
                background: '#FFD600', color: '#1A1A2E', padding: '4px 12px',
                borderRadius: 20, fontWeight: 800, fontSize: '0.85rem', whiteSpace: 'nowrap'
              }}>
                🔥 {recipe.calories} kcal
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 12 }}>
              ⏱️ {recipe.prepTime}
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 6, color: '#555' }}>✅ You have:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {recipe.ingredients_used?.map((ing, j) => (
                  <span key={j} className="tag tag-green">🥦 {ing}</span>
                ))}
              </div>
            </div>

            {recipe.ingredients_missing?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 6, color: '#555' }}>🛒 You need:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {recipe.ingredients_missing.map((ing, j) => (
                    <span key={j} className="tag tag-orange">🛒 {ing}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ background: 'none', border: 'none', color: '#FF6B2B', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}>
                {expanded === i ? '🔼 Hide Instructions' : '🔽 Show Instructions'}
              </button>
              {expanded === i && (
                <div style={{ marginTop: 10, padding: 14, background: '#FFFDE7', borderRadius: 12, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  📝 {recipe.instructions}
                </div>
              )}
            </div>

            <button className="btn btn-yellow" style={{ width: '100%' }}
              onClick={() => logMeal(recipe)} disabled={logged[recipe.name]}>
              {logged[recipe.name] ? '✅ Logged!' : '📋 Log This Meal'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
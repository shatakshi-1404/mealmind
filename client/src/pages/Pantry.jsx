import { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';

const categoryEmojis = {
  vegetable: '🥦', fruit: '🍎', dairy: '🧀',
  meat: '🥩', grain: '🌾', spice: '🌶️', other: '🥫'
};

const Pantry = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', quantity: '', category: 'other', expiryDate: '' });
  const [showForm, setShowForm] = useState(false);

  const fetchIngredients = async () => {
    try {
      const { data } = await API.get('/ingredients');
      setIngredients(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchIngredients(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await API.post('/ingredients', form);
      setForm({ name: '', quantity: '', category: 'other', expiryDate: '' });
      setShowForm(false);
      fetchIngredients();
    } catch (err) { console.error(err); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/ingredients/${id}`);
      setIngredients(ingredients.filter(i => i._id !== id));
    } catch (err) { console.error(err); }
  };

  const grouped = ingredients.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  if (loading) return <Loader text="Checking your fridge... 🧊" />;

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 }}>
        <div>
          <h1 className="page-title">🧺 My Pantry</h1>
          <p className="page-subtitle">You have {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} stocked up</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Add Ingredient'}
        </button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 30, background: '#FFFDE7', borderColor: '#FFD600' }}>
          <h3 style={{ marginBottom: 20, fontSize: '1.3rem' }}>➕ Add to Pantry</h3>
          <form onSubmit={handleAdd}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: 6 }}>🏷️ Name</label>
                <input className="input" placeholder="e.g. Chicken" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: 6 }}>⚖️ Quantity</label>
                <input className="input" placeholder="e.g. 500g" value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })} />
              </div>
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: 6 }}>📦 Category</label>
                <select className="input" value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}>
                  {Object.keys(categoryEmojis).map(c => (
                    <option key={c} value={c}>{categoryEmojis[c]} {c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: 6 }}>📅 Expiry Date</label>
                <input className="input" type="date" value={form.expiryDate}
                  onChange={e => setForm({ ...form, expiryDate: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={adding}>
              {adding ? '⏳ Adding...' : '✅ Add to Pantry'}
            </button>
          </form>
        </div>
      )}

      {ingredients.length === 0 ? (
        <div className="empty-state card">
          <span className="emoji">🥺</span>
          <h3>Your pantry is empty!</h3>
          <p>Add some ingredients and let AI suggest recipes 🤖</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 28 }}>
            <h3 style={{ marginBottom: 14, fontSize: '1.2rem', color: '#555' }}>
              {categoryEmojis[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
              <span style={{ marginLeft: 8, fontSize: '0.9rem', color: '#aaa' }}>({items.length})</span>
            </h3>
            <div className="grid-3">
              {items.map(item => (
                <div key={item._id} className="card fade-in" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                      {categoryEmojis[item.category]} {item.name}
                    </div>
                    {item.quantity && <div style={{ color: '#888', fontSize: '0.85rem', marginTop: 2 }}>📦 {item.quantity}</div>}
                    {item.expiryDate && (
                      <div style={{ color: '#FF6B2B', fontSize: '0.8rem', marginTop: 2 }}>
                        📅 Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Pantry;
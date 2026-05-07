import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  const links = [
    { to: '/dashboard', label: '🏠 Home' },
    { to: '/pantry', label: '🧺 Pantry' },
    { to: '/recipes', label: '🍳 Recipes' },
    { to: '/meallog', label: '📋 Meal Log' },
  ];

  return (
    <nav style={{
      background: '#FFD600',
      padding: '0 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(255,214,0,0.4)',
      position: 'sticky', top: 0, zIndex: 100,
      height: 70
    }}>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontFamily: 'Fredoka One', fontSize: '1.8rem', color: '#1A1A2E' }}>
          🍱 MealMind
        </h1>
      </Link>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {links.map(link => (
          <Link key={link.to} to={link.to} style={{
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 50,
            fontWeight: 800,
            fontSize: '0.9rem',
            color: location.pathname === link.to ? 'white' : '#1A1A2E',
            background: location.pathname === link.to ? '#FF6B2B' : 'transparent',
            transition: 'all 0.2s'
          }}>{link.label}</Link>
        ))}

        <span style={{ marginLeft: 8, fontWeight: 700, color: '#1A1A2E' }}>
          👋 {user?.name}
        </span>
        <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(250,248,245,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 72, gap: 32 }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--charcoal)', letterSpacing: 2, flexShrink: 0 }}>
          LUXE
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 28, flexShrink: 0 }}>
          {[['Shop', '/products'], ['Featured', '/products?featured=true']].map(([label, path]) => (
            <Link key={label} to={path} style={{
              fontSize: 14, fontWeight: 500, letterSpacing: 0.5,
              color: location.pathname === path.split('?')[0] ? 'var(--gold)' : 'var(--charcoal)',
              transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = location.pathname === path.split('?')[0] ? 'var(--gold)' : 'var(--charcoal)'}
            >{label}</Link>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: 360 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%', padding: '10px 40px 10px 16px',
                border: '1.5px solid var(--border)', borderRadius: 50,
                background: 'white', fontSize: 14, fontFamily: 'var(--font-body)',
                color: 'var(--charcoal)', outline: 'none', transition: 'border 0.2s'
              }}
              onFocus={e => e.target.style.border = '1.5px solid var(--gold)'}
              onBlur={e => e.target.style.border = '1.5px solid var(--border)'}
            />
            <button type="submit" style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', fontSize: 16, color: 'var(--warm-gray)'
            }}>🔍</button>
          </div>
        </form>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
          <Link to="/admin" style={{
            fontSize: 13, fontWeight: 500, color: 'var(--warm-gray)', letterSpacing: 0.5,
            padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 20,
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--warm-gray)'; }}
          >Admin</Link>

          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: 8 }}>
            <span style={{ fontSize: 22 }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0,
                background: 'var(--gold)', color: 'white',
                borderRadius: '50%', width: 18, height: 18,
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

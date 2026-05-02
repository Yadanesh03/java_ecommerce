import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { name: 'Electronics', icon: '💻', desc: 'Gadgets & tech' },
  { name: 'Clothing', icon: '👗', desc: 'Style & fashion' },
  { name: 'Home & Kitchen', icon: '🏠', desc: 'For your space' },
  { name: 'Books', icon: '📚', desc: 'Knowledge & stories' },
  { name: 'Sports', icon: '⚡', desc: 'Active lifestyle' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getFeatured()
      .then(r => setFeatured(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 50%, #1a1a1a 100%)',
        position: 'relative', overflow: 'hidden', paddingTop: 72
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
          top: -100, right: -100, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          bottom: 50, left: -50, pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 24px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 50, padding: '6px 20px', fontSize: 12, fontWeight: 600,
            letterSpacing: 2, color: 'var(--gold)', marginBottom: 28, textTransform: 'uppercase'
          }}>New Collection 2024</div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700, color: 'white', lineHeight: 1.05, marginBottom: 24,
            animation: 'fadeUp 0.8s ease both'
          }}>
            Curated for the<br />
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>discerning</span> few.
          </h1>

          <p style={{
            fontSize: 18, color: '#aaa', maxWidth: 540, margin: '0 auto 40px',
            lineHeight: 1.7, animation: 'fadeUp 0.8s ease 0.1s both'
          }}>
            Premium products, thoughtfully selected. Where quality meets elegance.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.8s ease 0.2s both' }}>
            <Link to="/products" style={{
              background: 'var(--gold)', color: 'white', padding: '16px 40px',
              borderRadius: 50, fontWeight: 600, fontSize: 15, letterSpacing: 0.5,
              transition: 'all 0.2s', display: 'inline-block'
            }}
              onMouseEnter={e => e.target.style.background = '#b8932e'}
              onMouseLeave={e => e.target.style.background = 'var(--gold)'}
            >Shop Now</Link>
            <Link to="/products?featured=true" style={{
              background: 'transparent', color: 'white', padding: '16px 40px',
              border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 50,
              fontWeight: 500, fontSize: 15, transition: 'all 0.2s', display: 'inline-block'
            }}
              onMouseEnter={e => e.target.style.borderColor = 'var(--gold)'}
              onMouseLeave={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
            >View Featured</Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap', animation: 'fadeUp 0.8s ease 0.3s both' }}>
            {[['500+', 'Products'], ['50K+', 'Happy Customers'], ['4.8★', 'Average Rating']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--gold)' }}>{num}</div>
                <div style={{ fontSize: 13, color: '#777', letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>EXPLORE</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>Shop by Category</h2>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`}
                style={{
                  flex: '1 1 180px', maxWidth: 220,
                  background: 'white', borderRadius: 16, padding: '28px 20px',
                  textAlign: 'center', textDecoration: 'none', color: 'inherit',
                  boxShadow: 'var(--shadow-soft)', transition: 'all 0.3s ease',
                  animation: `fadeUp 0.4s ease ${i * 0.08}s both`
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{cat.name}</div>
                <div style={{ fontSize: 13, color: 'var(--warm-gray)' }}>{cat.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '60px 0 80px', background: '#f5f2ed' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>HANDPICKED</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700 }}>Featured Products</h2>
            </div>
            <Link to="/products" style={{
              color: 'var(--charcoal)', fontWeight: 500, fontSize: 14, letterSpacing: 0.5,
              borderBottom: '2px solid var(--gold)', paddingBottom: 2
            }}>View All →</Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 12, overflow: 'hidden' }}>
                  <div className="skeleton" style={{ height: 220 }} />
                  <div style={{ padding: 18 }}>
                    <div className="skeleton" style={{ height: 14, marginBottom: 8, width: '60%' }} />
                    <div className="skeleton" style={{ height: 18, marginBottom: 12 }} />
                    <div className="skeleton" style={{ height: 36 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {featured.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
            </div>
          )}
        </div>
      </section>

      {/* BANNER */}
      <section style={{
        background: 'var(--charcoal)', padding: '80px 24px', textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>LIMITED TIME</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
            Free Shipping on Orders Over $99
          </h2>
          <p style={{ color: '#888', fontSize: 16, marginBottom: 32 }}>
            Use code <span style={{ color: 'var(--gold)', fontWeight: 600 }}>LUXE2024</span> at checkout
          </p>
          <Link to="/products" style={{
            background: 'var(--gold)', color: 'white', padding: '14px 36px',
            borderRadius: 50, fontWeight: 600, fontSize: 15, display: 'inline-block'
          }}>Shop Now</Link>
        </div>
      </section>
    </div>
  );
}

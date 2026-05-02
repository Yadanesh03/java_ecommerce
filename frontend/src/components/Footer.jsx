import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'white', marginTop: 80 }}>
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--gold)' }}>LUXE</div>
            <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.7 }}>
              Premium products curated for the discerning customer. Quality over quantity, always.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: 'var(--gold)', marginBottom: 16 }}>SHOP</div>
            {['All Products', 'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports'].map(cat => (
              <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                style={{ display: 'block', fontSize: 14, color: '#aaa', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#aaa'}
              >{cat}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: 'var(--gold)', marginBottom: 16 }}>SUPPORT</div>
            {['FAQ', 'Shipping Policy', 'Return Policy', 'Contact Us'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#aaa', marginBottom: 8 }}>{item}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: 'var(--gold)', marginBottom: 16 }}>NEWSLETTER</div>
            <p style={{ fontSize: 14, color: '#aaa', marginBottom: 16 }}>Get exclusive deals and new arrivals straight to your inbox.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Your email" style={{
                flex: 1, padding: '10px 14px', background: '#2a2a2a', border: '1px solid #444',
                borderRadius: 8, color: 'white', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none'
              }} />
              <button style={{
                background: 'var(--gold)', color: 'white', border: 'none',
                padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500
              }}>→</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#666' }}>© 2024 LUXE. All rights reserved.</span>
          <span style={{ fontSize: 13, color: '#666' }}>Built with Spring Boot + React</span>
        </div>
      </div>
    </footer>
  );
}

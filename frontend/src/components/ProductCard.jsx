import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name.slice(0, 20)}... added!`, {
      style: { fontFamily: 'var(--font-body)', fontSize: 14 }
    });
  };

  const fallbackImg = `https://placehold.co/400x300/f5f0e8/c9a84c?text=${encodeURIComponent(product.name.slice(0,10))}`;

  return (
    <Link to={`/products/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', background: 'white', borderRadius: 'var(--radius)',
        overflow: 'hidden', textDecoration: 'none', color: 'inherit',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow-soft)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animation: `fadeUp 0.4s ease ${delay}s both`,
      }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#f9f6f1' }}>
        <img
          src={imgError ? fallbackImg : product.imageUrl}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease'
          }}
        />
        {product.stock === 0 && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 600, letterSpacing: 2, fontSize: 13 }}>SOLD OUT</span>
          </div>
        )}
        {product.featured && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'var(--gold)', color: 'white',
            fontSize: 11, fontWeight: 600, letterSpacing: 1,
            padding: '4px 10px', borderRadius: 20
          }}>FEATURED</div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--warm-gray)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
          {product.category}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, lineHeight: 1.4, color: 'var(--charcoal)' }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ fontSize: 12, color: s <= Math.round(product.rating) ? '#f0b429' : '#ddd' }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--warm-gray)' }}>({product.reviewCount?.toLocaleString()})</span>
        </div>

        {/* Price + Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--charcoal)' }}>
            ${product.price?.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              background: product.stock === 0 ? '#ddd' : 'var(--charcoal)',
              color: 'white', border: 'none',
              padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              transform: hovered && product.stock > 0 ? 'scale(1.03)' : 'scale(1)'
            }}
            onMouseEnter={e => { if (product.stock > 0) e.target.style.background = 'var(--gold)'; }}
            onMouseLeave={e => { if (product.stock > 0) e.target.style.background = 'var(--charcoal)'; }}
          >
            {product.stock === 0 ? 'Sold Out' : '+ Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}

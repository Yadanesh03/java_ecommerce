import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getById(id)
      .then(r => setProduct(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name.slice(0, 20)}... added to cart!`);
  };

  if (loading) return (
    <div style={{ paddingTop: 72, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 32 }}>⏳</div>
    </div>
  );

  if (!product) return (
    <div style={{ paddingTop: 72, textAlign: 'center', padding: '120px 24px' }}>
      <h2>Product not found</h2>
      <Link to="/products" style={{ color: 'var(--gold)' }}>← Back to products</Link>
    </div>
  );

  const fallbackImg = `https://placehold.co/600x500/f5f0e8/c9a84c?text=${encodeURIComponent(product.name.slice(0,10))}`;

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="container" style={{ padding: '48px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--warm-gray)' }}>Home</Link> /
          <Link to="/products" style={{ color: 'var(--warm-gray)' }}>Products</Link> /
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} style={{ color: 'var(--warm-gray)' }}>{product.category}</Link> /
          <span style={{ color: 'var(--charcoal)' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          {/* Image */}
          <div style={{ borderRadius: 20, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow-soft)', aspectRatio: '4/3' }}>
            <img
              src={imgError ? fallbackImg : product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Info */}
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            {product.featured && (
              <div style={{
                display: 'inline-block', background: 'var(--gold)', color: 'white',
                fontSize: 11, fontWeight: 600, letterSpacing: 1.5, padding: '4px 12px',
                borderRadius: 20, marginBottom: 16, textTransform: 'uppercase'
              }}>Featured</div>
            )}
            <div style={{ fontSize: 13, color: 'var(--warm-gray)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>{product.category}</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ fontSize: 18, color: s <= Math.round(product.rating) ? '#f0b429' : '#ddd' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 14, color: 'var(--warm-gray)' }}>{product.rating} ({product.reviewCount?.toLocaleString()} reviews)</span>
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 24 }}>
              ${product.price?.toFixed(2)}
            </div>

            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, marginBottom: 32 }}>{product.description}</p>

            {/* Stock */}
            <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: product.stock > 0 ? 'var(--green)' : 'var(--red)'
              }} />
              <span style={{ fontSize: 14, color: product.stock > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>

            {/* Qty + Add */}
            {product.stock > 0 && (
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '12px 18px', background: 'none', fontSize: 18, color: 'var(--charcoal)', border: 'none' }}>−</button>
                  <span style={{ padding: '12px 20px', fontSize: 16, fontWeight: 600, borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ padding: '12px 18px', background: 'none', fontSize: 18, color: 'var(--charcoal)', border: 'none' }}>+</button>
                </div>
                <button onClick={handleAddToCart} style={{
                  flex: 1, background: 'var(--charcoal)', color: 'white',
                  padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'background 0.2s'
                }}
                  onMouseEnter={e => e.target.style.background = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.background = 'var(--charcoal)'}
                >Add to Cart</button>
              </div>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Free Shipping $99+', 'Easy Returns', 'Secure Payment'].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, color: 'var(--warm-gray)', padding: '5px 12px',
                  border: '1px solid var(--border)', borderRadius: 20
                }}>✓ {tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

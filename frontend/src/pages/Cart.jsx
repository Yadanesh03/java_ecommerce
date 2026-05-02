import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div style={{ paddingTop: 72, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 64 }}>🛒</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>Your cart is empty</h2>
      <p style={{ color: 'var(--warm-gray)' }}>Discover something you'll love</p>
      <Link to="/products" style={{
        background: 'var(--charcoal)', color: 'white', padding: '12px 32px',
        borderRadius: 50, fontWeight: 600, marginTop: 8, display: 'inline-block'
      }}>Shop Now</Link>
    </div>
  );

  const shipping = cartTotal >= 99 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="container" style={{ padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, marginBottom: 36 }}>Your Cart</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{
                background: 'white', borderRadius: 14, padding: 20,
                display: 'flex', gap: 20, alignItems: 'center',
                boxShadow: 'var(--shadow-soft)', animation: 'fadeUp 0.3s ease both'
              }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  onError={e => e.target.src = `https://placehold.co/100x80/f5f0e8/c9a84c?text=${encodeURIComponent(item.name.slice(0,5))}`}
                  style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--warm-gray)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{item.category}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--charcoal)' }}>${item.price.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid var(--border)', borderRadius: 8 }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '8px 14px', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer' }}>−</button>
                  <span style={{ padding: '8px 12px', fontWeight: 600, borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '8px 14px', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer' }}>+</button>
                </div>
                <div style={{ textAlign: 'right', minWidth: 80 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow-soft)', position: 'sticky', top: 90 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Order Summary</h3>

            {[['Subtotal', `$${cartTotal.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`], ['Tax (8%)', `$${tax.toFixed(2)}`]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 14 }}>
                <span style={{ color: 'var(--warm-gray)' }}>{label}</span>
                <span style={{ fontWeight: 500, color: val === 'FREE' ? 'var(--green)' : 'var(--charcoal)' }}>{val}</span>
              </div>
            ))}

            <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: 16, marginTop: 8, display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>${orderTotal.toFixed(2)}</span>
            </div>

            {cartTotal < 99 && (
              <div style={{ background: '#fff8e6', border: '1px solid var(--gold-light)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#8a6a00' }}>
                Add ${(99 - cartTotal).toFixed(2)} more for free shipping!
              </div>
            )}

            <button onClick={() => navigate('/checkout')} style={{
              width: '100%', background: 'var(--charcoal)', color: 'white',
              padding: '15px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              border: 'none', cursor: 'pointer', transition: 'background 0.2s', marginBottom: 12
            }}
              onMouseEnter={e => e.target.style.background = 'var(--gold)'}
              onMouseLeave={e => e.target.style.background = 'var(--charcoal)'}
            >Proceed to Checkout</button>
            <Link to="/products" style={{ display: 'block', textAlign: 'center', fontSize: 14, color: 'var(--warm-gray)' }}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

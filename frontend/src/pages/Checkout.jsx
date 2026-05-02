import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping = cartTotal >= 99 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (form.zip.length < 4) e.zip = 'Valid ZIP required';
    if (form.card.replace(/\s/g,'').length < 16) e.card = 'Valid card number required';
    if (!form.expiry.includes('/')) e.expiry = 'Format: MM/YY';
    if (form.cvv.length < 3) e.cvv = 'Valid CVV required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    try {
      const order = {
        customerName: form.name,
        customerEmail: form.email,
        customerAddress: `${form.address}, ${form.city}, ${form.zip}`,
        items: cart.map(i => ({ productId: i.id, productName: i.name, price: i.price, quantity: i.quantity }))
      };
      const res = await orderAPI.create(order);
      clearCart();
      navigate(`/order-success/${res.data.id}`);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, placeholder, type = 'text') => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: '' })); }}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '12px 14px',
          border: `1.5px solid ${errors[key] ? 'var(--red)' : 'var(--border)'}`,
          borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)',
          outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'
        }}
        onFocus={e => e.target.style.border = `1.5px solid ${errors[key] ? 'var(--red)' : 'var(--gold)'}`}
        onBlur={e => e.target.style.border = `1.5px solid ${errors[key] ? 'var(--red)' : 'var(--border)'}`}
      />
      {errors[key] && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors[key]}</div>}
    </div>
  );

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="container" style={{ padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, marginBottom: 36 }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Shipping */}
            <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: 'var(--charcoal)', color: 'white', width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>1</span>
                Shipping Information
              </h3>
              {field('name', 'Full Name', 'John Doe')}
              {field('email', 'Email Address', 'john@example.com', 'email')}
              {field('address', 'Street Address', '123 Main Street')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {field('city', 'City', 'New York')}
                {field('zip', 'ZIP Code', '10001')}
              </div>
            </div>

            {/* Payment */}
            <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: 'var(--charcoal)', color: 'white', width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>2</span>
                Payment Details
              </h3>
              <div style={{ background: '#fffbf0', border: '1px solid var(--gold-light)', borderRadius: 8, padding: '10px 14px', marginBottom: 18, fontSize: 13, color: '#8a6a00' }}>
                🔒 Demo mode — use any card number (e.g. 4242 4242 4242 4242)
              </div>
              {field('card', 'Card Number', '4242 4242 4242 4242')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {field('expiry', 'Expiry Date', 'MM/YY')}
                {field('cvv', 'CVV', '123')}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow-soft)', position: 'sticky', top: 90 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>

            <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 16 }}>
              {cart.map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10, alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 500 }}>{i.name.slice(0, 24)}{i.name.length > 24 ? '…' : ''}</span>
                    <span style={{ color: 'var(--warm-gray)' }}> × {i.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              {[['Subtotal', `$${cartTotal.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`], ['Tax', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                  <span style={{ color: 'var(--warm-gray)' }}>{l}</span>
                  <span style={{ color: v === 'FREE' ? 'var(--green)' : 'inherit', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid var(--border)', paddingTop: 14, marginTop: 4 }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{
              width: '100%', background: loading ? '#aaa' : 'var(--gold)', color: 'white',
              padding: '15px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 20,
              transition: 'background 0.2s'
            }}>{loading ? 'Placing Order...' : '🔒 Place Order'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderAPI.getById(id).then(r => setOrder(r.data)).catch(console.error);
  }, [id]);

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 560, padding: '48px 24px', animation: 'fadeUp 0.5s ease both' }}>
        <div style={{
          width: 90, height: 90, background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, margin: '0 auto 28px', boxShadow: '0 8px 24px rgba(39,174,96,0.3)'
        }}>✓</div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, marginBottom: 12, color: 'var(--charcoal)' }}>
          Order Confirmed!
        </h1>
        <p style={{ color: 'var(--warm-gray)', fontSize: 16, marginBottom: 8 }}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div style={{ fontSize: 15, color: 'var(--gold)', fontWeight: 600, marginBottom: 32 }}>
          Order #{id}
        </div>

        {order && (
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow-soft)', marginBottom: 32, textAlign: 'left' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--charcoal)' }}>Order Details</h3>
            <div style={{ fontSize: 14, color: 'var(--warm-gray)', marginBottom: 12 }}>
              <strong style={{ color: 'var(--charcoal)' }}>Customer:</strong> {order.customerName}
            </div>
            <div style={{ fontSize: 14, color: 'var(--warm-gray)', marginBottom: 12 }}>
              <strong style={{ color: 'var(--charcoal)' }}>Email:</strong> {order.customerEmail}
            </div>
            <div style={{ fontSize: 14, color: 'var(--warm-gray)', marginBottom: 16 }}>
              <strong style={{ color: 'var(--charcoal)' }}>Shipping to:</strong> {order.customerAddress}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              {order.items?.map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span>{i.productName} × {i.quantity}</span>
                  <span style={{ fontWeight: 600 }}>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8, fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>${order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{
            background: 'var(--charcoal)', color: 'white', padding: '12px 28px',
            borderRadius: 50, fontWeight: 600, fontSize: 14
          }}>Back to Home</Link>
          <Link to="/products" style={{
            background: 'white', color: 'var(--charcoal)', padding: '12px 28px',
            border: '1.5px solid var(--border)', borderRadius: 50, fontWeight: 600, fontSize: 14
          }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { productAPI, orderAPI } from '../api';
import toast from 'react-hot-toast';

const EMPTY = { name: '', description: '', price: '', category: '', imageUrl: '', stock: '', featured: false };

export default function Admin() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadData = () => {
    setLoading(true);
    Promise.all([productAPI.getAll(), orderAPI.getAll()])
      .then(([p, o]) => { setProducts(p.data); setOrders(o.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 };
    try {
      if (editing) { await productAPI.update(editing, payload); toast.success('Product updated!'); }
      else { await productAPI.create(payload); toast.success('Product created!'); }
      setForm(EMPTY); setEditing(null); setShowForm(false);
      loadData();
    } catch { toast.error('Error saving product'); }
  };

  const handleEdit = (p) => {
    setForm({ ...p, price: p.price.toString(), stock: p.stock.toString() });
    setEditing(p.id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try { await productAPI.delete(id); toast.success('Deleted!'); loadData(); }
    catch { toast.error('Error deleting'); }
  };

  const handleStatus = async (id, status) => {
    try { await orderAPI.updateStatus(id, status); loadData(); toast.success('Status updated!'); }
    catch { toast.error('Error updating status'); }
  };

  const revenue = orders.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.totalAmount, 0);

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)',
    borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)',
    outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700 }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--warm-gray)', fontSize: 14, marginTop: 4 }}>Manage your store</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            ['📦', 'Products', products.length, 'var(--charcoal)'],
            ['🛒', 'Orders', orders.length, '#2980b9'],
            ['💰', 'Revenue', `$${revenue.toFixed(0)}`, 'var(--green)'],
            ['⭐', 'Pending', orders.filter(o => o.status === 'PENDING').length, '#e67e22'],
          ].map(([icon, label, val, color]) => (
            <div key={label} style={{ background: 'white', borderRadius: 12, padding: '20px 24px', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'white', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: 'var(--shadow-soft)' }}>
          {['products', 'orders'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: tab === t ? 'var(--charcoal)' : 'transparent',
              color: tab === t ? 'white' : 'var(--warm-gray)',
              fontWeight: tab === t ? 600 : 400, fontSize: 14, fontFamily: 'var(--font-body)',
              textTransform: 'capitalize', transition: 'all 0.2s'
            }}>{t}</button>
          ))}
        </div>

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }} style={{
                background: 'var(--gold)', color: 'white', padding: '10px 22px',
                borderRadius: 8, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer'
              }}>+ Add Product</button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div style={{ background: 'white', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: 'var(--shadow-soft)', animation: 'fadeUp 0.3s ease both' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{editing ? 'Edit Product' : 'Add New Product'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['name', 'Product Name', 'text'], ['price', 'Price ($)', 'number'], ['category', 'Category', 'text'], ['stock', 'Stock', 'number'], ['imageUrl', 'Image URL', 'text']].map(([k, l, t]) => (
                    <div key={k} style={{ gridColumn: k === 'imageUrl' ? 'span 2' : 'auto' }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{l}</label>
                      <input type={t} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} style={inputStyle} />
                    </div>
                  ))}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Description</label>
                    <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
                    <label htmlFor="featured" style={{ fontSize: 14, cursor: 'pointer' }}>Featured Product</label>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  <button onClick={handleSubmit} style={{ background: 'var(--charcoal)', color: 'white', padding: '10px 24px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    {editing ? 'Update' : 'Create'} Product
                  </button>
                  <button onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY); }} style={{ background: 'var(--cream)', color: 'var(--charcoal)', padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Product Table */}
            <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9f6f1', borderBottom: '1px solid var(--border)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--warm-gray)', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--warm-gray)' }}>Loading...</td></tr>
                  ) : products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafaf9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={p.imageUrl} alt="" onError={e => e.target.style.display = 'none'} style={{ width: 44, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{p.name.slice(0, 35)}{p.name.length > 35 ? '…' : ''}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--warm-gray)' }}>{p.category}</td>
                      <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 13, color: p.stock > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>{p.stock}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 13 }}>{p.featured ? '⭐ Yes' : '—'}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => handleEdit(p)} style={{ padding: '6px 14px', background: '#e8f4fd', color: '#2980b9', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                          <button onClick={() => handleDelete(p.id)} style={{ padding: '6px 14px', background: '#fde8e8', color: 'var(--red)', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9f6f1', borderBottom: '1px solid var(--border)' }}>
                  {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--warm-gray)', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--warm-gray)' }}>Loading...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: 48, color: 'var(--warm-gray)' }}>No orders yet</td></tr>
                ) : orders.map(o => {
                  const statusColor = { PENDING: '#e67e22', PROCESSING: '#2980b9', SHIPPED: '#8e44ad', DELIVERED: '#27ae60', CANCELLED: '#c0392b' }[o.status] || '#888';
                  return (
                    <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--gold)' }}>#{o.id}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{o.customerName}</div>
                        <div style={{ fontSize: 12, color: 'var(--warm-gray)' }}>{o.customerEmail}</div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--warm-gray)' }}>{o.items?.length || 0} item(s)</td>
                      <td style={{ padding: '14px 16px', fontWeight: 700 }}>${o.totalAmount?.toFixed(2)}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: statusColor + '20', color: statusColor, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{o.status}</span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--warm-gray)' }}>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <select value={o.status} onChange={e => handleStatus(o.id, e.target.value)}
                          style={{ padding: '6px 10px', border: '1.5px solid var(--border)', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)', outline: 'none' }}>
                          {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

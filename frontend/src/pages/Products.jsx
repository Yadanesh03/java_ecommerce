import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../api';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');

  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';
  const featured = searchParams.get('featured') === 'true';

  useEffect(() => {
    productAPI.getCategories().then(r => setCategories(['All', ...r.data]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    else if (featured) { /* handled below */ }
    else if (category !== 'All') params.category = category;

    const fetch = featured ? productAPI.getFeatured() : productAPI.getAll(params);
    fetch
      .then(r => setProducts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, search, featured]);

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const setCategory = (cat) => {
    const p = new URLSearchParams();
    if (cat !== 'All') p.set('category', cat);
    setSearchParams(p);
  };

  const title = search ? `Search: "${search}"` : featured ? 'Featured Products' : category === 'All' ? 'All Products' : category;

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="container" style={{ padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 8 }}>
            {title}
          </h1>
          <p style={{ color: 'var(--warm-gray)', fontSize: 15 }}>
            {loading ? 'Loading...' : `${sorted.length} product${sorted.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* Sidebar */}
          <aside style={{ width: 220, flexShrink: 0, position: 'sticky', top: 90 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>Categories</div>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 12px', borderRadius: 8, marginBottom: 4,
                  background: category === cat ? 'var(--charcoal)' : 'transparent',
                  color: category === cat ? 'white' : 'var(--charcoal)',
                  fontSize: 14, fontWeight: category === cat ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s', border: 'none'
                }}
                  onMouseEnter={e => { if (category !== cat) e.target.style.background = 'var(--cream)'; }}
                  onMouseLeave={e => { if (category !== cat) e.target.style.background = 'transparent'; }}
                >{cat}</button>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div style={{ flex: 1 }}>
            {/* Sort bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{
                padding: '9px 16px', borderRadius: 8, border: '1.5px solid var(--border)',
                background: 'white', fontSize: 14, fontFamily: 'var(--font-body)',
                color: 'var(--charcoal)', cursor: 'pointer', outline: 'none'
              }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: 12 }}>
                    <div className="skeleton" style={{ height: 200, borderRadius: '12px 12px 0 0' }} />
                    <div style={{ padding: 16 }}>
                      <div className="skeleton" style={{ height: 12, marginBottom: 8, width: '50%' }} />
                      <div className="skeleton" style={{ height: 16, marginBottom: 12 }} />
                      <div className="skeleton" style={{ height: 32 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No products found</h3>
                <p style={{ color: 'var(--warm-gray)' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
                {sorted.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.05} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

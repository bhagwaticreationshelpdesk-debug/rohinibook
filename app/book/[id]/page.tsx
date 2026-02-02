"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import ProductActions from '../../components/ProductActions';
import { useAppContext } from '../../context/AppContext';
import { use, useEffect, useState } from 'react';

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { products } = useAppContext();
    const { id } = use(params);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const found = products.find(p => p.id === id);
        setProduct(found || null);
    }, [id, products]);

    if (!product) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <AlertCircle size={48} color="#999" style={{ marginBottom: '1rem' }} />
                <h1 style={{ color: '#666' }}>Book not found or loading...</h1>
                <Link href="/" style={{ color: '#E42B26', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>
                <Link href="/">Home</Link> / <Link href={`/category/${product.category?.toLowerCase().replace(/ /g, '-') || 'books'}`}>{(product.category || 'Books')}</Link> / <span style={{ color: '#1a1a1a', fontWeight: '500' }}>{product.title}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* Image Section */}
                <div style={{ position: 'relative', aspectRatio: '2/3', background: '#f8f8f8', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'contain', padding: '2rem' }}
                        unoptimized
                    />
                </div>

                {/* Details Section */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: '#1a1a1a', lineHeight: '1.2' }}>{product.title}</h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem', fontStyle: 'italic' }}>by <span style={{ color: '#E42B26', fontWeight: '600' }}>{product.author}</span></p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#E42B26' }}>₹{product.price}</span>
                        <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: '#999' }}>₹{product.originalPrice}</span>
                        <span style={{ background: '#e6f4ea', color: '#1e7e34', padding: '4px 8px', borderRadius: '4px', fontWeight: '700', fontSize: '0.9rem' }}>
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '1.5rem 0', margin: '1.5rem 0' }}>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            {product.description || "No description available for this book yet. Please check back later or contact us for more details."}
                        </p>
                        {product.stock <= 5 && product.stock > 0 && (
                            <p style={{ color: '#E42B26', fontWeight: '700', marginTop: '1rem' }}>Only {product.stock} left in stock!</p>
                        )}
                        {product.stock === 0 && (
                            <p style={{ color: '#666', fontWeight: '700', marginTop: '1rem' }}>Currently out of stock.</p>
                        )}
                    </div>

                    <ProductActions product={product} />

                    <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                            <Truck size={24} color="#666" style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.8rem', fontWeight: '600' }}>Free Delivery</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                            <ShieldCheck size={24} color="#666" style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.8rem', fontWeight: '600' }}>Secure Payment</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                            <RefreshCw size={24} color="#666" style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.8rem', fontWeight: '600' }}>Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
    const { wishlist } = useAppContext();

    if (wishlist.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 0', minHeight: '60vh', textAlign: 'center' }}>
                <h1 className="section-title">My Wishlist</h1>

                <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#fee2e2',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Heart size={40} color="#E42B26" />
                    </div>

                    <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a' }}>Your wishlist is empty</h2>
                    <p style={{ color: '#666', maxWidth: '400px' }}>
                        Save items you want to buy later by clicking the heart icon on any product card.
                    </p>

                    <Link href="/" style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        padding: '0.8rem 2rem',
                        background: '#E42B26',
                        color: 'white',
                        borderRadius: '6px',
                        fontWeight: '600'
                    }}>
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <h1 className="section-title" style={{ marginBottom: '3rem' }}>My Wishlist ({wishlist.length})</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '2rem'
            }}>
                {wishlist.map(product => (
                    <ProductCard key={product.id} product={{
                        id: product.id,
                        title: product.title,
                        author: product.author,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image,
                        discount: product.discount || 0
                    }} />
                ))}
            </div>
        </div>
    );
}


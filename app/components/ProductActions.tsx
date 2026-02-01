"use client";

import { Heart, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Product {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    image: string;
    description?: string;
    discount?: number;
}

export default function ProductActions({ product }: { product: Product }) {
    const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useAppContext();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.title} added to cart!`);
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
                onClick={handleAddToCart}
                style={{
                    flex: '1',
                    padding: '1rem',
                    background: '#E42B26',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(228, 43, 38, 0.3)'
                }}
            >
                <ShoppingBag size={20} /> Add to Cart
            </button>
            <button
                onClick={toggleWishlist}
                style={{
                    padding: '1rem',
                    background: isWishlisted ? '#E42B26' : 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isWishlisted ? 'white' : '#666',
                    transition: 'all 0.2s'
                }}
            >
                <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
        </div>
    );
}

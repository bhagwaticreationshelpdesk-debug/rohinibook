"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './product-card.module.css';
import { useAppContext } from '../context/AppContext';

import { Product } from '../context/AppContext';

export default function ProductCard({ product }: { product: Product }) {
    const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useAppContext();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to product page
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        alert(`${product.title} added to cart!`);
    };

    return (
        <div className={styles.card}>
            <div className={`${styles.pickupBadge} ${product.stock === 0 ? styles.outOfStock : ''}`}>
                <span>{product.stock > 0 ? '✓' : '✕'}</span> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>

            <Link href={`/book/${product.id}`} className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={220}
                    height={330}
                    className={`${styles.image} ${product.stock === 0 ? styles.grayImage : ''}`}
                    priority={false}
                    unoptimized
                />
            </Link>

            <div className={styles.details}>
                <Link href={`/book/${product.id}`}>
                    <h3 className={styles.title} title={product.title}>{product.title}</h3>
                </Link>
                <span className={styles.author}>by {product.author}</span>

                <div className={styles.priceContainer}>
                    <div className={styles.priceWrapper}>
                        <span className={styles.price}>₹{product.price}</span>
                        <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                    </div>
                    <span className={styles.discountBadge}>{product.discount || 0}% OFF</span>
                </div>

                <div className={styles.actionFooter}>
                    <button
                        onClick={handleAddToCart}
                        className={styles.addToCartBtn}
                        disabled={product.stock === 0}
                        style={{
                            opacity: product.stock === 0 ? 0.5 : 1,
                            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                            background: product.stock === 0 ? '#999' : '#E42B26'
                        }}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button
                        onClick={toggleWishlist}
                        className={styles.wishlistBtn}
                        aria-label="Add to wishlist"
                        style={{ color: isWishlisted ? '#E42B26' : '#666' }}
                    >
                        <Heart size={20} strokeWidth={2} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>
        </div>
    );
}


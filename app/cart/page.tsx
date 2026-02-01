"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import styles from './cart.module.css';

export default function CartPage() {
    const { cart, removeFromCart } = useAppContext();

    // Group items by ID to handle quantities
    const groupedCart = cart.reduce((acc: any[], product) => {
        const existingItem = acc.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ ...product, quantity: 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className={styles.cartContainer}>
                <div className={styles.emptyState}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: '#fdf2f2',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <ShoppingBag size={50} color="#E42B26" />
                    </div>
                    <h1 className="section-title">Your cart is empty</h1>
                    <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        Looks like you haven't added any books to your collection yet.
                    </p>
                    <Link href="/" className={styles.checkoutBtn} style={{ maxWidth: '250px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        Start Shopping <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Shopping Cart</h1>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>You have {cart.length} items in your bag</p>
            </div>

            <div className={styles.cartGrid}>
                <div className={styles.cartItems}>
                    {groupedCart.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImage}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.itemInfo}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 className={styles.itemTitle}>{item.title}</h3>
                                        <p className={styles.itemAuthor}>{item.author}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className={styles.itemPrice}>₹{item.price}</div>
                                        {item.quantity > 1 && (
                                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>
                                                Qty: {item.quantity} (₹{item.price * item.quantity})
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className={styles.removeBtn}
                                >
                                    <Trash2 size={16} /> Remove from cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.summaryCard}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Subtotal ({cart.length} items)</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>₹{shipping}</span>
                    </div>
                    <div className={styles.summaryRow} style={{ color: '#2e7d32', fontSize: '0.9rem' }}>
                        <span>Discount Applied</span>
                        <span>-₹0</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                    <button className={styles.checkoutBtn}>
                        Proceed to Checkout
                    </button>
                    <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#999', marginTop: '1rem' }}>
                        Shipping calculated at checkout.
                    </p>
                </div>
            </div>
        </div>
    );
}

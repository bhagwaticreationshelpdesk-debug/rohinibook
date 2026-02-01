"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, CreditCard, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const { cart, removeFromCart } = useAppContext();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = 50;
    const total = subtotal + shipping;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);

            // Clear cart logic would go here if needed per item
            // For now just keep success state
        }, 2000);
    };

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className={styles.checkoutContainer} style={{ textAlign: 'center', padding: '10rem 0' }}>
                <ShoppingBag size={60} color="#ccc" style={{ marginBottom: '2rem' }} />
                <h1 className="section-title">Your cart is empty</h1>
                <Link href="/" style={{ color: '#E42B26', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Go back to shop
                </Link>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className={styles.successOverlay}>
                <div className={styles.checkCircle}>
                    <CheckCircle size={50} />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem' }}>Order Placed!</h1>
                <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '500px' }}>
                    Thank you for your purchase from Rohini Book Depot. Your books are being prepared for shipment.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/" className={styles.placeOrderBtn} style={{ width: 'auto', padding: '0.8rem 2.5rem' }}>
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.checkoutContainer}>
            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', marginBottom: '2rem', textDecoration: 'none' }}>
                <ArrowLeft size={20} /> Back to Cart
            </Link>

            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>Checkout</h1>

            <form onSubmit={handlePlaceOrder} className={styles.checkoutGrid}>
                <div className={styles.checkoutForm}>
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}><MapPin size={24} color="#E42B26" /> Shipping Information</h2>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>First Name</label>
                                <input type="text" required className={styles.input} placeholder="John" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Last Name</label>
                                <input type="text" required className={styles.input} placeholder="Doe" />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Address</label>
                            <input type="text" required className={styles.input} placeholder="Apartment, suite, unit, etc." />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>City</label>
                                <input type="text" required className={styles.input} placeholder="New Delhi" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>PIN Code</label>
                                <input type="text" required className={styles.input} placeholder="110001" />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input type="tel" required className={styles.input} placeholder="+91 98765 43210" />
                        </div>
                    </div>

                    <div className={styles.formSection} style={{ marginBottom: 0 }}>
                        <h2 className={styles.sectionTitle}><CreditCard size={24} color="#E42B26" /> Payment Method</h2>
                        <div style={{ padding: '1.5rem', border: '2px solid #E42B26', borderRadius: '8px', background: '#fdf2f2', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '6px solid #E42B26' }}></div>
                            <div>
                                <div style={{ fontWeight: 700 }}>Cash on Delivery</div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>Pay when your books arrive</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                        {cart.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className={styles.orderItem}>
                                <span>{item.title}</span>
                                <strong>₹{item.price}</strong>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summaryRow} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className={styles.summaryRow} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                        <span>Shipping</span>
                        <span>₹{shipping}</span>
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button type="submit" disabled={isProcessing} className={styles.placeOrderBtn}>
                        {isProcessing ? 'Processing...' : (
                            <>Place Order <CheckCircle size={20} /></>
                        )}
                    </button>
                    <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#999', marginTop: '1.5rem' }}>
                        By placing your order, you agree to Rohini Book Depot's Terms & Conditions.
                    </p>
                </div>
            </form>
        </div>
    );
}

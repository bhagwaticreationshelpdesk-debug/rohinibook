import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '60vh', textAlign: 'center' }}>
            <h1 className="section-title">Shopping Cart</h1>

            <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#f3f4f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ShoppingBag size={40} color="#666" />
                </div>

                <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a' }}>Your cart is empty</h2>
                <p style={{ color: '#666', maxWidth: '400px' }}>
                    Looks like you haven't added anything to your cart yet.
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
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

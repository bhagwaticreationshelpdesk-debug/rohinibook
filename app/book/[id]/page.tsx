import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import ProductActions from '../../components/ProductActions';

// Unified mock database of products (combining data from previous files)
const allProducts = [
    {
        id: '1', title: "The Secret Language of Flowers", author: "Eleanor Vance",
        price: 499, originalPrice: 899, discount: 45, image: "/book_cover_romance.png",
        description: "A captivating tale of secrets, mysteries, and the language of nature. Eleanor Vance weaves a story that will stay with you long after the final page."
    },
    {
        id: '2', title: "Atomic Habits", author: "James Clear",
        price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/2a2a2a/FFF?text=Atomic+Habits",
        description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results."
    },
    {
        id: '3', title: "The Psychology of Money", author: "Morgan Housel",
        price: 420, originalPrice: 750, discount: 44, image: "https://placehold.co/400x600/123456/FFF?text=Psychology",
        description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people."
    },
    {
        id: '7', title: "Fourth Wing", author: "Rebecca Yarros",
        price: 799, originalPrice: 1400, discount: 42, image: "https://placehold.co/400x600/550000/FFF?text=Fourth+Wing",
        description: "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders."
    },
    {
        id: '13', title: "It Ends With Us", author: "Colleen Hoover",
        price: 299, originalPrice: 599, discount: 50, image: "https://placehold.co/400x600/FFC0CB/000?text=It+Ends+With+Us",
        description: "Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants. She's come a long way from the small town where she grew up."
    },
    {
        id: '16', title: "Sapiens", author: "Yuval Noah Harari",
        price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/A52A2A/FFF?text=Sapiens",
        description: "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller."
    }
];

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Simulate database lookup
    const product = allProducts.find(p => p.id === id) || {
        // Fallback for demo purposes if ID not found in our small list
        id: id,
        title: "Book Title Placeholder",
        author: "Unknown Author",
        price: 499,
        originalPrice: 999,
        discount: 50,
        image: "https://placehold.co/400x600/e0e0e0/000?text=Book+Cover",
        description: "This is a placeholder description for the book. In a real application, this data would be fetched from a database based on the book ID."
    };

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>
                <Link href="/">Home</Link> / <Link href="/category/all">Books</Link> / <span style={{ color: '#1a1a1a', fontWeight: '500' }}>{product.title}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* Image Section */}
                <div style={{ position: 'relative', aspectRatio: '2/3', background: '#f8f8f8', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'contain', padding: '2rem' }}
                    />
                </div>

                {/* Details Section */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: '#1a1a1a', lineHeight: '1.2' }}>{product.title}</h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem', fontStyle: 'italic' }}>by <span style={{ color: '#E42B26', fontWeight: '600' }}>{product.author}</span></p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#E42B26' }}>₹{product.price}</span>
                        <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: '#999' }}>₹{product.originalPrice}</span>
                        <span style={{ background: '#e6f4ea', color: '#1e7e34', padding: '4px 8px', borderRadius: '4px', fontWeight: '700', fontSize: '0.9rem' }}>{product.discount}% OFF</span>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '1.5rem 0', margin: '1.5rem 0' }}>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            {product.description}
                        </p>
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

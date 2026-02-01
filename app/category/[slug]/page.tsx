import Link from 'next/link';
import Image from 'next/image';

// Mock data (simplified version of what's in page.tsx)
const allProducts = [
    {
        id: '1',
        title: "The Secret Language of Flowers",
        author: "Eleanor Vance",
        price: 499,
        originalPrice: 899,
        discount: 45,
        image: "/book_cover_romance.png",
        category: "fiction"
    },
    {
        id: '2',
        title: "Atomic Habits",
        author: "James Clear",
        price: 550,
        originalPrice: 999,
        discount: 45,
        image: "https://placehold.co/400x600/2a2a2a/FFF?text=Atomic+Habits",
        category: "self-help"
    },
    {
        id: '7',
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        price: 799,
        originalPrice: 1400,
        discount: 42,
        image: "https://placehold.co/400x600/550000/FFF?text=Fourth+Wing",
        category: "teens-&-ya"
    },
    {
        id: '15',
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 380,
        originalPrice: 650,
        discount: 42,
        image: "https://placehold.co/400x600/800080/FFF?text=Rich+Dad",
        category: "business"
    },
    {
        id: '20',
        title: "Tomb of Sand",
        author: "Geetanjali Shree",
        price: 599,
        originalPrice: 1099,
        discount: 45,
        image: "https://placehold.co/400x600/DEB887/000?text=Tomb+of+Sand",
        category: "award-winners"
    }
];

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Format the slug for display (e.g., "teens-&-ya" -> "Teens & Ya")
    const categoryName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // In a real app, you would filter based on the slug. 
    // For demo purposes, we'll just show all products or a subset to make it look populated.
    const products = allProducts;

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '60vh' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem' }}>{categoryName}</h1>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                    Browse our collection of {categoryName} books.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '2rem'
            }}>
                {products.map((product) => (
                    <div key={product.id} className="category-card" style={{
                        padding: '1rem',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '2/3',
                            background: '#f0f0f0',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{product.title}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{product.author}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                                <span style={{ color: '#E42B26', fontWeight: '800' }}>₹{product.price}</span>
                                <span style={{ color: '#999', textDecoration: 'line-through', fontSize: '0.8rem' }}>₹{product.originalPrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

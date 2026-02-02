"use client";

import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { useAppContext } from '../../context/AppContext';
import { use, useEffect, useState } from 'react';

export default function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { products } = useAppContext();
    const { slug } = use(params);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        const searchTerm = slug.replace(/-/g, ' ').toLowerCase();

        // 1. Try to find products that match the category EXACTLY (case-insensitive)
        let found = products.filter(p => p.category.toLowerCase() === searchTerm);

        // 2. Special handling for home sections (Trending, Best Sellers, etc.)
        if (searchTerm === 'trending') found = products.filter(p => p.isTrending);
        if (searchTerm === 'newly-published') found = products.filter(p => p.isNewArrival);
        if (searchTerm === 'best-sellers') found = products.filter(p => p.isBestSeller);
        if (searchTerm === 'award-winners') found = products.filter(p => p.isAwardWinner);

        // 3. Fallback search in title/author
        if (found.length === 0) {
            found = products.filter(p =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.author.toLowerCase().includes(searchTerm)
            );
        }

        setFilteredProducts(found);
    }, [slug, products]);

    const categoryName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '60vh' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem' }}>{categoryName}</h1>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                    {filteredProducts.length > 0
                        ? `Viewing ${filteredProducts.length} books in ${categoryName}`
                        : `No books currently available in ${categoryName}. Check back soon!`}
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#999' }}>More books coming soon to {categoryName}!</h3>
                    <Link href="/" style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        padding: '0.8rem 1.5rem',
                        background: '#E42B26',
                        color: 'white',
                        borderRadius: '6px',
                        fontWeight: '600'
                    }}>
                        Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
}

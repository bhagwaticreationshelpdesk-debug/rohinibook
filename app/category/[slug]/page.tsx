import Link from 'next/link';
import Image from 'next/image';

// Expanded Mock Data with specific categories
const allProducts = [
    // Fiction
    {
        id: '1', title: "The Secret Language of Flowers", author: "Eleanor Vance",
        price: 499, originalPrice: 899, discount: 45, image: "/book_cover_romance.png", category: "fiction"
    },
    {
        id: '26', title: "Where the Crawdads Sing", author: "Delia Owens",
        price: 399, originalPrice: 699, discount: 43, image: "https://placehold.co/400x600/2F4F4F/FFF?text=Crawdads", category: "fiction"
    },

    // Non-Fiction
    {
        id: '3', title: "The Psychology of Money", author: "Morgan Housel",
        price: 420, originalPrice: 750, discount: 44, image: "https://placehold.co/400x600/123456/FFF?text=Psychology", category: "non-fiction"
    },
    {
        id: '16', title: "Sapiens", author: "Yuval Noah Harari",
        price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/A52A2A/FFF?text=Sapiens", category: "non-fiction"
    },

    // New Arrivals (Added missing categories linked from home)
    {
        id: '7', title: "Fourth Wing", author: "Rebecca Yarros",
        price: 799, originalPrice: 1400, discount: 42, image: "https://placehold.co/400x600/550000/FFF?text=Fourth+Wing", category: "new arrivals"
    },
    {
        id: '8', title: "Yellowface", author: "R.F. Kuang",
        price: 599, originalPrice: 999, discount: 40, image: "https://placehold.co/400x600/FFFF00/000?text=Yellowface", category: "new arrivals"
    },
    {
        id: '9', title: "Happy Place", author: "Emily Henry",
        price: 450, originalPrice: 899, discount: 50, image: "https://placehold.co/400x600/FF69B4/FFF?text=Happy+Place", category: "new arrivals"
    },

    // Trending
    {
        id: '4', title: "Deep Work", author: "Cal Newport",
        price: 399, originalPrice: 699, discount: 40, image: "https://placehold.co/400x600/FF5733/FFF?text=Deep+Work", category: "trending"
    },
    {
        id: '5', title: "Thinking, Fast and Slow", author: "Daniel Kahneman",
        price: 650, originalPrice: 1200, discount: 46, image: "https://placehold.co/400x600/33FF57/000?text=Thinking+", category: "trending"
    },

    // Best Sellers
    {
        id: '2', title: "Atomic Habits", author: "James Clear",
        price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/2a2a2a/FFF?text=Atomic+Habits", category: "best sellers"
    },
    {
        id: '13', title: "It Ends With Us", author: "Colleen Hoover",
        price: 299, originalPrice: 599, discount: 50, image: "https://placehold.co/400x600/FFC0CB/000?text=It+Ends+With+Us", category: "best sellers"
    },

    // Manga
    {
        id: '35', title: "Naruto Vol 1", author: "Masashi Kishimoto",
        price: 399, originalPrice: 699, discount: 43, image: "https://placehold.co/400x600/FFA500/000?text=Naruto", category: "manga"
    },

    // Teens & YA
    {
        id: '29', title: "Six of Crows", author: "Leigh Bardugo",
        price: 450, originalPrice: 799, discount: 44, image: "https://placehold.co/400x600/000000/FFF?text=Six+of+Crows", category: "teens & ya"
    },

    // Kids
    {
        id: '31', title: "Harry Potter", author: "J.K. Rowling",
        price: 599, originalPrice: 999, discount: 40, image: "https://placehold.co/400x600/7B68EE/FFF?text=Harry+Potter", category: "kids"
    },

    // Exams
    {
        id: '34', title: "UPSC General Studies", author: "McGraw Hill",
        price: 899, originalPrice: 1500, discount: 40, image: "https://placehold.co/400x600/8B0000/FFF?text=UPSC+GS", category: "exams"
    },

    // Award Winners
    {
        id: '20', title: "Tomb of Sand", author: "Geetanjali Shree",
        price: 599, originalPrice: 1099, discount: 45, image: "https://placehold.co/400x600/DEB887/000?text=Tomb+of+Sand", category: "award winners"
    }
];

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Filter products based on the slug
    // Ensure case-insensitive matching
    // Format the slug back to a readable string for searching (undoing the URL formatting)
    const searchTerm = slug.replace(/-/g, ' ').toLowerCase();

    // 1. Try to find products that match the category EXACTLY (case-insensitive)
    let filteredProducts = allProducts.filter(p => p.category.toLowerCase() === searchTerm);

    // 2. If no products found by category, try searching in TITLE or AUTHOR
    if (filteredProducts.length === 0) {
        filteredProducts = allProducts.filter(p =>
            p.title.toLowerCase().includes(searchTerm) ||
            p.author.toLowerCase().includes(searchTerm)
        );
    }

    const productsToDisplay = filteredProducts;

    const categoryName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '60vh' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem' }}>{categoryName}</h1>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                    {productsToDisplay.length > 0
                        ? `Viewing ${productsToDisplay.length} books in ${categoryName}`
                        : `No books currently available in ${categoryName}. Check back soon!`}
                </p>
            </div>

            {productsToDisplay.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '2rem'
                }}>
                    {productsToDisplay.map((product) => (
                        <div key={product.id} className="category-card" style={{
                            padding: '1rem',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            cursor: 'default' // Override the cursor pointer from category-card class if needed for non-clickable containers
                        }}>
                            {/* Reusing category-card for style, but it's a product card essentially */}
                            <Link href={`/book/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '2/3',
                                    background: '#f0f0f0',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    marginBottom: '1rem'
                                }}>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem', color: '#1a1a1a' }}>{product.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{product.author}</p>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <span style={{ color: '#E42B26', fontWeight: '800' }}>₹{product.price}</span>
                                        <span style={{ color: '#999', textDecoration: 'line-through', fontSize: '0.8rem' }}>₹{product.originalPrice}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'white', background: '#2e7d32', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{product.discount}% OFF</span>
                                    </div>
                                </div>
                            </Link>
                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'white',
                                border: '2px solid #E42B26',
                                color: '#E42B26',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                borderRadius: '8px',
                                marginTop: 'auto',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>Add to Cart</button>
                        </div>
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

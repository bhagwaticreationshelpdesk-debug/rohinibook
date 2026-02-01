import Link from 'next/link';
import Image from 'next/image';

// Expanded Mock Data with specific categories
const allProducts = [
    // Trending
    { id: '1', title: "The Secret Language of Flowers", author: "Eleanor Vance", price: 499, originalPrice: 899, discount: 45, image: "/book_cover_romance.png", category: "trending" },
    { id: '2', title: "Atomic Habits", author: "James Clear", price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/2a2a2a/FFF.png?text=Atomic+Habits", category: "trending" },
    { id: '3', title: "The Psychology of Money", author: "Morgan Housel", price: 420, originalPrice: 750, discount: 44, image: "https://placehold.co/400x600/123456/FFF.png?text=Psychology", category: "trending" },
    { id: '4', title: "Deep Work", author: "Cal Newport", price: 399, originalPrice: 699, discount: 40, image: "https://placehold.co/400x600/FF5733/FFF.png?text=Deep+Work", category: "trending" },

    // Fiction
    { id: '1f', title: "The Secret Language of Flowers", author: "Eleanor Vance", price: 499, originalPrice: 899, discount: 45, image: "/book_cover_romance.png", category: "fiction" },
    { id: '26', title: "Where the Crawdads Sing", author: "Delia Owens", price: 399, originalPrice: 699, discount: 43, image: "https://placehold.co/400x600/2F4F4F/FFF.png?text=Crawdads", category: "fiction" },
    { id: '40', title: "The Midnight Library", author: "Matt Haig", price: 350, originalPrice: 599, discount: 41, image: "https://placehold.co/400x600/000080/FFF.png?text=Midnight+Library", category: "fiction" },

    // Non-Fiction
    { id: '3nf', title: "The Psychology of Money", author: "Morgan Housel", price: 420, originalPrice: 750, discount: 44, image: "https://placehold.co/400x600/123456/FFF.png?text=Psychology", category: "non-fiction" },
    { id: '16', title: "Sapiens", author: "Yuval Noah Harari", price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/A52A2A/FFF.png?text=Sapiens", category: "non-fiction" },
    { id: '41', title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 650, originalPrice: 1200, discount: 46, image: "https://placehold.co/400x600/33FF57/000.png?text=Thinking", category: "non-fiction" },

    // Business
    { id: '42', title: "The Growth Mindset", author: "Alexander Chen", price: 599, originalPrice: 999, discount: 40, image: "/book_cover_business.png", category: "business" },
    { id: '43', title: "Zero to One", author: "Peter Thiel", price: 450, originalPrice: 799, discount: 44, image: "https://placehold.co/400x600/000000/FFF.png?text=Zero+to+One", category: "business" },
    { id: '44', title: "The Intelligent Investor", author: "Benjamin Graham", price: 799, originalPrice: 1499, discount: 47, image: "https://placehold.co/400x600/006400/FFF.png?text=Investor", category: "business" },

    // Manga
    { id: '35', title: "Shadow Samurai", author: "Kenji Sato", price: 399, originalPrice: 699, discount: 43, image: "/book_cover_manga.png", category: "manga" },
    { id: '45', title: "Naruto Vol 1", author: "Masashi Kishimoto", price: 420, originalPrice: 750, discount: 44, image: "https://placehold.co/400x600/FFA500/000.png?text=Naruto", category: "manga" },
    { id: '46', title: "One Piece Vol 1", author: "Eiichiro Oda", price: 420, originalPrice: 750, discount: 44, image: "https://placehold.co/400x600/FF0000/FFF.png?text=One+Piece", category: "manga" },

    // Teens & YA
    { id: '29', title: "Six of Crows", author: "Leigh Bardugo", price: 450, originalPrice: 799, discount: 44, image: "https://placehold.co/400x600/000000/FFF.png?text=Six+of+Crows", category: "teens & ya" },
    { id: '47', title: "The Hunger Games", author: "Suzanne Collins", price: 350, originalPrice: 650, discount: 46, image: "https://placehold.co/400x600/FFD700/000.png?text=Hunger+Games", category: "teens & ya" },
    { id: '48', title: "Percy Jackson", author: "Rick Riordan", price: 399, originalPrice: 699, discount: 43, image: "https://placehold.co/400x600/00BFFF/FFF.png?text=Percy+Jackson", category: "teens & ya" },

    // Children
    { id: '31', title: "The Little Astronaut", author: "Sarah Jenkins", price: 599, originalPrice: 999, discount: 40, image: "/book_cover_kids.png", category: "children" },
    { id: '49', title: "Harry Potter", author: "J.K. Rowling", price: 599, originalPrice: 999, discount: 40, image: "https://placehold.co/400x600/7B68EE/FFF.png?text=Harry+Potter", category: "children" },
    { id: '50', title: "The Gruffalo", author: "Julia Donaldson", price: 299, originalPrice: 499, discount: 40, image: "https://placehold.co/400x600/8B4513/FFF.png?text=Gruffalo", category: "children" },

    // Exams
    { id: '34', title: "UPSC General Studies", author: "McGraw Hill", price: 899, originalPrice: 1500, discount: 40, image: "https://placehold.co/400x600/8B0000/FFF.png?text=UPSC+GS", category: "exams" },
    { id: '51', title: "Quantitative Aptitude", author: "R.S. Aggarwal", price: 650, originalPrice: 999, discount: 35, image: "https://placehold.co/400x600/00008B/FFF.png?text=Quants", category: "exams" },
    { id: '52', title: "CLAT Guide 2024", author: "Arihant", price: 550, originalPrice: 850, discount: 35, image: "https://placehold.co/400x600/4B0082/FFF.png?text=CLAT", category: "exams" },

    // Self Help
    { id: '53', title: "Inner Calm", author: "Elena Rostova", price: 499, originalPrice: 899, discount: 44, image: "/book_cover_selfhelp.png", category: "self help" },
    { id: '2sh', title: "Atomic Habits", author: "James Clear", price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/2a2a2a/FFF.png?text=Atomic+Habits", category: "self help" },
    { id: '4sh', title: "Deep Work", author: "Cal Newport", price: 399, originalPrice: 699, discount: 40, image: "https://placehold.co/400x600/FF5733/FFF.png?text=Deep+Work", category: "self help" },

    // Award Winners
    { id: '20', title: "Tomb of Sand", author: "Geetanjali Shree", price: 599, originalPrice: 1099, discount: 45, image: "https://placehold.co/400x600/DEB887/000.png?text=Tomb+of+Sand", category: "award winners" },
    { id: '19', title: "The Seven Moons", author: "Shehan Karunatilaka", price: 699, originalPrice: 1299, discount: 46, image: "https://placehold.co/400x600/C0C0C0/000.png?text=Seven+Moons", category: "award winners" },
    { id: '21', title: "Trust", author: "Hernan Diaz", price: 550, originalPrice: 899, discount: 38, image: "https://placehold.co/400x600/20B2AA/FFF.png?text=Trust", category: "award winners" },

    // Newly Published
    { id: '7', title: "Fourth Wing", author: "Rebecca Yarros", price: 799, originalPrice: 1400, discount: 42, image: "https://placehold.co/400x600/550000/FFF.png?text=Fourth+Wing", category: "newly published" },
    { id: '8', title: "Yellowface", author: "R.F. Kuang", price: 599, originalPrice: 999, discount: 40, image: "https://placehold.co/400x600/FFFF00/000.png?text=Yellowface", category: "newly published" },
    { id: '9', title: "Happy Place", author: "Emily Henry", price: 450, originalPrice: 899, discount: 50, image: "https://placehold.co/400x600/FF69B4/FFF.png?text=Happy+Place", category: "newly published" },

    // Best Sellers
    { id: '13', title: "It Ends With Us", author: "Colleen Hoover", price: 299, originalPrice: 599, discount: 50, image: "https://placehold.co/400x600/FFC0CB/000.png?text=It+Ends+With+Us", category: "best sellers" },
    { id: '14', title: "The Alchemist", author: "Paulo Coelho", price: 250, originalPrice: 499, discount: 49, image: "https://placehold.co/400x600/FFA500/000.png?text=Alchemist", category: "best sellers" },
    { id: '15', title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 380, originalPrice: 650, discount: 42, image: "https://placehold.co/400x600/800080/FFF.png?text=Rich+Dad", category: "best sellers" },

    // Biographies
    { id: '12', title: "Spare", author: "Prince Harry", price: 999, originalPrice: 1999, discount: 50, image: "https://placehold.co/400x600/808080/FFF.png?text=Spare", category: "biographies" },
    { id: '54', title: "Steve Jobs", author: "Walter Isaacson", price: 550, originalPrice: 999, discount: 45, image: "https://placehold.co/400x600/333333/FFF.png?text=Steve+Jobs", category: "biographies" },
    { id: '55', title: "Becoming", author: "Michelle Obama", price: 499, originalPrice: 899, discount: 44, image: "https://placehold.co/400x600/6A5ACD/FFF.png?text=Becoming", category: "biographies" }
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

import Link from 'next/link';
import HeroSlider from './components/HeroSlider';
import ProductSection from './components/ProductSection';
import styles from './page.module.css';

// Mock Data - Rich Catalogue
const trendingBooks = [
  {
    id: '1',
    title: "The Secret Language of Flowers",
    author: "Eleanor Vance",
    price: 499,
    originalPrice: 899,
    discount: 45,
    image: "/book_cover_romance.png" // Generated
  },
  {
    id: '2',
    title: "Atomic Habits",
    author: "James Clear",
    price: 550,
    originalPrice: 999,
    discount: 45,
    image: "https://placehold.co/400x600/2a2a2a/FFF.png?text=Atomic+Habits"
  },
  {
    id: '3',
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 420,
    originalPrice: 750,
    discount: 44,
    image: "https://placehold.co/400x600/123456/FFF.png?text=Psychology"
  },
  {
    id: '4',
    title: "Deep Work",
    author: "Cal Newport",
    price: 399,
    originalPrice: 699,
    discount: 40,
    image: "https://placehold.co/400x600/FF5733/FFF.png?text=Deep+Work"
  },
  {
    id: '5',
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 650,
    originalPrice: 1200,
    discount: 46,
    image: "https://placehold.co/400x600/33FF57/000.png?text=Thinking"
  },
  {
    id: '6',
    title: "Start With Why",
    author: "Simon Sinek",
    price: 410,
    originalPrice: 650,
    discount: 38,
    image: "https://placehold.co/400x600/3357FF/FFF.png?text=Start+With+Why"
  }
];

const newArrivals = [
  {
    id: '7',
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    price: 799,
    originalPrice: 1400,
    discount: 42,
    image: "https://placehold.co/400x600/550000/FFF.png?text=Fourth+Wing"
  },
  {
    id: '8',
    title: "Yellowface",
    author: "R.F. Kuang",
    price: 599,
    originalPrice: 999,
    discount: 40,
    image: "https://placehold.co/400x600/FFFF00/000.png?text=Yellowface"
  },
  {
    id: '9',
    title: "Happy Place",
    author: "Emily Henry",
    price: 450,
    originalPrice: 899,
    discount: 50,
    image: "https://placehold.co/400x600/FF69B4/FFF.png?text=Happy+Place"
  },
  {
    id: '10',
    title: "Hell Bent",
    author: "Leigh Bardugo",
    price: 650,
    originalPrice: 1100,
    discount: 41,
    image: "https://placehold.co/400x600/000000/FFF.png?text=Hell+Bent"
  },
  {
    id: '11',
    title: "Chain of Thorns",
    author: "Cassandra Clare",
    price: 720,
    originalPrice: 1299,
    discount: 43,
    image: "https://placehold.co/400x600/4B0082/FFF.png?text=Chain+of+Thorns"
  },
  {
    id: '12',
    title: "Spare",
    author: "Prince Harry",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: "https://placehold.co/400x600/808080/FFF.png?text=Spare"
  }
];

const bestSellers = [
  {
    id: '13',
    title: "It Ends With Us",
    author: "Colleen Hoover",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://placehold.co/400x600/FFC0CB/000.png?text=It+Ends+With+Us"
  },
  {
    id: '14',
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 250,
    originalPrice: 499,
    discount: 49,
    image: "https://placehold.co/400x600/FFA500/000.png?text=The+Alchemist"
  },
  {
    id: '15',
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 380,
    originalPrice: 650,
    discount: 42,
    image: "https://placehold.co/400x600/800080/FFF.png?text=Rich+Dad"
  },
  {
    id: '16',
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 550,
    originalPrice: 999,
    discount: 45,
    image: "https://placehold.co/400x600/A52A2A/FFF.png?text=Sapiens"
  },
  {
    id: '17',
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: "https://placehold.co/400x600/000000/FFF.png?text=Silent+Patient"
  },
  {
    id: '18',
    title: "Ikigai",
    author: "Hector Garcia",
    price: 350,
    originalPrice: 699,
    discount: 49,
    image: "https://placehold.co/400x600/ADD8E6/000.png?text=Ikigai"
  }
];

const awardWinners = [
  {
    id: '19',
    title: "The Seven Moons",
    author: "Shehan Karunatilaka",
    price: 699,
    originalPrice: 1299,
    discount: 40,
    image: "https://placehold.co/400x600/C0C0C0/000.png?text=Seven+Moons"
  },
  {
    id: '20',
    title: "Tomb of Sand",
    author: "Geetanjali Shree",
    price: 599,
    originalPrice: 1099,
    discount: 45,
    image: "https://placehold.co/400x600/DEB887/000.png?text=Tomb+of+Sand"
  },
  {
    id: '21',
    title: "Trust",
    author: "Hernan Diaz",
    price: 550,
    originalPrice: 899,
    discount: 38,
    image: "https://placehold.co/400x600/20B2AA/FFF.png?text=Trust"
  },
  {
    id: '22',
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    price: 650,
    originalPrice: 1150,
    discount: 43,
    image: "https://placehold.co/400x600/B8860B/FFF.png?text=Demon"
  },
  {
    id: '23',
    title: "The Promise",
    author: "Damon Galgut",
    price: 499,
    originalPrice: 899,
    discount: 44,
    image: "https://placehold.co/400x600/778899/FFF.png?text=The+Promise"
  },
  {
    id: '24',
    title: "Shuggie Bain",
    author: "Douglas Stuart",
    price: 450,
    originalPrice: 850,
    discount: 47,
    image: "https://placehold.co/400x600/4682B4/FFF.png?text=Shuggie+Bain"
  }
];

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroSlider />

      <ProductSection
        title="Now Trending"
        products={trendingBooks}
        link="/category/trending"
      />

      <ProductSection
        title="Newly Published"
        products={newArrivals}
        link="/category/newly-published"
      />

      <ProductSection
        title="Best Sellers"
        products={bestSellers}
        link="/category/best-sellers"
      />

      <ProductSection
        title="Award Winners"
        products={awardWinners}
        link="/category/award-winners"
      />

      <div className="container" style={{ margin: '5rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Explore by Category</h2>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Find your next great read in our curated collections</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          perspective: '1000px'
        }}>
          {[
            { name: 'Fiction', icon: '📖', color: '#fdf2f2', link: '/category/fiction' },
            { name: 'Business', icon: '💼', color: '#f0f7ff', link: '/category/business' },
            { name: 'Self Help', icon: '✨', color: '#fefcf0', link: '/category/self-help' },
            { name: 'Biographies', icon: '👤', color: '#f5f3ff', link: '/category/biographies' },
            { name: 'Children', icon: '🧒', color: '#f0fdf4', link: '/category/children' },
            { name: 'Manga', icon: '⛩️', color: '#fff1f2', link: '/category/manga' }
          ].map(cat => (
            <Link href={cat.link} key={cat.name} className="category-card" style={{
              background: cat.color,
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              border: 'none',
              borderRadius: '24px'
            }}>
              <span style={{ fontSize: '3rem' }}>{cat.icon}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#333' }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

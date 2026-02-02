"use client";

import Link from 'next/link';
import HeroSlider from './components/HeroSlider';
import ProductSection from './components/ProductSection';
import QuoteTicker from './components/QuoteTicker';
import styles from './page.module.css';
import { useAppContext } from './context/AppContext';

export default function Home() {
  const { products } = useAppContext();

  // Filter products based on flags managed in Admin
  const trendingBooks = products.filter(p => p.isTrending);
  const newArrivals = products.filter(p => p.isNewArrival);
  const bestSellers = products.filter(p => p.isBestSeller);
  const awardWinners = products.filter(p => p.isAwardWinner);

  return (
    <div className={styles.main}>
      <HeroSlider />

      <QuoteTicker />

      {trendingBooks.length > 0 && (
        <ProductSection
          title="Trending Now"
          products={trendingBooks}
          link="/category/trending"
        />
      )}

      {newArrivals.length > 0 && (
        <ProductSection
          title="Newly Published"
          products={newArrivals}
          link="/category/newly-published"
        />
      )}

      {bestSellers.length > 0 && (
        <ProductSection
          title="Best Sellers"
          products={bestSellers}
          link="/category/best-sellers"
        />
      )}

      {awardWinners.length > 0 && (
        <ProductSection
          title="Award Winners"
          products={awardWinners}
          link="/category/award-winners"
        />
      )}

      <div className="container" style={{ margin: '8rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title" style={{ fontSize: '3rem' }}>Explore by Category</h2>
          <p style={{ color: '#666', marginTop: '1rem', fontSize: '1.2rem' }}>Diving into different worlds, one genre at a time</p>
        </div>

        <div className="categoryGrid">
          {[
            { name: 'Fiction', icon: '📚', count: '1,240+ Books', class: 'catFiction', link: '/category/fiction' },
            { name: 'Sci-Fi & Fantasy', icon: '🌌', count: '850+ Books', class: 'catFantasy', link: '/category/fantasy' },
            { name: 'Gothic & Mystery', icon: '🕵️', count: '520+ Books', class: 'catMystery', link: '/category/mystery' },
            { name: 'Business & Wealth', icon: '📈', count: '930+ Books', class: 'catBusiness', link: '/category/business' },
            { name: 'Growth & Mindset', icon: '🌱', count: '1,100+ Books', class: 'catSelfHelp', link: '/category/self-help' },
            { name: 'Art & Science', icon: '🧪', count: '420+ Books', class: 'catScience', link: '/category/science' },
            { name: 'Manga & Comics', icon: '🏮', count: '2,400+ Books', class: 'catManga', link: '/category/manga' },
            { name: 'Kids Universe', icon: '🎈', count: '1,800+ Books', class: 'catChildren', link: '/category/children' }
          ].map(cat => (
            <Link href={cat.link} key={cat.name} className={`categoryCardPremium ${cat.class}`}>
              <span className="categoryCount">{cat.count}</span>
              <h3 className="categoryTitle">{cat.name}</h3>
              <div className="categoryIconWrapper" style={{ position: 'absolute', right: '1.5rem', bottom: '0.5rem', opacity: 0.6 }}>
                {cat.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

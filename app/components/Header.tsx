import Link from 'next/link';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import styles from './header.module.css';

export default function Header() {
    const categories = [
        'Fiction', 'Non-Fiction', 'Teens & YA', 'Kids', 'Exams',
        'Manga', 'Award Winners', 'New Arrivals', 'Best Sellers'
    ];

    return (
        <header className={styles.header}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className={`container ${styles.topBarContainer}`}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <span className={styles.logoText}>Rohini Book Depot</span>
                        </Link>
                    </div>

                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search by Title, Author, Publisher or ISBN"
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>
                            <Search size={22} />
                        </button>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/account" className={styles.actionItem}>
                            <User size={24} strokeWidth={1.5} />
                            <span>My Account</span>
                        </Link>
                        <Link href="/wishlist" className={styles.actionItem}>
                            <Heart size={24} strokeWidth={1.5} />
                            <span>Wishlist</span>
                        </Link>
                        <Link href="/cart" className={styles.actionItem}>
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            <span>Cart (0)</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                <div className={`container ${styles.navContainer}`}>
                    <ul className={styles.navList}>
                        {categories.map((item) => (
                            <li key={item} className={styles.navItem}>
                                <Link href={`/category/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

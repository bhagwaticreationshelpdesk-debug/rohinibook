"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import styles from './header.module.css';
import { useAppContext } from '../context/AppContext';

export default function Header() {
    const { wishlist, cart } = useAppContext();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const categories = [
        'Fiction', 'Non-Fiction', 'Teens & YA', 'Kids', 'Exams',
        'Manga', 'Award Winners', 'Newly Published', 'Best Sellers'
    ];

    const trendingSearches = ['Atomic Habits', 'Percy Jackson', 'UPSC Guide', 'Rich Dad Poor Dad'];
    const popularCategories = ['Fiction', 'Manga', 'Reference', 'Biographies'];

    // Close search when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/category/${searchQuery.trim().toLowerCase().replace(/ /g, '-')}`);
            setIsSearchOpen(false);
        }
    };

    const handleSuggestionClick = (term: string) => {
        setSearchQuery(term);
        router.push(`/category/${term.toLowerCase().replace(/ /g, '-')}`);
        setIsSearchOpen(false);
    };

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

                    <div className={styles.searchContainer} ref={searchRef}>
                        <form onSubmit={handleSearch} style={{ width: '100%', display: 'flex' }}>
                            <input
                                type="text"
                                placeholder="Search by Title, Author, Publisher or ISBN"
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={() => setIsSearchOpen(true)}
                                onFocus={() => setIsSearchOpen(true)}
                            />
                            <button type="submit" className={styles.searchButton}>
                                <Search size={22} />
                            </button>
                        </form>

                        {isSearchOpen && (
                            <div className={styles.searchOverlay}>
                                <div className={styles.suggestionGroup}>
                                    <h4 className={styles.suggestionTitle}>Trending Searches</h4>
                                    <ul className={styles.suggestionList}>
                                        {trendingSearches.map(term => (
                                            <li key={term} className={styles.suggestionItem} onClick={() => handleSuggestionClick(term)}>
                                                {term}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.suggestionGroup}>
                                    <h4 className={styles.suggestionTitle}>Popular Categories</h4>
                                    <ul className={styles.suggestionList}>
                                        {popularCategories.map(cat => (
                                            <li key={cat} className={styles.suggestionItem} onClick={() => handleSuggestionClick(cat)}>
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <Link href="/account" className={styles.actionItem}>
                            <User size={24} strokeWidth={1.5} />
                            <span>My Account</span>
                        </Link>
                        <Link href="/wishlist" className={styles.actionItem}>
                            <div style={{ position: 'relative' }}>
                                <Heart size={24} strokeWidth={1.5} />
                                {wishlist.length > 0 && (
                                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#E42B26', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>{wishlist.length}</span>
                                )}
                            </div>
                            <span>Wishlist</span>
                        </Link>
                        <Link href="/cart" className={styles.actionItem}>
                            <div style={{ position: 'relative' }}>
                                <ShoppingBag size={24} strokeWidth={1.5} />
                                {cart.length > 0 && (
                                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#E42B26', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>{cart.length}</span>
                                )}
                            </div>
                            <span>Cart ({cart.length})</span>
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

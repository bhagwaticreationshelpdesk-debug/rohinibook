"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import styles from './header.module.css';
import { useAppContext } from '../context/AppContext';

export default function Header() {
    const { wishlist, cart, products } = useAppContext();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const categories = [
        'Fiction', 'Business', 'Self Help', 'Manga',
        'Fantasy', 'Children', 'Science', 'Mystery'
    ];

    const trendingSearches = ['Atomic Habits', 'Percy Jackson', 'UPSC Guide', 'Rich Dad Poor Dad'];

    // Dynamic suggestions based on input
    const liveSuggestions = searchQuery.trim().length > 0
        ? products.filter(p => {
            const query = searchQuery.toLowerCase();
            const title = p.title.toLowerCase();
            const author = p.author.toLowerCase();

            // Logic: Starts with query OR query is a whole word in the title (preceded by space)
            return title.startsWith(query) ||
                title.includes(" " + query) ||
                author.startsWith(query) ||
                author.includes(" " + query);
        }).slice(0, 6)
        : [];

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

    const handleSuggestionClick = (term: string, type: 'search' | 'book' = 'search', id?: string) => {
        if (type === 'book' && id) {
            router.push(`/book/${id}`);
        } else {
            setSearchQuery(term);
            router.push(`/category/${term.toLowerCase().replace(/ /g, '-')}`);
        }
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
                                placeholder="Search by Title, Author..."
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
                                {liveSuggestions.length > 0 ? (
                                    <div className={styles.suggestionGroup}>
                                        <h4 className={styles.suggestionTitle}>Matching Books</h4>
                                        <ul className={styles.suggestionList} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            {liveSuggestions.map(p => {
                                                const query = searchQuery.trim();
                                                const parts = p.title.split(new RegExp(`(${query})`, 'gi'));
                                                return (
                                                    <li
                                                        key={p.id}
                                                        className={styles.suggestionItem}
                                                        style={{ width: '100%', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                                        onClick={() => handleSuggestionClick(p.title, 'book', p.id)}
                                                    >
                                                        <span>
                                                            {parts.map((part, i) =>
                                                                part.toLowerCase() === query.toLowerCase()
                                                                    ? <strong key={i}>{part}</strong>
                                                                    : <span key={i}>{part}</span>
                                                            )}
                                                        </span>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                            <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>{p.author}</span>
                                                            <span style={{ fontSize: '0.7rem', color: '#E42B26', fontWeight: 600 }}>₹{p.price}</span>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : searchQuery.length > 0 ? (
                                    <div className={styles.suggestionGroup}>
                                        <p style={{ fontSize: '0.85rem', color: '#666' }}>No exact matches found...</p>
                                    </div>
                                ) : (
                                    <>
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
                                                {categories.slice(0, 4).map(cat => (
                                                    <li key={cat} className={styles.suggestionItem} onClick={() => handleSuggestionClick(cat)}>
                                                        {cat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
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

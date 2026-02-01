"use client";

import { Sparkles } from 'lucide-react';
import styles from './quote-ticker.module.css';

const quotes = [
    { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
    { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { text: "Outside of a dog, a book is a man's best friend.", author: "Groucho Marx" },
    { text: "Books are a uniquely portable magic.", author: "Stephen King" },
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "Read the best books first, or you may not have a chance to read them at all.", author: "Henry David Thoreau" }
];

export default function QuoteTicker() {
    // Duplicate quotes to create a seamless loop
    const displayQuotes = [...quotes, ...quotes];

    return (
        <div className={styles.tickerWrapper}>
            <div className={styles.ticker}>
                {displayQuotes.map((quote, index) => (
                    <div key={index} className={styles.quoteItem}>
                        <span className={styles.divider}>
                            <Sparkles size={18} fill="currentColor" />
                        </span>
                        <span className={styles.quoteText}>"{quote.text}"</span>
                        <span className={styles.quoteAuthor}>– {quote.author}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './product-card.module.css';

interface ProductProps {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    image: string;
    discount: number;
}

export default function ProductCard({ product }: { product: ProductProps }) {
    return (
        <div className={styles.card}>
            <div className={styles.pickupBadge}>
                <span>✓</span> In Stock
            </div>

            <Link href={`/book/${product.id}`} className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={220}
                    height={330}
                    className={styles.image}
                    priority={false}
                />
            </Link>

            <div className={styles.details}>
                <Link href={`/book/${product.id}`}>
                    <h3 className={styles.title} title={product.title}>{product.title}</h3>
                </Link>
                <span className={styles.author}>by {product.author}</span>

                <div className={styles.priceContainer}>
                    <div className={styles.priceWrapper}>
                        <span className={styles.price}>₹{product.price}</span>
                        <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                    </div>
                    <span className={styles.discountBadge}>{product.discount}% OFF</span>
                </div>

                <div className={styles.actionFooter}>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                    <button className={styles.wishlistBtn} aria-label="Add to wishlist">
                        <Heart size={20} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}

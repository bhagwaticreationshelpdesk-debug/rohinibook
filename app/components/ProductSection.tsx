import Link from 'next/link';
import ProductCard from './ProductCard';
import styles from './product-section.module.css';

interface Product {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    image: string;
    discount: number;
}

interface ProductSectionProps {
    title: string;
    products: Product[];
    link?: string;
}

export default function ProductSection({ title, products, link = '#' }: ProductSectionProps) {
    return (
        <section className={`container ${styles.section}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Link href={link} className={styles.seeAll}>See All</Link>
            </div>

            <div className={styles.scrollContainer}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

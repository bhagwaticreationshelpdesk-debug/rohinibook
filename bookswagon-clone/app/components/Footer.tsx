import Link from 'next/link';
import styles from './footer.module.css';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div>
                        <h4 className={styles.columnTitle}>Company</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/career">Career</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.columnTitle}>Policies</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Use</Link></li>
                            <li><Link href="/shipping">Secure Shopping</Link></li>
                            <li><Link href="/copyright">Copyright Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.columnTitle}>Help</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/payment">Payment</Link></li>
                            <li><Link href="/shipping">Shipping</Link></li>
                            <li><Link href="/returns">Return</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.columnTitle}>Connect</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/affiliate">Affiliate Program</Link></li>
                            <li><Link href="/sitemap">Sitemap</Link></li>
                            <li><Link href="/social">Social Media</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <div className="container">
                    &copy; {new Date().getFullYear()} Rohini Book Depot. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
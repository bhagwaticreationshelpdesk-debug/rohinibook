import Image from 'next/image';
import Link from 'next/link';
import styles from './hero-slider.module.css';

export default function HeroSlider() {
    return (
        <section className={`container ${styles.heroSection}`}>
            <div className={styles.mainSlider}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image
                        src="/hero_banner_books.png"
                        alt="Stories That Inspired"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '3rem 2rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        color: 'white'
                    }}>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Fall in Love with Reading</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Discover worlds within pages.</p>
                    </div>
                </div>
            </div>

            <div className={styles.sideBanners}>
                <Link href="/category/exam-prep" className={`${styles.sideBanner} ${styles.examBanner}`}>
                    <div className={styles.sideBannerContent}>
                        <h3 className={styles.sideBannerTitle}>Exam Prep</h3>
                        <p>Essential guides for your success</p>
                    </div>
                    <div className={styles.sideBannerImageWrapper}>
                        <Image
                            src="/exam_prep_icon.png"
                            alt="Exam Preparation Books"
                            width={200}
                            height={200}
                            className={styles.sideBannerImage}
                        />
                    </div>
                </Link>
                <Link href="/category/new-arrivals" className={`${styles.sideBanner} ${styles.newArrivalsBanner}`}>
                    <div className={styles.sideBannerContent}>
                        <h3 className={styles.sideBannerTitle}>New Arrivals</h3>
                        <p>Be the first to read the latest hits</p>
                    </div>
                    <div className={styles.sideBannerImageWrapper}>
                        <Image
                            src="/new_arrivals_icon.png"
                            alt="New Arrivals"
                            width={200}
                            height={200}
                            className={styles.sideBannerImage}
                        />
                    </div>
                </Link>
            </div>
        </section>
    );
}

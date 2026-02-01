import Image from 'next/image';
import Link from 'next/link';
import styles from './hero-slider.module.css';

export default function HeroSlider() {
    return (
        <section className={`container ${styles.heroSection}`}>
            <div className={styles.mainSlider}>
                <Image
                    src="/hero_banner_books.png"
                    alt="Stories That Inspired"
                    fill
                    className={styles.slideImage}
                    priority
                />
                <div className={styles.mainSliderOverlay}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '0.5rem', color: 'white', lineHeight: '1.1' }}>Fall in Love with Reading</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, color: 'white', marginBottom: '2rem' }}>Discover worlds within pages.</p>
                    <Link href="/category/all-books" className={styles.shopNowBtn} style={{ alignSelf: 'flex-start', padding: '0.8rem 2rem', fontSize: '1rem' }}>
                        Explore Collection
                    </Link>
                </div>
            </div>

            <div className={styles.sideBanners}>
                <Link href="/category/exams" className={`${styles.sideBanner} ${styles.examBanner}`}>
                    <div className={styles.sideBannerContent}>
                        <h3 className={styles.sideBannerTitle}>Exam Prep</h3>
                        <p>Essential guides for success</p>
                        <span className={styles.shopNowBtn}>Shop Now</span>
                    </div>
                    <div className={styles.sideBannerImageWrapper}>
                        <Image
                            src="/exam_prep_icon.png"
                            alt="Exam Preparation Books"
                            width={160}
                            height={160}
                            className={styles.sideBannerImage}
                        />
                    </div>
                </Link>
                <Link href="/category/newly-published" className={`${styles.sideBanner} ${styles.newArrivalsBanner}`}>
                    <div className={styles.sideBannerContent}>
                        <h3 className={styles.sideBannerTitle}>Newly Published</h3>
                        <p>Latest literary hits</p>
                        <span className={styles.shopNowBtn}>Shop Now</span>
                    </div>
                    <div className={styles.sideBannerImageWrapper}>
                        <Image
                            src="/new_arrivals_icon.png"
                            alt="Newly Published Books"
                            width={160}
                            height={160}
                            className={styles.sideBannerImage}
                        />
                    </div>
                </Link>
            </div>
        </section>
    );
}

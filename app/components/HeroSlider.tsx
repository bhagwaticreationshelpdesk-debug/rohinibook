"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './hero-slider.module.css';

const slides = [
    {
        id: 1,
        image: "/hero_banner_books.png",
        title: "Fall in Love with Reading",
        subtitle: "Discover worlds within pages.",
        link: "/category/all-books",
        cta: "Explore Collection"
    },
    {
        id: 2,
        image: "/hero_banner_modern.png",
        title: "Read More, Dream More",
        subtitle: "Knowledge is the wing wherewith we fly.",
        link: "/category/newly-published",
        cta: "Discover More"
    },
    {
        id: 3,
        image: "/hero_banner_fantasy.png",
        title: "Unleash Your Imagination",
        subtitle: "A room without books is like a body without a soul.",
        link: "/category/fiction",
        cta: "Enter Fantasy"
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance in pixels
    const minSwipeDistance = 50;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 3500);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className={`container ${styles.heroSection}`}>
            <div
                className={styles.mainSlider}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className={styles.slidesWrapper}>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className={styles.slideImage}
                                priority={index === 0}
                            />
                            <div className={styles.mainSliderOverlay}>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '0.5rem', color: 'white', lineHeight: '1.1' }}>
                                    {slide.title}
                                </h2>
                                <p style={{ fontSize: '1.2rem', opacity: 0.9, color: 'white', marginBottom: '2rem' }}>
                                    {slide.subtitle}
                                </p>
                                <Link href={slide.link} className={styles.shopNowBtn} style={{ alignSelf: 'flex-start', padding: '0.8rem 2rem', fontSize: '1rem' }}>
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.sliderControls}>
                    <div className={styles.dotsContainer}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.sideBanners}>
                <Link href="/category/exam-prep" className={`${styles.sideBanner} ${styles.examBanner}`}>
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

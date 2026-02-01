"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    image: string;
    description?: string;
    discount?: number;
}

interface AppContextType {
    wishlist: Product[];
    cart: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        const savedCart = localStorage.getItem('cart');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToWishlist = (product: Product) => {
        if (!wishlist.find((p: Product) => p.id === product.id)) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist(wishlist.filter((p: Product) => p.id !== productId));
    };

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter((p: Product) => p.id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((p: Product) => p.id === productId);
    };

    return (
        <AppContext.Provider value={{
            wishlist,
            cart,
            addToWishlist,
            removeFromWishlist,
            addToCart,
            removeFromCart,
            isInWishlist
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    image: string;
    description?: string;
    discount?: number;
    stock: number;
    category: string;
    sales: number;
    isTrending?: boolean;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
    isAwardWinner?: boolean;
}

export interface Order {
    id: string;
    customer: string;
    email: string;
    items: number;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: string;
}

interface AppContextType {
    wishlist: Product[];
    cart: Product[];
    products: Product[];
    orders: Order[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    // Admin functions
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    addOrder: (order: Order) => void;
    updateOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Data to seed the app if empty
const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1',
        title: "The Secret Language of Flowers",
        author: "Eleanor Vance",
        price: 499,
        originalPrice: 899,
        discount: 45,
        image: "/book_cover_romance.png",
        stock: 50,
        category: "Romance",
        sales: 120,
        isTrending: true
    },
    {
        id: '2',
        title: "Atomic Habits",
        author: "James Clear",
        price: 550,
        originalPrice: 999,
        discount: 45,
        image: "https://placehold.co/400x600/2a2a2a/FFF.png?text=Atomic+Habits",
        stock: 15,
        category: "Self Help",
        sales: 850,
        isTrending: true,
        isBestSeller: true
    },
    {
        id: '3',
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 420,
        originalPrice: 750,
        discount: 44,
        image: "https://placehold.co/400x600/123456/FFF.png?text=Psychology",
        stock: 20,
        category: "Business",
        sales: 430,
        isTrending: true
    },
    {
        id: '7',
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        price: 799,
        originalPrice: 1400,
        discount: 42,
        image: "https://placehold.co/400x600/550000/FFF.png?text=Fourth+Wing",
        stock: 10,
        category: "Fantasy",
        sales: 300,
        isNewArrival: true
    },
    {
        id: '13',
        title: "It Ends With Us",
        author: "Colleen Hoover",
        price: 299,
        originalPrice: 599,
        discount: 50,
        image: "https://placehold.co/400x600/FFC0CB/000.png?text=It+Ends+With+Us",
        stock: 100,
        category: "Romance",
        sales: 1500,
        isBestSeller: true
    }
];

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        const savedCart = localStorage.getItem('cart');
        const savedProducts = localStorage.getItem('managed_products');
        const savedOrders = localStorage.getItem('managed_orders');

        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            // Seed initial data
            setProducts(INITIAL_PRODUCTS);
            localStorage.setItem('managed_products', JSON.stringify(INITIAL_PRODUCTS));
        }
        if (savedOrders) setOrders(JSON.parse(savedOrders));
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('managed_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('managed_orders', JSON.stringify(orders));
    }, [orders]);

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

    // Admin Handlers
    const addProduct = (p: Product) => setProducts([...products, p]);

    const updateProduct = (updatedProduct: Product) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const addOrder = (o: Order) => setOrders([o, ...orders]);

    const updateOrder = (updatedOrder: Order) => {
        setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    };

    return (
        <AppContext.Provider value={{
            wishlist,
            cart,
            products,
            orders,
            addToWishlist,
            removeFromWishlist,
            addToCart,
            removeFromCart,
            isInWishlist,
            addProduct,
            updateProduct,
            deleteProduct,
            addOrder,
            updateOrder
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

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
    clearCart: () => void;
    processCheckout: (orderDetails: { customer: string, email: string }) => void;
    resetToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Data to seed the app if empty
const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1', title: "The Secret Language of Flowers", author: "Eleanor Vance", price: 499, originalPrice: 899, image: "https://placehold.co/400x600/FF6B6B/FFF?text=Flowers", stock: 25, category: "Fiction", sales: 120, isTrending: true, discount: 45
    },
    {
        id: '2', title: "Atomic Habits", author: "James Clear", price: 550, originalPrice: 999, image: "https://placehold.co/400x600/2a2a2a/FFF?text=Habits", stock: 25, category: "Self Help", sales: 850, isTrending: true, isBestSeller: true, discount: 45
    },
    {
        id: '3', title: "The Psychology of Money", author: "Morgan Housel", price: 420, originalPrice: 750, image: "https://placehold.co/400x600/123456/FFF?text=Money", stock: 25, category: "Business", sales: 430, isTrending: true, discount: 44
    },
    {
        id: '7', title: "Fourth Wing", author: "Rebecca Yarros", price: 799, originalPrice: 1400, image: "https://placehold.co/400x600/550000/FFF?text=Fourth+Wing", stock: 25, category: "Fantasy", sales: 300, isNewArrival: true, discount: 42
    },
    {
        id: '13', title: "It Ends With Us", author: "Colleen Hoover", price: 299, originalPrice: 599, image: "https://placehold.co/400x600/FFC0CB/000?text=Hoover", stock: 25, category: "Fiction", sales: 1500, isBestSeller: true, discount: 50
    },
    {
        id: 'b8', title: "Deep Work", author: "Cal Newport", price: 399, originalPrice: 699, image: "https://placehold.co/400x600/3b82f6/FFF?text=Deep+Work", stock: 25, category: "Self Help", sales: 210, isNewArrival: true, discount: 43
    },
    {
        id: 'b9', title: "Zero to One", author: "Peter Thiel", price: 450, originalPrice: 799, image: "https://placehold.co/400x600/0f172a/FFF?text=Zero+To+One", stock: 25, category: "Business", sales: 180, isAwardWinner: true, discount: 44
    },
    {
        id: 'b10', title: "Naruto: Vol 1", author: "Masashi Kishimoto", price: 350, originalPrice: 599, image: "https://placehold.co/400x600/f97316/FFF?text=Naruto", stock: 25, category: "Manga", sales: 1200, isBestSeller: true, discount: 42
    },
    {
        id: 'b11', title: "One Piece: Vol 1", author: "Eiichiro Oda", price: 350, originalPrice: 599, image: "https://placehold.co/400x600/ef4444/FFF?text=One+Piece", stock: 25, category: "Manga", sales: 900, isTrending: true, discount: 42
    },
    {
        id: 'b12', title: "The Little Prince", author: "Antoine de Saint-Exupéry", price: 199, originalPrice: 399, image: "https://placehold.co/400x600/38bdf8/FFF?text=Little+Prince", stock: 25, category: "Children", sales: 500, isAwardWinner: true, discount: 50
    },
    {
        id: 'b13', title: "Where the Wild Things Are", author: "Maurice Sendak", price: 250, originalPrice: 450, image: "https://placehold.co/400x600/166534/FFF?text=Wild+Things", stock: 25, category: "Children", sales: 300, isNewArrival: true, discount: 44
    },
    {
        id: 'b14', title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 599, originalPrice: 999, image: "https://placehold.co/400x600/065f46/FFF?text=Thinking", stock: 25, category: "Science", sales: 250, isAwardWinner: true, discount: 40
    },
    {
        id: 'b15', title: "Sapiens", author: "Yuval Noah Harari", price: 499, originalPrice: 899, image: "https://placehold.co/400x600/78350f/FFF?text=Sapiens", stock: 25, category: "Science", sales: 600, isBestSeller: true, discount: 45
    },
    {
        id: 'b16', title: "The Midnight Library", author: "Matt Haig", price: 350, originalPrice: 650, image: "https://placehold.co/400x600/1e3a8a/FFF?text=Midnight", stock: 25, category: "Fiction", sales: 400, isTrending: true, discount: 46
    },
    {
        id: 'b17', title: "Dune", author: "Frank Herbert", price: 599, originalPrice: 1099, image: "https://placehold.co/400x600/9a3412/FFF?text=Dune", stock: 25, category: "Fantasy", sales: 700, isBestSeller: true, discount: 45
    },
    {
        id: 'b18', title: "Crime and Punishment", author: "Fyodor Dostoevsky", price: 399, originalPrice: 799, image: "https://placehold.co/400x600/111827/FFF?text=Dostoevsky", stock: 25, category: "Fiction", sales: 150, isAwardWinner: true, discount: 50
    },
    {
        id: 'b19', title: "The Millionaire Fastlane", author: "MJ DeMarco", price: 650, originalPrice: 1200, image: "https://placehold.co/400x600/eab308/000?text=Fastlane", stock: 25, category: "Business", sales: 220, isTrending: true, discount: 46
    },
    {
        id: 'b20', title: "Attack on Titan: Vol 1", author: "Hajime Isayama", price: 420, originalPrice: 750, image: "https://placehold.co/400x600/7f1d1d/FFF?text=AoT", stock: 25, category: "Manga", sales: 550, isNewArrival: true, discount: 44
    },
    {
        id: 'b21', title: "Spy x Family: Vol 1", author: "Tatsuya Endo", price: 380, originalPrice: 650, image: "https://placehold.co/400x600/10b981/FFF?text=SpyFamily", stock: 25, category: "Manga", sales: 420, isTrending: true, discount: 42
    },
    {
        id: 'b22', title: "The Hindpocket Bible", author: "John Smith", price: 150, originalPrice: 300, image: "https://placehold.co/400x600/4c1d95/FFF?text=Pocket+Bible", stock: 25, category: "Self Help", sales: 100, isNewArrival: true, discount: 50
    },
    {
        id: 'b23', title: "Hyperfocus", author: "Chris Bailey", price: 450, originalPrice: 850, image: "https://placehold.co/400x600/4338ca/FFF?text=Hyperfocus", stock: 25, category: "Self Help", sales: 160, isTrending: true, discount: 47
    },
    {
        id: 'b24', title: "The 5 AM Club", author: "Robin Sharma", price: 499, originalPrice: 999, image: "https://placehold.co/400x600/b91c1c/FFF?text=5AM+Club", stock: 25, category: "Business", sales: 340, isBestSeller: true, discount: 50
    },
    {
        id: 'b25', title: "Percy Jackson: Lightning Thief", author: "Rick Riordan", price: 399, originalPrice: 699, image: "https://placehold.co/400x600/0ea5e9/FFF?text=Percy+Jackson", stock: 25, category: "Children", sales: 800, isBestSeller: true, discount: 43
    },
    {
        id: 'e1', title: "UPSC Civil Services Prelims Guide", author: "Arihant Experts", price: 850, originalPrice: 1200, image: "https://placehold.co/400x600/1e3a8a/FFF?text=UPSC+Prelims", stock: 25, category: "Exam Prep", sales: 150, isTrending: true, discount: 29
    },
    {
        id: 'e2', title: "SAT Prep Black Book", author: "Mike Barrett", price: 999, originalPrice: 1500, image: "https://placehold.co/400x600/4c1d95/FFF?text=SAT+Black+Book", stock: 25, category: "Exam Prep", sales: 80, isNewArrival: true, discount: 33
    },
    {
        id: 'e3', title: "Oxford Student Atlas", author: "Oxford University Press", price: 350, originalPrice: 550, image: "https://placehold.co/400x600/065f46/FFF?text=Oxford+Atlas", stock: 25, category: "Exam Prep", sales: 300, isBestSeller: true, discount: 36
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
            const parsedProducts: Product[] = JSON.parse(savedProducts);

            // LOGIC: If the user has fewer than 28 books, they are missing the new 'Exam Prep' updates.
            // Reset to the new INITIAL_PRODUCTS to ensure they see the full catalog.
            if (parsedProducts.length < 28) {
                setProducts(INITIAL_PRODUCTS);
                localStorage.setItem('managed_products', JSON.stringify(INITIAL_PRODUCTS));
            } else {
                setProducts(parsedProducts);
            }
        } else {
            // Seed initial data for first time users
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

    const clearCart = () => setCart([]);

    const processCheckout = (details: { customer: string, email: string }) => {
        // 1. Create the order
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const newOrder: Order = {
            id: `ORD-${Date.now().toString().slice(-6)}`,
            customer: details.customer,
            email: details.email,
            items: cart.length,
            total: subtotal + 50,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        // 2. Deduct stock for each item in cart
        const updatedProducts = products.map(p => {
            const itemsInCart = cart.filter(item => item.id === p.id).length;
            if (itemsInCart > 0) {
                return { ...p, stock: Math.max(0, p.stock - itemsInCart), sales: (p.sales || 0) + itemsInCart };
            }
            return p;
        });

        setProducts(updatedProducts);
        setOrders([newOrder, ...orders]);
        setCart([]); // Clear cart
    };

    const resetToDefault = () => {
        if (confirm("This will delete all your edits and restore the 25+ default books. Continue?")) {
            setProducts(INITIAL_PRODUCTS);
            localStorage.setItem('managed_products', JSON.stringify(INITIAL_PRODUCTS));
            setOrders([]);
            localStorage.removeItem('managed_orders');
            window.location.reload();
        }
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
            updateOrder,
            clearCart,
            processCheckout,
            resetToDefault
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

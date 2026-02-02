"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Search,
    Plus,
    Edit2,
    Trash2,
    TrendingUp,
    DollarSign,
    BookOpen,
    Settings,
    Bell,
    LogOut,
    Filter,
    MoreVertical,
    X,
    ChevronRight,
    Eye,
    AlertTriangle,
    CheckCircle2,
    RefreshCw,
    Lock
} from 'lucide-react';
import Link from 'next/link';
import { useAppContext, Product, Order } from '../context/AppContext';

// --- Components ---

type TabType = 'overview' | 'inventory' | 'orders' | 'access';

export default function AdminPage() {
    const { products, orders, updateProduct, addProduct, deleteProduct, updateOrder, resetToDefault } = useAppContext();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [stockFilter, setStockFilter] = useState<'all' | 'in' | 'out'>('all');

    // Check auth on mount
    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    // Auto-hide notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase());

            if (stockFilter === 'all') return matchesSearch;
            if (stockFilter === 'in') return matchesSearch && p.stock > 0;
            if (stockFilter === 'out') return matchesSearch && p.stock === 0;
            return matchesSearch;
        });
    }, [products, searchQuery, stockFilter]);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const notify = (message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
    };

    const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const price = Number(formData.get('price'));
        const originalPrice = Number(formData.get('originalPrice'));
        const discount = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

        const productData: Product = {
            id: editingProduct ? editingProduct.id : `book-${Date.now()}`,
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            stock: Number(formData.get('stock')),
            category: formData.get('category') as string,
            image: (formData.get('image') as string) || "https://placehold.co/400x600?text=No+Image",
            sales: editingProduct ? editingProduct.sales : 0,
            description: formData.get('description') as string,
            isTrending: formData.get('isTrending') === 'on',
            isNewArrival: formData.get('isNewArrival') === 'on',
            isBestSeller: formData.get('isBestSeller') === 'on',
            isAwardWinner: formData.get('isAwardWinner') === 'on',
        };

        if (editingProduct) {
            updateProduct(productData);
            notify("Book details updated successfully!");
        } else {
            addProduct(productData);
            notify("New book added to inventory!");
        }
        setIsModalOpen(false);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = formData.get('username');
        const pass = formData.get('password');

        if (user === 'admin' && pass === 'admin123') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setLoginError("");
        } else {
            setLoginError("Invalid credentials. Please try again.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
    };

    if (!isAuthenticated) {
        return (
            <div className="loginContainer" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                padding: '2rem'
            }}>
                <div className="loginCard" style={{
                    background: 'white',
                    padding: '3.5rem',
                    borderRadius: '32px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
                    width: '100%',
                    maxWidth: '420px',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: '#fee2e2',
                        color: '#E42B26',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Lock size={32} />
                    </div>
                    <h1 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '2rem' }}>Admin Access</h1>
                    <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Secure gateway for Rohini Book Depot</p>

                    <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1.1rem',
                                    borderRadius: '14px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.75rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1.1rem',
                                    borderRadius: '14px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem', textAlign: 'center' }}>{loginError}</p>}
                        <button type="submit" style={{
                            width: '100%',
                            padding: '1.1rem',
                            background: '#0f172a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '1.05rem'
                        }}>Unlock Dashboard</button>
                    </form>
                    <Link href="/" style={{ display: 'inline-block', marginTop: '2.5rem', color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>← Return to Store</Link>
                </div>
            </div>
        );
    }

    const handleDelete = (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteProduct(id);
            notify("Book removed from inventory", "error");
        }
    };

    return (
        <div className="adminContainer">
            {/* Toast Notification */}
            {notification && (
                <div className={`toast ${notification.type}`}>
                    {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    {notification.message}
                </div>
            )}

            {/* Sidebar */}
            <aside className="adminSidebar">
                <div className="sidebarHeader">
                    <Link href="/" className="adminLogo">
                        <span className="logoIcon">R</span>
                        <span className="logoText">Rohini<span>Admin</span></span>
                    </Link>
                </div>

                <nav className="sidebarNav">
                    <p className="navSectionLabel">Main Menu</p>
                    <button className={`navItem ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </button>
                    <button className={`navItem ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
                        <Package size={20} />
                        <span>Inventory</span>
                    </button>
                    <button className={`navItem ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        <ShoppingCart size={20} />
                        <span>Orders</span>
                    </button>

                    <p className="navSectionLabel mt-6">System</p>
                    <button className={`navItem ${activeTab === 'access' ? 'active' : ''}`} onClick={() => setActiveTab('access')}>
                        <Users size={20} />
                        <span>Access Control</span>
                    </button>
                    <button className="navItem">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </nav>

                <div className="sidebarFooter">
                    <div className="userBadge">
                        <div className="avatar">AD</div>
                        <div className="userInfo">
                            <span className="userName">Master Admin</span>
                            <span className="userRole">Superuser</span>
                        </div>
                    </div>
                    <button className="logoutBtn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="adminMain">
                <header className="adminHeader">
                    <div className="headerLeft">
                        <div className="breadcrumb">
                            <span>Admin</span>
                            <ChevronRight size={14} />
                            <span className="current">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                        </div>
                        <h1 className="tabTitle">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    </div>

                    <div className="headerRight">
                        <div className="searchBarContainer">
                            <Search size={18} className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Find anything..."
                                className="headerSearch"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="iconBtn">
                            <Bell size={20} />
                            <span className="badge"></span>
                        </button>
                        <button className="iconBtn resetBtn" title="Reset System" onClick={resetToDefault}>
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </header>

                <div className="adminScrollArea">
                    {activeTab === 'overview' && <OverviewTab orders={orders} products={products} />}
                    {activeTab === 'inventory' && (
                        <InventoryTab
                            products={filteredProducts}
                            onEdit={handleEdit}
                            onAdd={handleAddNew}
                            onDelete={handleDelete}
                            currentFilter={stockFilter}
                            onFilterChange={setStockFilter}
                        />
                    )}
                    {activeTab === 'orders' && <OrdersTab orders={orders} updateOrder={updateOrder} />}
                    {activeTab === 'access' && <AccessTab />}
                </div>
            </main>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modalContent" onClick={e => e.stopPropagation()}>
                        <div className="modalHeader">
                            <div>
                                <h2>{editingProduct ? 'Edit Book Details' : 'Add New Inventory'}</h2>
                                <p>Ensure all metadata is correct for SEO</p>
                            </div>
                            <button className="closeBtn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveProduct} className="productForm">
                            <div className="formGrid">
                                <div className="formGroup full">
                                    <label>Book Title</label>
                                    <input name="title" defaultValue={editingProduct?.title} required placeholder="Enter compelling book title" />
                                </div>
                                <div className="formGroup">
                                    <label>Author / Publisher</label>
                                    <input name="author" defaultValue={editingProduct?.author} required placeholder="Full name of author" />
                                </div>
                                <div className="formGroup">
                                    <label>Category</label>
                                    <select name="category" defaultValue={editingProduct?.category} required className="selectInput">
                                        <option value="Fiction">Fiction</option>
                                        <option value="Business">Business</option>
                                        <option value="Self Help">Self Help</option>
                                        <option value="Manga">Manga</option>
                                        <option value="Fantasy">Fantasy</option>
                                        <option value="Children">Children</option>
                                        <option value="Science">Science</option>
                                        <option value="Mystery">Mystery</option>
                                    </select>
                                </div>
                                <div className="formGroup">
                                    <label>Sales Price (₹)</label>
                                    <input type="number" name="price" defaultValue={editingProduct?.price} required />
                                </div>
                                <div className="formGroup">
                                    <label>M.R.P (₹)</label>
                                    <input type="number" name="originalPrice" defaultValue={editingProduct?.originalPrice} required />
                                </div>
                                <div className="formGroup">
                                    <label>Stock Count</label>
                                    <input type="number" name="stock" defaultValue={editingProduct?.stock} required />
                                </div>
                                <div className="formGroup">
                                    <label>Cover Image URL</label>
                                    <input name="image" defaultValue={editingProduct?.image} placeholder="https://example.com/cover.jpg" />
                                </div>
                                <div className="formGroup full">
                                    <label>Description</label>
                                    <textarea name="description" defaultValue={editingProduct?.description} placeholder="Short blurb for the product page..." rows={3} />
                                </div>
                            </div>

                            <div className="flagsContainer">
                                <p>Placement & Promotion</p>
                                <div className="flagsGrid">
                                    <label className="checkboxCard">
                                        <input type="checkbox" name="isTrending" defaultChecked={editingProduct?.isTrending} />
                                        <div className="checkContent">
                                            <TrendingUp size={16} />
                                            <span>Trending</span>
                                        </div>
                                    </label>
                                    <label className="checkboxCard">
                                        <input type="checkbox" name="isNewArrival" defaultChecked={editingProduct?.isNewArrival} />
                                        <div className="checkContent">
                                            <Plus size={16} />
                                            <span>New Arrival</span>
                                        </div>
                                    </label>
                                    <label className="checkboxCard">
                                        <input type="checkbox" name="isBestSeller" defaultChecked={editingProduct?.isBestSeller} />
                                        <div className="checkContent">
                                            <CheckCircle2 size={16} />
                                            <span>Best Seller</span>
                                        </div>
                                    </label>
                                    <label className="checkboxCard">
                                        <input type="checkbox" name="isAwardWinner" defaultChecked={editingProduct?.isAwardWinner} />
                                        <div className="checkContent">
                                            <DollarSign size={16} />
                                            <span>Award Winner</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="formActions">
                                <button type="button" className="btnSecondary" onClick={() => setIsModalOpen(false)}>Discard</button>
                                <button type="submit" className="btnPrimary">{editingProduct ? 'Save Changes' : 'Publish Book'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        .adminContainer { display: flex; height: 100vh; background: #f8fafc; color: #1e293b; font-family: 'Inter', system-ui, sans-serif; overflow: hidden; position: relative; }
        
        /* Toast */
        .toast { position: fixed; top: 2rem; left: 50%; transform: translateX(-50%); z-index: 2000; padding: 1rem 1.5rem; border-radius: 12px; background: white; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 0.9rem; animation: slideIn 0.3s ease-out; }
        .toast.success { border-left: 4px solid #10b981; color: #065f46; }
        .toast.error { border-left: 4px solid #ef4444; color: #991b1b; }
        @keyframes slideIn { from { transform: translate(-50%, -20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }

        /* Sidebar */
        .adminSidebar { width: 280px; background: #0f172a; color: #94a3b8; display: flex; flex-direction: column; padding: 2rem 1.5rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebarHeader { margin-bottom: 3rem; }
        .adminLogo { display: flex; align-items: center; gap: 14px; text-decoration: none; }
        .logoIcon { background: #E42B26; color: white; width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.6rem; }
        .logoText { font-size: 1.25rem; font-weight: 800; color: white; letter-spacing: -0.5px; }
        .logoText span { color: #E42B26; margin-left: 2px; }
        
        .navSectionLabel { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin-bottom: 0.75rem; padding-left: 1rem; }
        .sidebarNav { flex: 1; }
        .navItem { display: flex; align-items: center; gap: 14px; padding: 0.875rem 1rem; border-radius: 10px; color: #94a3b8; font-weight: 500; border: none; background: none; width: 100%; text-align: left; cursor: pointer; transition: all 0.2s; margin-bottom: 4px; }
        .navItem:hover { background: rgba(255,255,255,0.05); color: white; }
        .navItem.active { background: #E42B26; color: white; box-shadow: 0 4px 12px rgba(228, 43, 38, 0.3); }
        .mt-6 { margin-top: 1.5rem; }

        .sidebarFooter { padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); gap: 1.5rem; display: flex; flex-direction: column; }
        .userBadge { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
        .userInfo { display: flex; flex-direction: column; }
        .userName { font-size: 0.875rem; font-weight: 600; color: white; }
        .userRole { font-size: 0.75rem; color: #64748b; }
        .logoutBtn { display: flex; align-items: center; gap: 10px; color: #f43f5e; background: none; border: none; cursor: pointer; font-weight: 600; padding: 0.5rem; border-radius: 8px; transition: background 0.2s; }
        .logoutBtn:hover { background: rgba(244, 63, 94, 0.1); }

        /* Main */
        .adminMain { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #f1f5f9; }
        .adminHeader { height: 90px; background: white; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 3rem; }
        .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #64748b; margin-bottom: 4px; }
        .breadcrumb .current { color: #E42B26; font-weight: 600; }
        .tabTitle { font-size: 1.75rem; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
        
        .headerRight { display: flex; align-items: center; gap: 1rem; }
        .searchBarContainer { position: relative; width: 320px; }
        .searchIcon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .headerSearch { width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; font-size: 0.9rem; transition: all 0.2s; }
        .headerSearch:focus { border-color: #E42B26; background: white; outline: none; box-shadow: 0 0 0 4px rgba(228, 43, 38, 0.05); }
        .iconBtn { background: white; border: 1px solid #e2e8f0; padding: 10px; border-radius: 12px; color: #64748b; cursor: pointer; transition: all 0.2s; position: relative; }
        .iconBtn:hover { border-color: #E42B26; color: #E42B26; background: #fff1f2; }
        .badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid white; }

        .adminScrollArea { flex: 1; overflow-y: auto; padding: 3rem; }

        /* Modal Overhaul */
        .modalOverlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1500; padding: 20px; }
        .modalContent { background: white; width: 100%; max-width: 720px; border-radius: 24px; padding: 3rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .modalHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
        .modalHeader h2 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .modalHeader p { color: #64748b; font-size: 0.9rem; }
        .closeBtn { background: #f1f5f9; border: none; color: #64748b; cursor: pointer; padding: 8px; border-radius: 12px; transition: all 0.2s; }
        .closeBtn:hover { background: #fee2e2; color: #ef4444; }
        
        .productForm { display: flex; flex-direction: column; gap: 2rem; }
        .formGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .formGroup { display: flex; flex-direction: column; gap: 8px; }
        .formGroup.full { grid-column: span 2; }
        .formGroup label { font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
        .formGroup input, .formGroup select, .formGroup textarea { padding: 12px 14px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 0.95rem; background: #f8fafc; transition: all 0.2s; }
        .formGroup input:focus { border-color: #E42B26; background: white; outline: none; box-shadow: 0 0 0 4px rgba(228, 43, 38, 0.05); }
        
        .flagsContainer p { font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 12px; }
        .flagsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .checkboxCard { cursor: pointer; }
        .checkboxCard input { display: none; }
        .checkContent { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: all 0.2s; color: #64748b; }
        .checkboxCard input:checked + .checkContent { border-color: #E42B26; background: #fff1f2; color: #E42B26; box-shadow: 0 4px 6px -1px rgba(228, 43, 38, 0.1); }
        
        .formActions { display: flex; gap: 1rem; margin-top: 1rem; }
        .btnSecondary { flex: 1; padding: 14px; border-radius: 14px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; color: #64748b; transition: all 0.2s; }
        .btnSecondary:hover { background: #f8fafc; color: #0f172a; }
        .btnPrimary { flex: 2; padding: 14px; border-radius: 14px; border: none; background: #E42B26; color: white; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(228, 43, 38, 0.3); }
        .btnPrimary:hover { background: #b91c18; transform: translateY(-2px); }
      `}</style>
        </div>
    );
}

function StatsCard({ title, value, icon, color, trend }: any) {
    return (
        <div className="statsCard">
            <div className="statsHeader">
                <div className="statsIcon" style={{ backgroundColor: color + '15', color: color }}>{icon}</div>
                {trend && <span className={`trend ${trend > 0 ? 'up' : 'down'}`}>{trend > 0 ? '+' : ''}{trend}%</span>}
            </div>
            <div className="statsInfo">
                <p className="statsTitle">{title}</p>
                <h3 className="statsValue">{value}</h3>
            </div>
            <style jsx>{`
        .statsCard { background: white; padding: 1.5rem; border-radius: 24px; border: 1px solid #eef2f6; transition: all 0.3s; }
        .statsCard:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); border-color: #e2e8f0; }
        .statsHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .statsIcon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .trend { padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; }
        .trend.up { background: #d1fae5; color: #065f46; }
        .trend.down { background: #fee2e2; color: #991b1b; }
        .statsTitle { font-size: 0.875rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
        .statsValue { font-size: 1.75rem; font-weight: 800; color: #0f172a; }
      `}</style>
        </div>
    );
}

function OverviewTab({ orders, products }: any) {
    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
    const totalSalesCount = orders.filter((o: any) => o.status === 'Delivered').length;
    const lowStockCount = products.filter((p: any) => p.stock <= 5).length;
    const recentOrders = orders.slice(0, 5);

    return (
        <div className="overviewTab">
            <div className="statsGrid">
                <StatsCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<DollarSign />} color="#E42B26" trend={12.5} />
                <StatsCard title="Delivered Orders" value={totalSalesCount} icon={<CheckCircle2 />} color="#10b981" trend={8.2} />
                <StatsCard title="Low Stock Items" value={lowStockCount} icon={<AlertTriangle />} color="#f59e0b" trend={-2.4} />
                <StatsCard title="Catalog Size" value={products.length} icon={<BookOpen />} color="#3b82f6" trend={1.2} />
            </div>

            <div className="dashboardGrid mt-10">
                <div className="tableCard">
                    <div className="cardHeader">
                        <h3>Recent Orders</h3>
                        <button className="textBtn">View Report</button>
                    </div>
                    <table className="miniTable">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length === 0 ? (
                                <tr><td colSpan={3} className="empty">No recent orders</td></tr>
                            ) : (
                                recentOrders.map((o: any) => (
                                    <tr key={o.id}>
                                        <td>
                                            <div className="customerCell">
                                                <div className="smallAvatar">{o.customer.charAt(0)}</div>
                                                <span>{o.customer}</span>
                                            </div>
                                        </td>
                                        <td><span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                                        <td className="font-bold">₹{o.total}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="topProductsCard">
                    <div className="cardHeader">
                        <h3>Top Selling Books</h3>
                        <Link href="/admin/inventory" className="textBtn">Manage</Link>
                    </div>
                    <div className="topList">
                        {products.sort((a: any, b: any) => (b.sales || 0) - (a.sales || 0)).slice(0, 5).map((p: any) => (
                            <div key={p.id} className="topListItem">
                                <img src={p.image} alt="" />
                                <div className="itemMain">
                                    <h4>{p.title}</h4>
                                    <p>{p.category}</p>
                                </div>
                                <div className="itemStats">
                                    <span className="salesCount">{p.sales || 0} sales</span>
                                    <span className="revenue">₹{(p.sales || 0) * p.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .overviewTab { display: flex; flex-direction: column; gap: 2rem; }
        .statsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
        .mt-10 { margin-top: 2.5rem; }
        .dashboardGrid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 2rem; }
        
        .tableCard, .topProductsCard { background: white; border-radius: 24px; padding: 2rem; border: 1px solid #eef2f6; }
        .cardHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .cardHeader h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
        .textBtn { font-size: 0.875rem; font-weight: 700; color: #E42B26; background: none; border: none; cursor: pointer; text-decoration: none; }
        
        .miniTable { width: 100%; border-collapse: collapse; }
        .miniTable th { text-align: left; padding: 12px; font-size: 0.75rem; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .miniTable td { padding: 16px 12px; font-size: 0.9rem; border-bottom: 1px solid #f8fafc; }
        .customerCell { display: flex; align-items: center; gap: 10px; }
        .smallAvatar { width: 28px; height: 28px; border-radius: 8px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #475569; }
        .badge { padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .badge.delivered { background: #d1fae5; color: #065f46; }
        .badge.pending { background: #f1f5f9; color: #475569; }
        .badge.processing { background: #e0f2fe; color: #0369a1; }
        .font-bold { font-weight: 700; color: #0f172a; }
        
        .topList { display: flex; flex-direction: column; gap: 1rem; }
        .topListItem { display: flex; align-items: center; gap: 12px; padding: 0.75rem; border-radius: 16px; transition: background 0.2s; }
        .topListItem:hover { background: #f8fafc; }
        .topListItem img { width: 48px; height: 68px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .itemMain { flex: 1; }
        .itemMain h4 { font-size: 0.9rem; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .itemMain p { font-size: 0.75rem; color: #64748b; }
        .itemStats { display: flex; flex-direction: column; align-items: flex-end; }
        .salesCount { font-size: 0.8rem; font-weight: 700; color: #10b981; }
        .revenue { font-size: 0.75rem; color: #64748b; font-weight: 500; }
        
        @media (max-width: 1200px) {
          .dashboardGrid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}

function InventoryTab({ products, onEdit, onAdd, onDelete, currentFilter, onFilterChange }: any) {
    return (
        <div className="inventoryTab">
            <div className="tableControls">
                <div className="statusFilters">
                    <button
                        className={`statusFilter ${currentFilter === 'all' ? 'active' : ''}`}
                        onClick={() => onFilterChange('all')}
                    >All Items</button>
                    <button
                        className={`statusFilter ${currentFilter === 'in' ? 'active' : ''}`}
                        onClick={() => onFilterChange('in')}
                    >In Stock</button>
                    <button
                        className={`statusFilter ${currentFilter === 'out' ? 'active' : ''}`}
                        onClick={() => onFilterChange('out')}
                    >Out of Stock</button>
                </div>
                <button className="addBtn" onClick={onAdd}>
                    <Plus size={20} />
                    <span>Add New Book</span>
                </button>
            </div>

            <div className="inventoryCard">
                <table className="mainTable">
                    <thead>
                        <tr>
                            <th>Book Details</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock Level</th>
                            <th>Visi-Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p: any) => (
                            <tr key={p.id}>
                                <td>
                                    <div className="productMainCell">
                                        <img src={p.image} alt="" className="tableThumb" />
                                        <div>
                                            <div className="tableTitle">{p.title}</div>
                                            <div className="tableAuthor">by {p.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="categoryTag">{p.category}</span></td>
                                <td>
                                    <div className="priceCell">
                                        <span className="currentPrice">₹{p.price}</span>
                                        <span className="oldPrice">₹{p.originalPrice}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="stockDisplay">
                                        <div className="stockMeter">
                                            <div className="meterFill" style={{
                                                width: `${Math.min(p.stock * 2, 100)}%`,
                                                background: p.stock > 10 ? '#10b981' : p.stock > 0 ? '#f59e0b' : '#ef4444'
                                            }}></div>
                                        </div>
                                        <span className={p.stock <= 5 ? 'critical' : ''}>{p.stock} units</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="visibilityBadges">
                                        {p.isTrending && <span className="vBadge trend" title="Trending">Tr</span>}
                                        {p.isBestSeller && <span className="vBadge best" title="Best Seller">BS</span>}
                                        {p.isNewArrival && <span className="vBadge new" title="New Arrival">New</span>}
                                    </div>
                                </td>
                                <td>
                                    <div className="actionGroup">
                                        <button className="actionIcon edit" onClick={() => onEdit(p)} title="Edit"><Edit2 size={18} /></button>
                                        <button className="actionIcon delete" onClick={() => onDelete(p.id, p.title)} title="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .inventoryTab { display: flex; flex-direction: column; gap: 2rem; }
        .tableControls { display: flex; justify-content: space-between; align-items: center; }
        .statusFilters { display: flex; background: white; padding: 4px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .statusFilter { padding: 8px 16px; border-radius: 10px; border: none; background: none; font-size: 0.85rem; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.2s; }
        .statusFilter.active { background: #f1f5f9; color: #0f172a; }
        
        .addBtn { display: flex; align-items: center; gap: 10px; background: #E42B26; color: white; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(228, 43, 38, 0.3); transition: all 0.2s; }
        .addBtn:hover { background: #b91c18; transform: translateY(-2px); }
        
        .inventoryCard { background: white; border-radius: 24px; border: 1px solid #eef2f6; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .mainTable { width: 100%; border-collapse: collapse; }
        .mainTable th { background: #f8fafc; padding: 1.25rem 1.5rem; text-align: left; font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .mainTable td { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        
        .productMainCell { display: flex; align-items: center; gap: 16px; }
        .tableThumb { width: 50px; height: 75px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .tableTitle { font-weight: 700; color: #0f172a; font-size: 1rem; margin-bottom: 4px; }
        .tableAuthor { font-size: 0.8rem; color: #64748b; }
        
        .categoryTag { padding: 6px 12px; background: #f1f5f9; border-radius: 8px; font-size: 0.75rem; font-weight: 700; color: #475569; }
        
        .priceCell { display: flex; flex-direction: column; }
        .currentPrice { font-weight: 800; color: #E42B26; font-size: 1.1rem; }
        .oldPrice { font-size: 0.8rem; color: #94a3b8; text-decoration: line-through; }
        
        .stockDisplay { display: flex; flex-direction: column; gap: 6px; width: 100px; }
        .stockMeter { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .meterFill { height: 100%; border-radius: 10px; transition: width 0.5s ease; }
        .stockDisplay span { font-size: 0.8rem; font-weight: 600; color: #64748b; }
        .stockDisplay span.critical { color: #ef4444; }
        
        .visibilityBadges { display: flex; gap: 4px; }
        .vBadge { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 800; border: 1px solid; }
        .vBadge.trend { background: #fff1f2; color: #E42B26; border-color: #fecaca; }
        .vBadge.best { background: #ecfdf5; color: #10b981; border-color: #a7f3d0; }
        .vBadge.new { background: #eff6ff; color: #3b82f6; border-color: #bfdbfe; }
        
        .actionGroup { display: flex; gap: 8px; }
        .actionIcon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s; }
        .actionIcon.edit:hover { background: #fff1f2; color: #E42B26; border-color: #E42B26; }
        .actionIcon.delete:hover { background: #fee2e2; color: #ef4444; border-color: #ef4444; }
      `}</style>
        </div>
    );
}

function OrdersTab({ orders, updateOrder }: any) {
    const handleStatusChange = (order: Order, status: string) => {
        updateOrder({ ...order, status: status as any });
    };

    return (
        <div className="ordersTab">
            <div className="orderStats">
                <div className="oStat"><span>{orders.length}</span> Total Requests</div>
                <div className="oStat pending"><span>{orders.filter((o: any) => o.status === 'Pending').length}</span> To Process</div>
                <div className="oStat shipped"><span>{orders.filter((o: any) => o.status === 'Shipped').length}</span> In Transit</div>
            </div>

            <div className="orderList">
                {orders.length === 0 ? (
                    <div className="emptyOrders">
                        <ShoppingCart size={48} />
                        <h3>No orders received yet</h3>
                        <p>Once customers start buying, their details will appear here.</p>
                    </div>
                ) : (
                    orders.map((order: any) => (
                        <div key={order.id} className="orderCard">
                            <div className="orderMain">
                                <div className="oSection">
                                    <span className="oLabel">Order Ref</span>
                                    <div className="oValue ID">#{order.id}</div>
                                    <div className="oSub">{order.date}</div>
                                </div>
                                <div className="oSection">
                                    <span className="oLabel">Customer</span>
                                    <div className="oValue">{order.customer}</div>
                                    <div className="oSub">{order.email}</div>
                                </div>
                                <div className="oSection">
                                    <span className="oLabel">Package</span>
                                    <div className="oValue">{order.items} Books</div>
                                    <div className="oSub">Cash on Delivery</div>
                                </div>
                                <div className="oSection">
                                    <span className="oLabel">Payable</span>
                                    <div className="oValue total">₹{order.total}</div>
                                </div>
                                <div className="oSection status">
                                    <span className="oLabel">Current Status</span>
                                    <select
                                        className={`statusDropdown ${order.status.toLowerCase()}`}
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="oSection actions">
                                    <button className="viewDetails"><Eye size={18} /></button>
                                    <button className="printInvoice"><X size={18} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
        .ordersTab { display: flex; flex-direction: column; gap: 2rem; }
        .orderStats { display: flex; gap: 1rem; }
        .oStat { background: white; padding: 1rem 1.5rem; border-radius: 16px; border: 1px solid #e2e8f0; font-size: 0.9rem; font-weight: 600; color: #64748b; }
        .oStat span { font-weight: 800; color: #0f172a; margin-right: 6px; }
        .oStat.pending span { color: #f59e0b; }
        .oStat.shipped span { color: #3b82f6; }

        .orderList { display: flex; flex-direction: column; gap: 1rem; }
        .emptyOrders { text-align: center; padding: 6rem 2rem; background: white; border-radius: 24px; color: #94a3b8; }
        .emptyOrders h3 { color: #475569; margin: 1.5rem 0 0.5rem; }
        
        .orderCard { background: white; border-radius: 20px; padding: 1.5rem; border: 1px solid #eef2f6; transition: border-color 0.2s; }
        .orderCard:hover { border-color: #E42B26; }
        .orderMain { display: grid; grid-template-columns: 1fr 1.5fr 1fr 0.8fr 1.2fr 0.8fr; align-items: center; gap: 2rem; }
        .oSection { display: flex; flex-direction: column; gap: 4px; }
        .oLabel { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .oValue { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
        .oValue.ID { color: #0f172a; font-family: monospace; }
        .oValue.total { color: #E42B26; font-size: 1.1rem; }
        .oSub { font-size: 0.75rem; color: #64748b; }
        
        .statusDropdown { padding: 8px 12px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; border: 1px solid #e2e8f0; outline: none; cursor: pointer; transition: all 0.2s; }
        .statusDropdown.pending { background: #f1f5f9; color: #475569; }
        .statusDropdown.processing { background: #e0f2fe; color: #0369a1; }
        .statusDropdown.shipped { background: #fef3c7; color: #92400e; }
        .statusDropdown.delivered { background: #d1fae5; color: #065f46; }
        .statusDropdown.cancelled { background: #fee2e2; color: #991b1b; }
        
        .viewDetails, .printInvoice { border: none; background: #f1f5f9; color: #64748b; padding: 8px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .viewDetails:hover { background: #e2e8f0; color: #0f172a; }
        .printInvoice:hover { background: #fee2e2; color: #ef4444; }
        
        @media (max-width: 1100px) {
          .orderMain { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
      `}</style>
        </div>
    );
}

function AccessTab() {
    return (
        <div className="accessTab">
            <div className="emptyState">
                <Users size={64} color="#e2e8f0" />
                <h2>Access Control System</h2>
                <p>Manage staff permissions and API keys from this panel.</p>
                <button className="btnPrimary mt-4">Generate Admin Key</button>
            </div>
            <style jsx>{`
        .emptyState { text-align: center; padding: 8rem 2rem; background: white; border-radius: 24px; color: #64748b; border: 2px dashed #e2e8f0; }
        .emptyState h2 { color: #0f172a; margin: 2rem 0 0.5rem; font-weight: 800; }
        .mt-4 { margin-top: 1.5rem; }
      `}</style>
        </div>
    );
}

"use client";

import React, { useState, useEffect } from 'react';
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
    X
} from 'lucide-react';
import Link from 'next/link';
import { useAppContext, Product, Order } from '../context/AppContext';

// --- Components ---

type TabType = 'overview' | 'inventory' | 'orders' | 'access';

export default function AdminPage() {
    const { products, orders, updateProduct, addProduct, deleteProduct, updateOrder } = useAppContext();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const productData: any = {
            id: editingProduct ? editingProduct.id : Date.now().toString(),
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            price: Number(formData.get('price')),
            originalPrice: Number(formData.get('originalPrice')),
            stock: Number(formData.get('stock')),
            category: formData.get('category') as string,
            image: (formData.get('image') as string) || "https://placehold.co/400x600?text=No+Image",
            sales: editingProduct ? editingProduct.sales : 0,
            isTrending: formData.get('isTrending') === 'on',
            isNewArrival: formData.get('isNewArrival') === 'on',
            isBestSeller: formData.get('isBestSeller') === 'on',
            isAwardWinner: formData.get('isAwardWinner') === 'on',
        };

        if (editingProduct) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="adminContainer">
            {/* Sidebar */}
            <aside className="adminSidebar">
                <div className="sidebarHeader">
                    <div className="adminLogo">
                        <span className="logoIcon">R</span>
                        <span className="logoText">Admin<span>Panel</span></span>
                    </div>
                </div>

                <nav className="sidebarNav">
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
                    <button className={`navItem ${activeTab === 'access' ? 'active' : ''}`} onClick={() => setActiveTab('access')}>
                        <Users size={20} />
                        <span>Access Control</span>
                    </button>
                </nav>

                <div className="sidebarFooter">
                    <button className="navItem logout">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="adminMain">
                <header className="adminHeader">
                    <div className="headerLeft">
                        <h1 className="tabTitle">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                        <p className="tabSubtitle">Real-time store management</p>
                    </div>
                    <div className="headerRight">
                        <div className="searchBarContainer">
                            <Search size={18} className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="headerSearch"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="notificationBtn">
                            <Bell size={20} />
                            <span className="notificationDot"></span>
                        </button>
                        <div className="adminProfile">
                            <div className="profileImg">A</div>
                        </div>
                    </div>
                </header>

                <div className="adminScrollArea">
                    {activeTab === 'overview' && <OverviewTab orders={orders} products={products} />}
                    {activeTab === 'inventory' && (
                        <InventoryTab
                            products={filteredProducts}
                            onEdit={handleEdit}
                            onAdd={handleAddNew}
                            onDelete={deleteProduct}
                        />
                    )}
                    {activeTab === 'orders' && <OrdersTab orders={orders} updateOrder={updateOrder} />}
                    {activeTab === 'access' && <AccessTab />}
                </div>
            </main>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <div className="modalHeader">
                            <h2>{editingProduct ? 'Edit Book' : 'Add New Book'}</h2>
                            <button className="closeBtn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveProduct} className="productForm">
                            <div className="formGroup">
                                <label>Book Title</label>
                                <input name="title" defaultValue={editingProduct?.title} required placeholder="e.g. Atomic Habits" />
                            </div>
                            <div className="formGroup">
                                <label>Author</label>
                                <input name="author" defaultValue={editingProduct?.author} required placeholder="e.g. James Clear" />
                            </div>
                            <div className="formRow">
                                <div className="formGroup">
                                    <label>Price (₹)</label>
                                    <input type="number" name="price" defaultValue={editingProduct?.price} required />
                                </div>
                                <div className="formGroup">
                                    <label>Original Price (₹)</label>
                                    <input type="number" name="originalPrice" defaultValue={editingProduct?.originalPrice} required />
                                </div>
                            </div>
                            <div className="formRow">
                                <div className="formGroup">
                                    <label>Stock Count</label>
                                    <input type="number" name="stock" defaultValue={editingProduct?.stock} required />
                                </div>
                                <div className="formGroup">
                                    <label>Category</label>
                                    <input name="category" defaultValue={editingProduct?.category} required placeholder="Fiction, Business, etc." />
                                </div>
                            </div>
                            <div className="formGroup">
                                <label>Image URL</label>
                                <input name="image" defaultValue={editingProduct?.image} placeholder="https://..." />
                            </div>

                            <div className="flagsGroup">
                                <label className="checkboxLabel">
                                    <input type="checkbox" name="isTrending" defaultChecked={editingProduct?.isTrending} />
                                    Trending
                                </label>
                                <label className="checkboxLabel">
                                    <input type="checkbox" name="isNewArrival" defaultChecked={editingProduct?.isNewArrival} />
                                    New Arrival
                                </label>
                                <label className="checkboxLabel">
                                    <input type="checkbox" name="isBestSeller" defaultChecked={editingProduct?.isBestSeller} />
                                    Best Seller
                                </label>
                                <label className="checkboxLabel">
                                    <input type="checkbox" name="isAwardWinner" defaultChecked={editingProduct?.isAwardWinner} />
                                    Award Winner
                                </label>
                            </div>

                            <div className="formActions">
                                <button type="button" className="btnCancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btnSave">{editingProduct ? 'Update Book' : 'Add Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        .adminContainer { display: flex; height: 100vh; background: #f0f2f5; color: #1a1a1b; font-family: 'Inter', sans-serif; overflow: hidden; }
        .adminSidebar { width: 280px; background: #ffffff; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; padding: 1.5rem; }
        .sidebarHeader { margin-bottom: 2.5rem; }
        .adminLogo { display: flex; align-items: center; gap: 12px; }
        .logoIcon { background: linear-gradient(135deg, #E42B26, #b91c18); color: white; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.5rem; box-shadow: 0 4px 12px rgba(228, 43, 38, 0.3); }
        .logoText { font-size: 1.25rem; font-weight: 700; color: #111827; }
        .logoText span { color: #E42B26; }
        .sidebarNav { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .navItem { display: flex; align-items: center; gap: 12px; padding: 0.875rem 1rem; border-radius: 12px; color: #6b7280; font-weight: 500; transition: all 0.2s ease; border: none; background: none; width: 100%; text-align: left; cursor: pointer; }
        .navItem:hover { background: #f9fafb; color: #111827; }
        .navItem.active { background: #fef2f2; color: #E42B26; }
        .navItem.logout { color: #ef4444; margin-top: auto; }
        .adminMain { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .adminHeader { height: 80px; background: #ffffff; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; padding: 0 2.5rem; }
        .tabTitle { font-size: 1.5rem; font-weight: 700; color: #111827; }
        .tabSubtitle { font-size: 0.875rem; color: #6b7280; }
        .headerRight { display: flex; align-items: center; gap: 1.5rem; }
        .searchBarContainer { position: relative; width: 300px; }
        .searchIcon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .headerSearch { width: 100%; padding: 0.625rem 1rem 0.625rem 2.5rem; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb; font-size: 0.875rem; outline: none; }
        .notificationBtn { position: relative; background: none; border: none; color: #6b7280; padding: 8px; cursor: pointer; }
        .adminProfile { width: 40px; height: 40px; background: #E42B26; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .adminScrollArea { flex: 1; overflow-y: auto; padding: 2.5rem; }

        /* Modal Styling */
        .modalOverlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modalContent { background: white; width: 100%; max-width: 600px; border-radius: 24px; padding: 2.5rem; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .modalHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .closeBtn { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 4px; }
        .productForm { display: flex; flex-direction: column; gap: 1.5rem; }
        .formGroup { display: flex; flex-direction: column; gap: 8px; }
        .formGroup label { font-size: 0.875rem; font-weight: 600; color: #4b5563; }
        .formGroup input { padding: 12px; border-radius: 10px; border: 1px solid #e5e7eb; outline: none; font-size: 0.875rem; }
        .formGroup input:focus { border-color: #E42B26; box-shadow: 0 0 0 3px rgba(228,43,38,0.1); }
        .formRow { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .flagsGroup { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; padding: 1rem; background: #f9fafb; border-radius: 12px; }
        .checkboxLabel { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; }
        .checkboxLabel input { width: 18px; height: 18px; accent-color: #E42B26; }
        .formActions { display: flex; gap: 1rem; margin-top: 1rem; }
        .btnCancel { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #e5e7eb; background: white; font-weight: 600; cursor: pointer; }
        .btnSave { flex: 2; padding: 12px; border-radius: 10px; border: none; background: #E42B26; color: white; font-weight: 600; cursor: pointer; }
      `}</style>
        </div>
    );
}

function StatsCard({ title, value, icon, color }: any) {
    return (
        <div className="statsCard">
            <div className="statsIcon" style={{ backgroundColor: color + '20', color: color }}>{icon}</div>
            <div className="statsInfo">
                <p className="statsTitle">{title}</p>
                <h3 className="statsValue">{value}</h3>
            </div>
            <style jsx>{`
        .statsCard { background: white; padding: 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 1.25rem; border: 1px solid #eef0f2; }
        .statsIcon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .statsTitle { font-size: 0.875rem; color: #6b7280; font-weight: 500; }
        .statsValue { font-size: 1.5rem; font-weight: 700; color: #111827; margin: 4px 0; }
      `}</style>
        </div>
    );
}

function OverviewTab({ orders, products }: any) {
    const totalSales = orders.reduce((sum: number, o: any) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
    const activeOrders = orders.filter((o: any) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    const inStock = products.reduce((sum: number, p: any) => sum + p.stock, 0);

    return (
        <div className="overviewTab">
            <div className="statsGrid">
                <StatsCard title="Total Sales" value={`₹${totalSales.toLocaleString()}`} icon={<DollarSign />} color="#E42B26" />
                <StatsCard title="Active Orders" value={activeOrders} icon={<ShoppingCart />} color="#4880FF" />
                <StatsCard title="Total Stock" value={inStock} icon={<BookOpen />} color="#FF9F43" />
                <StatsCard title="Total Products" value={products.length} icon={<TrendingUp />} color="#1DD1A1" />
            </div>
            <style jsx>{`
        .statsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
      `}</style>
        </div>
    );
}

function InventoryTab({ products, onEdit, onAdd, onDelete }: any) {
    return (
        <div className="inventoryTab">
            <div className="tableControls">
                <div className="filterGroup">
                    <button className="controlBtn"><Filter size={18} /> Filters</button>
                </div>
                <button className="addBtn" onClick={onAdd}><Plus size={18} /> Add New Book</button>
            </div>

            <div className="inventoryTableCard">
                <table>
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p: any) => (
                            <tr key={p.id}>
                                <td>
                                    <div className="productCell">
                                        <img src={p.image} alt="" />
                                        <div>
                                            <div className="productTitle">{p.title}</div>
                                            <div className="productSubtitle">{p.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="catTag">{p.category}</span></td>
                                <td className="font-bold">₹{p.price}</td>
                                <td>{p.stock} units</td>
                                <td>
                                    <span className={`statusDot ${p.stock > 0 ? 'active' : 'inactive'}`}>
                                        {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td>
                                    <div className="actionButtons">
                                        <button className="iconBtn edit" onClick={() => onEdit(p)}><Edit2 size={16} /></button>
                                        <button className="iconBtn delete" onClick={() => onDelete(p.id)}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .inventoryTab { display: flex; flex-direction: column; gap: 1.5rem; }
        .tableControls { display: flex; justify-content: space-between; align-items: center; }
        .addBtn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 10px; border: none; background: #E42B26; color: white; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(228, 43, 38, 0.2); }
        .controlBtn { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; font-size: 0.875rem; font-weight: 500; cursor: pointer; }
        .inventoryTableCard { background: white; border-radius: 20px; border: 1px solid #eef0f2; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f9fafb; padding: 16px; text-align: left; font-size: 0.75rem; color: #6b7280; text-transform: uppercase; }
        td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 0.875rem; }
        .productCell { display: flex; align-items: center; gap: 12px; }
        .productCell img { width: 40px; height: 56px; border-radius: 6px; object-fit: cover; }
        .productTitle { font-weight: 600; color: #111827; }
        .catTag { padding: 4px 8px; background: #f3f4f6; border-radius: 6px; font-size: 0.75rem; }
        .statusDot { display: flex; align-items: center; gap: 6px; }
        .statusDot::before { content: ''; width: 8px; height: 8px; border-radius: 50%; }
        .statusDot.active::before { background: #10b981; }
        .statusDot.inactive::before { background: #ef4444; }
        .actionButtons { display: flex; gap: 8px; }
        .iconBtn { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .iconBtn.edit { background: #f3f4f6; color: #4b5563; }
        .iconBtn.delete { background: #fee2e2; color: #ef4444; }
      `}</style>
        </div>
    );
}

function OrdersTab({ orders, updateOrder }: any) {
    const updateStatus = (order: Order, status: string) => {
        updateOrder({ ...order, status: status as any });
    };

    return (
        <div className="ordersTab">
            <div className="orderList">
                {orders.length === 0 ? (
                    <div className="emptyState">No orders placed yet.</div>
                ) : (
                    orders.map((order: any) => (
                        <div key={order.id} className="orderItemCard">
                            <div className="orderMainInfo">
                                <div className="idSection">
                                    <div className="orderId">{order.id}</div>
                                    <div className="orderDate">{order.date}</div>
                                </div>
                                <div className="customerSection">
                                    <div className="customerName">{order.customer}</div>
                                    <div className="customerEmail">{order.email}</div>
                                </div>
                                <div className="itemsSection">
                                    <div className="itemCount">{order.items} Items</div>
                                    <div className="orderTotal">₹{order.total}</div>
                                </div>
                                <div className="statusSection">
                                    <select
                                        className={`statusSelect ${order.status.toLowerCase()}`}
                                        value={order.status}
                                        onChange={(e) => updateStatus(order, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
        .orderList { display: flex; flex-direction: column; gap: 1rem; }
        .emptyState { text-align: center; padding: 4rem; color: #9ca3af; background: white; border-radius: 20px; }
        .orderItemCard { background: white; border-radius: 16px; padding: 1.25rem; border: 1px solid #eef0f2; }
        .orderMainInfo { display: grid; grid-template-columns: 1fr 1.5fr 1fr 1fr; align-items: center; gap: 1.5rem; }
        .orderId { font-weight: 700; color: #111827; }
        .orderDate { font-size: 0.75rem; color: #6b7280; }
        .customerName { font-weight: 600; color: #111827; }
        .customerEmail { font-size: 0.75rem; color: #6b7280; }
        .orderTotal { font-weight: 700; color: #E42B26; }
        .statusSelect { padding: 6px 12px; border-radius: 10px; font-size: 0.75rem; font-weight: 600; border: 1px solid #e5e7eb; outline: none; width: 100%; cursor: pointer; }
        .statusSelect.delivered { background: #d1fae5; color: #065f46; }
        .statusSelect.processing { background: #dbeafe; color: #1e40af; }
        .statusSelect.shipped { background: #fef3c7; color: #92400e; }
        .statusSelect.pending { background: #f3f4f6; color: #374151; }
        .statusSelect.cancelled { background: #fee2e2; color: #991b1b; }
      `}</style>
        </div>
    );
}

function AccessTab() {
    return (
        <div className="accessTab">
            <div className="emptyState">Access management control panel.</div>
            <style jsx>{`
        .emptyState { text-align: center; padding: 4rem; color: #9ca3af; background: white; border-radius: 20px; }
      `}</style>
        </div>
    );
}

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
    CheckCircle,
    Clock,
    XCircle,
    TrendingUp,
    DollarSign,
    BookOpen,
    Settings,
    Bell,
    LogOut,
    ChevronRight,
    Filter,
    MoreVertical
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---

const initialProducts = [
    { id: '1', title: "The Secret Language of Flowers", author: "Eleanor Vance", price: 499, stock: 45, category: "Fiction", sales: 120, image: "https://placehold.co/100x150/FF6B6B/FFF?text=Flowers" },
    { id: '2', title: "Atomic Habits", author: "James Clear", price: 550, stock: 12, category: "Self Help", sales: 850, image: "https://placehold.co/100x150/2a2a2a/FFF?text=Habits" },
    { id: '3', title: "The Psychology of Money", author: "Morgan Housel", price: 420, stock: 8, category: "Business", sales: 430, image: "https://placehold.co/100x150/123456/FFF?text=Money" },
    { id: '4', title: "Deep Work", author: "Cal Newport", price: 399, stock: 65, category: "Business", sales: 210, image: "https://placehold.co/100x150/FF5733/FFF?text=Work" },
    { id: '5', title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 650, stock: 23, category: "Science", sales: 150, image: "https://placehold.co/100x150/33FF57/000?text=Thinking" },
];

const initialOrders = [
    { id: 'ORD-001', customer: "Rahul Sharma", items: 3, total: 1450, status: "Delivered", date: "2026-02-01" },
    { id: 'ORD-002', customer: "Priya Patel", items: 1, total: 550, status: "Processing", date: "2026-02-02" },
    { id: 'ORD-003', customer: "Amit Singh", items: 2, total: 899, status: "Shipped", date: "2026-02-02" },
    { id: 'ORD-004', customer: "Sneha Reddy", items: 5, total: 2450, status: "Pending", date: "2026-02-02" },
    { id: 'ORD-005', customer: "Vikram Malhotra", items: 1, total: 420, status: "Cancelled", date: "2026-01-31" },
];

const initialUsers = [
    { id: 'USR-1', name: "Admin User", email: "admin@rohinibook.com", role: "Super Admin", status: "Active" },
    { id: 'USR-2', name: "Anmol Gupta", email: "anmol@example.com", role: "Inventory Manager", status: "Active" },
    { id: 'USR-3', name: "Staff Member", email: "staff@rohinibook.com", role: "Sales Rep", status: "Inactive" },
];

// --- Components ---

type TabType = 'overview' | 'inventory' | 'orders' | 'access';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState(initialOrders);
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <button
                        className={`navItem ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </button>
                    <button
                        className={`navItem ${activeTab === 'inventory' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >
                        <Package size={20} />
                        <span>Inventory</span>
                    </button>
                    <button
                        className={`navItem ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <ShoppingCart size={20} />
                        <span>Orders</span>
                    </button>
                    <button
                        className={`navItem ${activeTab === 'access' ? 'active' : ''}`}
                        onClick={() => setActiveTab('access')}
                    >
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
                {/* Header */}
                <header className="adminHeader">
                    <div className="headerLeft">
                        <h1 className="tabTitle">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
                        </h1>
                        <p className="tabSubtitle">Welcome back, Admin</p>
                    </div>
                    <div className="headerRight">
                        <div className="searchBarContainer">
                            <Search size={18} className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Search anything..."
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

                {/* Content Area */}
                <div className="adminScrollArea">
                    {activeTab === 'overview' && <OverviewTab orders={orders} products={products} />}
                    {activeTab === 'inventory' && <InventoryTab products={filteredProducts} />}
                    {activeTab === 'orders' && <OrdersTab orders={orders} />}
                    {activeTab === 'access' && <AccessTab users={users} />}
                </div>
            </main>

            <style jsx>{`
        .adminContainer {
          display: flex;
          height: 100vh;
          background: #f0f2f5;
          color: #1a1a1b;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* Sidebar Styling */
        .adminSidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .sidebarHeader {
          margin-bottom: 2.5rem;
        }

        .adminLogo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logoIcon {
          background: linear-gradient(135deg, #E42B26, #b91c18);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
          box-shadow: 0 4px 12px rgba(228, 43, 38, 0.3);
        }

        .logoText {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }

        .logoText span {
          color: #E42B26;
        }

        .sidebarNav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .navItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          color: #6b7280;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .navItem:hover {
          background: #f9fafb;
          color: #111827;
        }

        .navItem.active {
          background: #fef2f2;
          color: #E42B26;
        }

        .navItem.logout {
          color: #ef4444;
          margin-top: auto;
        }

        .navItem.logout:hover {
          background: #fef2f2;
        }

        /* Main Content Styling */
        .adminMain {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .adminHeader {
          height: 80px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          flex-shrink: 0;
        }

        .tabTitle {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }

        .tabSubtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 2px;
        }

        .headerRight {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .searchBarContainer {
          position: relative;
          width: 300px;
        }

        .searchIcon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .headerSearch {
          width: 100%;
          padding: 0.625rem 1rem 0.625rem 2.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #f9fafb;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }

        .headerSearch:focus {
          border-color: #E42B26;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(228, 43, 38, 0.1);
        }

        .notificationBtn {
          position: relative;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .notificationBtn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .notificationDot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #E42B26;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .adminProfile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profileImg {
          width: 40px;
          height: 40px;
          background: #E42B26;
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .adminScrollArea {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem;
        }

        .mt-8 { margin-top: 2rem; }
        .font-mono { font-family: monospace; }
        .font-bold { font-weight: 700; }

        @media (max-width: 1024px) {
          .adminSidebar {
            width: 80px;
            padding: 1.5rem 0.75rem;
          }
          .logoText, .navItem span, .tabSubtitle {
            display: none;
          }
          .adminLogo {
            justify-content: center;
          }
          .navItem {
            justify-content: center;
            padding: 12px;
          }
        }
      `}</style>
        </div>
    );
}

function StatsCard({ title, value, icon, trend, color }: any) {
    return (
        <div className="statsCard">
            <div className="statsIcon" style={{ backgroundColor: color + '20', color: color }}>
                {icon}
            </div>
            <div className="statsInfo">
                <p className="statsTitle">{title}</p>
                <h3 className="statsValue">{value}</h3>
                {trend && (
                    <p className={`statsTrend ${trend > 0 ? 'up' : 'down'}`}>
                        {trend > 0 ? '+' : ''}{trend}% <span>vs last month</span>
                    </p>
                )}
            </div>
            <style jsx>{`
        .statsCard {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #eef0f2;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .statsCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .statsIcon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .statsTitle {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }
        .statsValue {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 4px 0;
        }
        .statsTrend {
          font-size: 0.75rem;
          font-weight: 600;
        }
        .statsTrend.up { color: #10b981; }
        .statsTrend.down { color: #ef4444; }
        .statsTrend span { color: #9ca3af; font-weight: 400; }
      `}</style>
        </div>
    );
}

function OverviewTab({ orders, products }: any) {
    const totalSales = orders.reduce((sum: number, o: any) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
    const totalOrders = orders.length;
    const inStock = products.reduce((sum: number, p: any) => sum + p.stock, 0);

    return (
        <div className="overviewTab">
            <div className="statsGrid">
                <StatsCard title="Total Revenue" value={`₹${totalSales.toLocaleString()}`} icon={<DollarSign />} trend={12.5} color="#E42B26" />
                <StatsCard title="Monthly Orders" value={totalOrders} icon={<ShoppingCart />} trend={8.2} color="#4880FF" />
                <StatsCard title="Total Books" value={inStock} icon={<BookOpen />} trend={-2.4} color="#FF9F43" />
                <StatsCard title="Acquisition" value="2,450" icon={<TrendingUp />} trend={15.3} color="#1DD1A1" />
            </div>

            <div className="dashboardGrid mt-8">
                <div className="dashboardCard span-2">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Recent Orders</h3>
                        <button className="viewAllBtn">View All</button>
                    </div>
                    <div className="tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map((order: any) => (
                                    <tr key={order.id}>
                                        <td className="font-mono">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.date}</td>
                                        <td>₹{order.total}</td>
                                        <td>
                                            <span className={`statusBadge ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboardCard">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Top Selling Items</h3>
                    </div>
                    <div className="topItemsList">
                        {products.sort((a: any, b: any) => b.sales - a.sales).slice(0, 4).map((product: any) => (
                            <div key={product.id} className="topItem">
                                <img src={product.image} alt={product.title} />
                                <div className="itemInfo">
                                    <h4>{product.title}</h4>
                                    <p>{product.sales} sales</p>
                                </div>
                                <div className="itemPrice">₹{product.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .overviewTab {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .dashboardGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .dashboardCard {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid #eef0f2;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .dashboardCard.span-2 { grid-column: span 2; }
        .cardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .cardTitle {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
        }
        .viewAllBtn {
          font-size: 0.875rem;
          color: #E42B26;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
        }
        .tableWrapper { overflow-x: auto; }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th {
          padding: 12px 16px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6b7280;
          border-bottom: 1px solid #f3f4f6;
        }
        td {
          padding: 16px;
          font-size: 0.875rem;
          border-bottom: 1px solid #f9fafb;
        }
        .statusBadge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .statusBadge.delivered { background: #d1fae5; color: #065f46; }
        .statusBadge.processing { background: #dbeafe; color: #1e40af; }
        .statusBadge.shipped { background: #fef3c7; color: #92400e; }
        .statusBadge.pending { background: #f3f4f6; color: #374151; }
        .statusBadge.cancelled { background: #fee2e2; color: #991b1b; }

        .topItemsList { display: flex; flex-direction: column; gap: 1.25rem; }
        .topItem { display: flex; align-items: center; gap: 1rem; }
        .topItem img { width: 48px; height: 64px; border-radius: 8px; object-fit: cover; }
        .itemInfo h4 { font-size: 0.875rem; font-weight: 600; color: #111827; margin: 0; }
        .itemInfo p { font-size: 0.75rem; color: #6b7280; margin: 0; }
        .itemPrice { margin-left: auto; font-weight: 700; font-size: 0.875rem; color: #111827; }
        
        @media (max-width: 1200px) {
          .dashboardGrid { grid-template-columns: 1fr; }
          .dashboardCard.span-2 { grid-column: span 1; }
        }
      `}</style>
        </div>
    );
}

function InventoryTab({ products }: any) {
    return (
        <div className="inventoryTab">
            <div className="tableControls">
                <div className="filterGroup">
                    <button className="controlBtn"><Filter size={18} /> Filters</button>
                    <button className="controlBtn">Status: All</button>
                </div>
                <button className="addBtn"><Plus size={18} /> Add Product</button>
            </div>

            <div className="inventoryTableCard">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Sales</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p: any) => (
                            <tr key={p.id}>
                                <td><input type="checkbox" /></td>
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
                                <td>
                                    <div className="stockIndicator">
                                        <div className="stockBar">
                                            <div className="stockLevel" style={{
                                                width: `${Math.min(p.stock, 100)}%`,
                                                backgroundColor: p.stock < 10 ? '#ef4444' : p.stock < 30 ? '#f59e0b' : '#10b981'
                                            }}></div>
                                        </div>
                                        <span>{p.stock} units</span>
                                    </div>
                                </td>
                                <td>{p.sales}</td>
                                <td>
                                    <span className={`statusDot ${p.stock > 0 ? 'active' : 'inactive'}`}>
                                        {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td>
                                    <div className="actionButtons">
                                        <button className="iconBtn edit"><Edit2 size={16} /></button>
                                        <button className="iconBtn delete"><Trash2 size={16} /></button>
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
        .filterGroup { display: flex; gap: 0.75rem; }
        .controlBtn {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 8px; border: 1px solid #e5e7eb;
          background: white; font-size: 0.875rem; font-weight: 500; cursor: pointer;
        }
        .addBtn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 10px; border: none;
          background: #E42B26; color: white; font-weight: 600; cursor: pointer;
          box-shadow: 0 4px 12px rgba(228, 43, 38, 0.2);
        }
        .inventoryTableCard {
          background: white; border-radius: 20px; border: 1px solid #eef0f2; overflow: hidden;
        }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f9fafb; padding: 16px; text-align: left; font-size: 0.75rem; color: #6b7280; text-transform: uppercase; }
        td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 0.875rem; }
        .productCell { display: flex; align-items: center; gap: 12px; }
        .productCell img { width: 40px; height: 56px; border-radius: 6px; object-fit: cover; }
        .productTitle { font-weight: 600; color: #111827; }
        .productSubtitle { font-size: 0.75rem; color: #6b7280; }
        .catTag { padding: 4px 8px; background: #f3f4f6; border-radius: 6px; font-size: 0.75rem; }
        .stockIndicator { display: flex; flex-direction: column; gap: 4px; width: 100px; }
        .stockBar { height: 6px; background: #f3f4f6; border-radius: 10px; overflow: hidden; }
        .stockLevel { height: 100%; border-radius: 10px; }
        .statusDot { display: flex; align-items: center; gap: 6px; }
        .statusDot::before { content: ''; width: 8px; height: 8px; border-radius: 50%; }
        .statusDot.active::before { background: #10b981; }
        .statusDot.inactive::before { background: #ef4444; }
        .actionButtons { display: flex; gap: 8px; }
        .iconBtn { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .iconBtn.edit { background: #f3f4f6; color: #4b5563; }
        .iconBtn.edit:hover { background: #e5e7eb; color: #111827; }
        .iconBtn.delete { background: #fee2e2; color: #ef4444; }
        .iconBtn.delete:hover { background: #fecaca; }
      `}</style>
        </div>
    );
}

function OrdersTab({ orders }: any) {
    return (
        <div className="ordersTab">
            <div className="orderStatusFilters">
                {['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                    <button key={status} className={`statusTab ${status === 'All Orders' ? 'active' : ''}`}>{status}</button>
                ))}
            </div>

            <div className="orderList">
                {orders.map((order: any) => (
                    <div key={order.id} className="orderItemCard">
                        <div className="orderMainInfo">
                            <div className="idSection">
                                <div className="orderId">{order.id}</div>
                                <div className="orderDate">{order.date}</div>
                            </div>
                            <div className="customerSection">
                                <div className="customerName">{order.customer}</div>
                                <div className="customerEmail">customer@email.com</div>
                            </div>
                            <div className="itemsSection">
                                <div className="itemCount">{order.items} Items</div>
                                <div className="orderTotal">₹{order.total}</div>
                            </div>
                            <div className="statusSection">
                                <span className={`statusBadge ${order.status.toLowerCase()}`}>{order.status}</span>
                            </div>
                            <div className="actionsSection">
                                <button className="detailsBtn">Details</button>
                                <MoreVertical size={20} className="moreIcon" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .ordersTab { display: flex; flex-direction: column; gap: 1.5rem; }
        .orderStatusFilters { display: flex; gap: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 2px; }
        .statusTab { 
          padding: 8px 16px; border: none; background: none; font-size: 0.875rem; 
          font-weight: 500; color: #6b7280; cursor: pointer; position: relative;
        }
        .statusTab.active { color: #E42B26; }
        .statusTab.active::after { 
          content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; 
          height: 2px; background: #E42B26; 
        }
        .orderList { display: flex; flex-direction: column; gap: 1rem; }
        .orderItemCard { 
          background: white; border-radius: 16px; padding: 1.25rem; 
          border: 1px solid #eef0f2; transition: all 0.2s;
        }
        .orderItemCard:hover { border-color: #E42B26; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .orderMainInfo { display: grid; grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr; align-items: center; gap: 1.5rem; }
        .orderId { font-weight: 700; color: #111827; }
        .orderDate { font-size: 0.75rem; color: #6b7280; }
        .customerName { font-weight: 600; color: #111827; }
        .customerEmail { font-size: 0.75rem; color: #6b7280; }
        .itemCount { font-size: 0.875rem; color: #4b5563; }
        .orderTotal { font-weight: 700; color: #E42B26; }
        .statusBadge {
          padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-align: center; display: inline-block;
        }
        .statusBadge.delivered { background: #d1fae5; color: #065f46; }
        .statusBadge.processing { background: #dbeafe; color: #1e40af; }
        .statusBadge.shipped { background: #fef3c7; color: #92400e; }
        .statusBadge.pending { background: #f3f4f6; color: #374151; }
        .statusBadge.cancelled { background: #fee2e2; color: #991b1b; }
        .actionsSection { display: flex; align-items: center; gap: 1rem; justify-content: flex-end; }
        .detailsBtn { 
          padding: 6px 14px; border-radius: 8px; border: 1px solid #e5e7eb; 
          background: white; font-size: 0.75rem; font-weight: 600; cursor: pointer;
        }
        .moreIcon { color: #9ca3af; cursor: pointer; }
        @media (max-width: 768px) {
          .orderMainInfo { grid-template-columns: 1fr 1fr; gap: 1rem; }
        }
      `}</style>
        </div>
    );
}

function AccessTab({ users }: any) {
    return (
        <div className="accessTab">
            <div className="tabHeader">
                <h3 className="sectionTitle">Permission & Roles</h3>
                <button className="inviteBtn"><Plus size={18} /> Invite Member</button>
            </div>

            <div className="usersListGrid">
                {users.map((user: any) => (
                    <div key={user.id} className="userCard">
                        <div className="userCardTop">
                            <div className="userAvatar">{user.name.charAt(0)}</div>
                            <div className="userStatus">
                                <span className={`statusDot ${user.status.toLowerCase()}`}></span>
                                {user.status}
                            </div>
                        </div>
                        <div className="userCardInfo">
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className="roleSelector">
                            <label>Role</label>
                            <div className="roleValue">
                                <Settings size={14} />
                                <span>{user.role}</span>
                            </div>
                        </div>
                        <div className="userCardActions">
                            <button className="manageBtn">Manage Access</button>
                            <button className="removeBtn">Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .accessTab { display: flex; flex-direction: column; gap: 2rem; }
        .tabHeader { display: flex; justify-content: space-between; align-items: center; }
        .sectionTitle { font-size: 1.25rem; font-weight: 700; color: #111827; }
        .inviteBtn { 
          display: flex; align-items: center; gap: 8px; padding: 10px 20px; 
          border-radius: 10px; border: none; background: #111827; color: white; 
          font-weight: 600; cursor: pointer; 
        }
        .usersListGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .userCard { background: white; border-radius: 20px; padding: 1.5rem; border: 1px solid #eef0f2; }
        .userCardTop { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .userAvatar { 
          width: 60px; height: 60px; background: #f3f4f6; color: #111827; 
          border-radius: 20px; display: flex; align-items: center; justify-content: center; 
          font-size: 1.5rem; font-weight: 700; 
        }
        .userStatus { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600; color: #4b5563; }
        .statusDot { width: 8px; height: 8px; border-radius: 50%; }
        .statusDot.active { background: #10b981; }
        .statusDot.inactive { background: #9ca3af; }
        .userCardInfo h4 { font-size: 1.125rem; font-weight: 700; color: #111827; margin: 0 0 4px 0; }
        .userCardInfo p { font-size: 0.875rem; color: #6b7280; margin: 0; }
        .roleSelector { margin-top: 1.5rem; padding: 1rem; background: #f9fafb; border-radius: 12px; }
        .roleSelector label { font-size: 0.75rem; text-transform: uppercase; color: #9ca3af; font-weight: 700; letter-spacing: 0.05em; }
        .roleValue { display: flex; align-items: center; gap: 8px; margin-top: 4px; color: #111827; font-weight: 600; font-size: 0.875rem; }
        .userCardActions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.5rem; }
        .manageBtn { padding: 10px; border-radius: 10px; border: 1px solid #e5e7eb; background: white; font-size: 0.875rem; font-weight: 600; cursor: pointer; }
        .removeBtn { padding: 10px; border-radius: 10px; border: none; background: #fee2e2; color: #ef4444; font-size: 0.875rem; font-weight: 600; cursor: pointer; }
      `}</style>
        </div>
    );
}

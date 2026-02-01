import Link from 'next/link';

export default function AccountPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '60vh', maxWidth: '600px' }}>
            <h1 className="section-title">My Account</h1>

            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #eee',
                marginTop: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sign In</h2>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <input type="email" placeholder="Enter your email" style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem'
                        }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <input type="password" placeholder="Enter your password" style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem'
                        }} />
                    </div>

                    <button type="button" style={{
                        background: '#E42B26',
                        color: 'white',
                        padding: '1rem',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}>
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Don't have an account? <Link href="/account/register" style={{ color: '#E42B26', fontWeight: '600' }}>Create one here</Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Book, Loader2 } from 'lucide-react';

interface BarcodeScannerProps {
    onSuccess: (isbn: string) => void;
    onClose: () => void;
}

export default function BarcodeScanner({ onSuccess, onClose }: BarcodeScannerProps) {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Initialize scanner
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 150 },
                aspectRatio: 1.777778 // 16:9 for landscape-style barcodes
            },
            /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                // Success
                onSuccess(decodedText);
            },
            (error) => {
                // Ignore errors (scanning is continuous)
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
            }
        };
    }, [onSuccess]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '32px',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: '#f1f5f9',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        color: '#64748b'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: '#fee2e2',
                        color: '#E42B26',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <Book size={28} />
                    </div>
                    <h2 style={{ fontWeight: 800, color: '#0f172a', margin: 0 }}>Scan Book Barcode</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Point your camera at the ISBN barcode on the back cover</p>
                </div>

                <div id="reader" style={{
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '2px solid #e2e8f0'
                }}></div>

                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '16px',
                    fontSize: '0.85rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Awaiting valid ISBN-13 barcode...</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
}

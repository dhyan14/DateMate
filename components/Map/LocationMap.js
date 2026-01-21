"use client";
import { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import styles from './LocationMap.module.css';

export default function LocationMap() {
    // Mock positions
    const [myPos] = useState({ x: 50, y: 50 });
    const [partnerPos, setPartnerPos] = useState({ x: 60, y: 40 });

    // Simulate movement
    useEffect(() => {
        const interval = setInterval(() => {
            setPartnerPos(prev => ({
                x: prev.x + (Math.random() - 0.5) * 5,
                y: prev.y + (Math.random() - 0.5) * 5,
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapBackground}>
                {/* Decorative Grid */}
                <div className={styles.grid}></div>

                {/* User Marker */}
                <div className={styles.marker} style={{ left: `${myPos.x}%`, top: `${myPos.y}%` }}>
                    <div className={`${styles.pulse} ${styles.pulseMe}`}></div>
                    <div className={styles.avatar}>Me</div>
                </div>

                {/* Partner Marker */}
                <div className={styles.marker} style={{ left: `${partnerPos.x}%`, top: `${partnerPos.y}%` }}>
                    <div className={`${styles.pulse} ${styles.pulsePartner}`}></div>
                    <div className={`${styles.avatar} ${styles.avatarPartner}`}>
                        <HeartIcon />
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.card}>
                    <h3>Partner is nearby</h3>
                    <p>Walking • 5 mins away</p>
                    <button className={styles.actionButton}>
                        <Navigation size={16} /> Navigate
                    </button>
                </div>
            </div>
        </div>
    );
}

function HeartIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    );
}

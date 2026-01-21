"use client";
import { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Heart, Plus, Camera } from 'lucide-react';
import styles from './SpotDetails.module.css';

export default function SpotDetails({ id }) {
    const [spot, setSpot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState(false);

    useEffect(() => {
        fetchSpot();
    }, [id]);

    const fetchSpot = async () => {
        try {
            const response = await fetch(`/api/spots/${id}`);
            const data = await response.json();
            setSpot(data);
            setWishlist(data.isWishlist);
        } catch (error) {
            console.error('Error fetching spot:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleWishlist = async () => {
        try {
            if (wishlist) {
                await fetch(`/api/wishlist?spotId=${id}`, { method: 'DELETE' });
            } else {
                await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ spotId: id }),
                });
            }
            setWishlist(!wishlist);
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading spot details...</div>;
    }

    if (!spot) {
        return <div className={styles.empty}>Spot not found</div>;
    }

    return (
        <div className={styles.container}>
            {/* Header Image */}
            <div className={styles.hero}>
                <img src={spot.image || spot.visits[0]?.spot?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'} alt={spot.name} className={styles.heroImage} />
                <div className={styles.heroOverlay}>
                    <h1 className={styles.title}>{spot.name}</h1>
                    <div className={styles.location}>
                        <MapPin size={16} /> {spot.address || 'Location not specified'}
                    </div>
                </div>
                <button
                    className={`${styles.wishlistBtn} ${wishlist ? styles.active : ''}`}
                    onClick={toggleWishlist}
                >
                    <Heart size={24} fill={wishlist ? "currentColor" : "none"} />
                </button>
            </div>

            <div className={styles.stats}>
                <div className={styles.statBox}>
                    <span className={styles.statValue}>{spot.totalVisits}</span>
                    <span className={styles.statLabel}>Visits</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.statValue}>{spot.avgRating}</span>
                    <span className={styles.statLabel}>Avg Rating</span>
                </div>
            </div>

            {/* Menu Tracking */}
            {spot.menuItems && spot.menuItems.length > 0 && (
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Menu Highlights</h2>
                        <button className={styles.addBtn}><Plus size={18} /></button>
                    </div>
                    <div className={styles.menuGrid}>
                        {spot.menuItems.map((item) => (
                            <div key={item.id} className={styles.menuItem}>
                                <div className={styles.menuName}>{item.name}</div>
                                <div className={styles.menuRating}>
                                    {[...Array(5)].map((_, idx) => (
                                        <Star
                                            key={idx}
                                            size={12}
                                            fill={idx < (item.rating || 0) ? "var(--warning)" : "none"}
                                            color={idx < (item.rating || 0) ? "var(--warning)" : "var(--secondary)"}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Visit History */}
            {spot.visits && spot.visits.length > 0 && (
                <section className={styles.section}>
                    <h2>Memory Lane</h2>
                    <div className={styles.timeline}>
                        {spot.visits.map((visit) => (
                            <div key={visit.id} className={styles.timelineItem}>
                                <div className={styles.timelineDate}>
                                    <Calendar size={14} /> {new Date(visit.date).toLocaleDateString()}
                                </div>
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineMood}>{visit.mood} • {visit.rating}/5</div>
                                    <p className={styles.timelineNotes}>{visit.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

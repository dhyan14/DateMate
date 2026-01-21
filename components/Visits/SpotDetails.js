"use client";
import { useState } from 'react';
import { Star, MapPin, Calendar, Heart, Plus, Camera } from 'lucide-react';
import styles from './SpotDetails.module.css';

export default function SpotDetails({ id }) {
    // Mock Data (In reality, fetch based on ID)
    const spot = {
        id,
        name: 'Sushi Zen',
        address: '123 Harbor View Dr.',
        totalVisits: 3,
        isWishlist: false,
        history: [
            { date: '2023-10-15', mood: 'Romantic', rating: 5, notes: 'Anniversary dinner.' },
            { date: '2023-08-20', mood: 'Casual', rating: 4, notes: 'Quick lunch.' },
            { date: '2023-05-10', mood: 'Excited', rating: 5, notes: 'First time trying it!' },
        ],
        menu: [
            { name: 'Otoro Nigiri', rating: 5, tags: ['Must Order'] },
            { name: 'Uni Spoon', rating: 5, tags: ['Shared'] },
            { name: 'Miso Soup', rating: 3, tags: [] },
        ],
        photos: [
            'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
            'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80',
            'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80',
        ]
    };

    const [wishlist, setWishlist] = useState(spot.isWishlist);

    return (
        <div className={styles.container}>
            {/* Header Image */}
            <div className={styles.hero}>
                <img src={spot.photos[0]} alt={spot.name} className={styles.heroImage} />
                <div className={styles.heroOverlay}>
                    <h1 className={styles.title}>{spot.name}</h1>
                    <div className={styles.location}>
                        <MapPin size={16} /> {spot.address}
                    </div>
                </div>
                <button
                    className={`${styles.wishlistBtn} ${wishlist ? styles.active : ''}`}
                    onClick={() => setWishlist(!wishlist)}
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
                    <span className={styles.statValue}>4.7</span>
                    <span className={styles.statLabel}>Avg Rating</span>
                </div>
            </div>

            {/* Menu Tracking */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Menu Highlights</h2>
                    <button className={styles.addBtn}><Plus size={18} /></button>
                </div>
                <div className={styles.menuGrid}>
                    {spot.menu.map((item, i) => (
                        <div key={i} className={styles.menuItem}>
                            <div className={styles.menuName}>{item.name}</div>
                            <div className={styles.menuRating}>
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        size={12}
                                        fill={idx < item.rating ? "var(--warning)" : "none"}
                                        color={idx < item.rating ? "var(--warning)" : "var(--secondary)"}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Visit History */}
            <section className={styles.section}>
                <h2>Memory Lane</h2>
                <div className={styles.timeline}>
                    {spot.history.map((visit, i) => (
                        <div key={i} className={styles.timelineItem}>
                            <div className={styles.timelineDate}>
                                <Calendar size={14} /> {visit.date}
                            </div>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineMood}>{visit.mood} • {visit.rating}/5</div>
                                <p className={styles.timelineNotes}>{visit.notes}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Photos */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Gallery</h2>
                    <button className={styles.addBtn}><Camera size={18} /></button>
                </div>
                <div className={styles.gallery}>
                    {spot.photos.map((photo, i) => (
                        <div key={i} className={styles.photoWrapper}>
                            <img src={photo} alt="Memory" className={styles.photo} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

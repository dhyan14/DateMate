"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import styles from './VisitList.module.css';

export default function VisitList() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        try {
            const response = await fetch('/api/visits');
            const data = await response.json();
            setVisits(data);
        } catch (error) {
            console.error('Error fetching visits:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading visits...</div>;
    }

    if (visits.length === 0) {
        return <div className={styles.empty}>No visits yet. Log your first date!</div>;
    }

    return (
        <div className={styles.list}>
            {visits.map((visit) => (
                <Link href={`/visits/${visit.spot.id}`} key={visit.id} className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img src={visit.spot.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'} alt={visit.spot.name} className={styles.image} />
                        <div className={styles.rating}>
                            <Star size={14} fill="currentColor" /> {visit.rating}
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h3 className={styles.name}>{visit.spot.name}</h3>
                            <ArrowRight size={18} className={styles.arrow} />
                        </div>

                        <div className={styles.meta}>
                            <span className={styles.metaItem}><Calendar size={14} /> {new Date(visit.date).toLocaleDateString()}</span>
                            <span className={styles.metaItem}>{visit.mood}</span>
                        </div>

                        <p className={styles.notes}>{visit.notes}</p>

                        <div className={styles.tags}>
                            {visit.items.slice(0, 2).map(item => (
                                <span key={item} className={styles.tag}>{item}</span>
                            ))}
                            {visit.items.length > 2 && <span className={styles.tag}>+{visit.items.length - 2}</span>}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

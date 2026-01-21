"use client";
import Link from 'next/link';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import styles from './VisitList.module.css';

const MOCK_VISITS = [
    {
        id: 1,
        name: 'Sushi Zen',
        rating: 5,
        date: '2023-10-15',
        mood: 'Romantic',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
        notes: 'The Omakase was incredible. Loved the quiet atmosphere.',
        items: ['Otoro', 'Uni', 'Sake']
    },
    {
        id: 2,
        name: 'Burger & Co.',
        rating: 4,
        date: '2023-11-02',
        mood: 'Casual',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        notes: 'Great smash burgers, but a bit loud.',
        items: ['Double Smash', 'Truffle Fries']
    }
];

export default function VisitList() {
    return (
        <div className={styles.list}>
            {MOCK_VISITS.map((visit) => (
                <Link href={`/visits/${visit.id}`} key={visit.id} className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img src={visit.image} alt={visit.name} className={styles.image} />
                        <div className={styles.rating}>
                            <Star size={14} fill="currentColor" /> {visit.rating}
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h3 className={styles.name}>{visit.name}</h3>
                            <ArrowRight size={18} className={styles.arrow} />
                        </div>

                        <div className={styles.meta}>
                            <span className={styles.metaItem}><Calendar size={14} /> {visit.date}</span>
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

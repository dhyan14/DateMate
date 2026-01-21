"use client";
import { useState, useEffect } from 'react';
import { Heart, MessageCircle, MoreVertical } from 'lucide-react';
import styles from './MomentsFeed.module.css';

export default function MomentsFeed() {
    const [moments, setMoments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMoments();
    }, []);

    const fetchMoments = async () => {
        try {
            const response = await fetch('/api/moments');
            const data = await response.json();
            setMoments(data);
        } catch (error) {
            console.error('Error fetching moments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading moments...</div>;
    }

    if (moments.length === 0) {
        return <div className={styles.empty}>No moments yet. Create your first memory!</div>;
    }

    return (
        <div className={styles.feed}>
            {moments.map((moment) => (
                <article key={moment.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>{moment.user.name[0]}</div>
                            <div>
                                <span className={styles.userName}>{moment.user.name}</span>
                                <span className={styles.location}>{moment.location}</span>
                            </div>
                        </div>
                        <MoreVertical size={20} className={styles.moreIcon} />
                    </div>

                    <div className={styles.imageContainer}>
                        <img src={moment.image} alt={moment.caption} className={styles.image} />
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.actions}>
                            <button className={styles.actionButton}><Heart size={24} /></button>
                            <button className={styles.actionButton}><MessageCircle size={24} /></button>
                        </div>
                        <p className={styles.caption}>
                            <span className={styles.captionUser}>{moment.user.name}</span> {moment.caption}
                        </p>
                        <span className={styles.time}>{new Date(moment.createdAt).toLocaleDateString()}</span>
                    </div>
                </article>
            ))}
        </div>
    );
}

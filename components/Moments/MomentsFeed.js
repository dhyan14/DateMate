
import { Heart, MessageCircle, MoreVertical } from 'lucide-react';
import styles from './MomentsFeed.module.css';

// Mock Data
const MOCK_MOMENTS = [
    {
        id: 1,
        user: 'Dhyan',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        caption: 'Best coffee in town so far! ☕',
        location: 'Café de Flore',
        likes: 12,
        time: '2h ago',
    },
    {
        id: 2,
        user: 'Partner',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
        caption: 'Sunset walk by the river.',
        location: 'Seine River',
        likes: 24,
        time: '5h ago',
    }
];

export default function MomentsFeed() {
    return (
        <div className={styles.feed}>
            {MOCK_MOMENTS.map((moment) => (
                <article key={moment.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>{moment.user[0]}</div>
                            <div>
                                <span className={styles.userName}>{moment.user}</span>
                                <span className={styles.location}>{moment.location}</span>
                            </div>
                        </div>
                        <MoreVertical size={20} className={styles.moreIcon} />
                    </div>

                    <div className={styles.imageContainer}>
                        {/* Using standard img for simplicity in mock, normally Next Image with domains config */}
                        <img src={moment.image} alt={moment.caption} className={styles.image} />
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.actions}>
                            <button className={styles.actionButton}><Heart size={24} /></button>
                            <button className={styles.actionButton}><MessageCircle size={24} /></button>
                        </div>
                        <p className={styles.caption}>
                            <span className={styles.captionUser}>{moment.user}</span> {moment.caption}
                        </p>
                        <span className={styles.time}>{moment.time}</span>
                    </div>
                </article>
            ))}
        </div>
    );
}

import Link from 'next/link';
import { MapPin, Heart, PlusCircle, Coffee, History } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.link} title="Moments">
                <Heart size={24} />
            </Link>
            <Link href="/map" className={styles.link} title="Location">
                <MapPin size={24} />
            </Link>
            <div className={styles.addButton}>
                <PlusCircle size={40} className={styles.addIcon} />
            </div>
            <Link href="/visits" className={styles.link} title="Visits">
                <Coffee size={24} />
            </Link>
            <Link href="/wishlist" className={styles.link} title="Wishlist">
                <History size={24} />
            </Link>
        </nav>
    );
}

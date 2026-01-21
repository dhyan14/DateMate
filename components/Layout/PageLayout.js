import Navigation from '../Navigation/Navigation';
import styles from './PageLayout.module.css';

export default function PageLayout({ children, title, action }) {
    return (
        <div className={styles.container}>
            {title && (
                <header className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    {action && <div className={styles.action}>{action}</div>}
                </header>
            )}
            <main className={styles.main}>
                {children}
            </main>
            <Navigation />
        </div>
    );
}

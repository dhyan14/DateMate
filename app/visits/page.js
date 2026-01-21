import PageLayout from '@/components/Layout/PageLayout';
import VisitList from '@/components/Visits/VisitList';
import { Search } from 'lucide-react';
import styles from './Visits.module.css';

export default function VisitsPage() {
    return (
        <PageLayout
            title="Our History"
            action={<button className={styles.searchBtn}><Search size={20} /></button>}
        >
            <VisitList />
        </PageLayout>
    );
}

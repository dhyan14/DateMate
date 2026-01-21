import PageLayout from '@/components/Layout/PageLayout';
import VisitList from '@/components/Visits/VisitList'; // Reusing for now
import { Plus } from 'lucide-react';

export default function WishlistPage() {
    return (
        <PageLayout
            title="Must Try"
            action={<button style={{ color: 'var(--accent)' }}><Plus size={24} /></button>}
        >
            {/* In a real app we'd pass a 'filter="wishlist"' prop */}
            <VisitList />
        </PageLayout>
    );
}

import PageLayout from '@/components/Layout/PageLayout';
import MomentsFeed from '@/components/Moments/MomentsFeed';

export default function Home() {
    return (
        <PageLayout title="Shared Moments">
            <MomentsFeed />
        </PageLayout>
    );
}

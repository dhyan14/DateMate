import PageLayout from '@/components/Layout/PageLayout';
import SpotDetails from '@/components/Visits/SpotDetails';

export default function SpotPage({ params }) {
    return (
        <PageLayout>
            <SpotDetails id={params.id} />
        </PageLayout>
    );
}

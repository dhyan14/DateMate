import PageLayout from '@/components/Layout/PageLayout';
import LocationMap from '@/components/Map/LocationMap';

export default function MapPage() {
    return (
        <PageLayout title="Live Location">
            <LocationMap />
        </PageLayout>
    );
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET spot details by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const spot = await prisma.spot.findUnique({
            where: { id },
            include: {
                visits: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        date: 'desc',
                    },
                },
                menuItems: true,
                wishlist: true,
            },
        });

        if (!spot) {
            return NextResponse.json({ error: 'Spot not found' }, { status: 404 });
        }

        // Calculate average rating
        const avgRating = spot.visits.length > 0
            ? spot.visits.reduce((sum, visit) => sum + visit.rating, 0) / spot.visits.length
            : 0;

        return NextResponse.json({
            ...spot,
            totalVisits: spot.visits.length,
            avgRating: avgRating.toFixed(1),
            isWishlist: spot.wishlist.length > 0,
        });
    } catch (error) {
        console.error('Error fetching spot:', error);
        return NextResponse.json({ error: 'Failed to fetch spot' }, { status: 500 });
    }
}

// PUT update spot
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const spot = await prisma.spot.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(spot);
    } catch (error) {
        console.error('Error updating spot:', error);
        return NextResponse.json({ error: 'Failed to update spot' }, { status: 500 });
    }
}

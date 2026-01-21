import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all wishlist items
export async function GET() {
    try {
        const wishlist = await prisma.wishlist.findMany({
            include: {
                spot: true,
            },
            orderBy: {
                addedAt: 'desc',
            },
        });

        return NextResponse.json(wishlist);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}

// POST add to wishlist
export async function POST(request) {
    try {
        const body = await request.json();
        const { spotId, notes } = body;

        const wishlistItem = await prisma.wishlist.create({
            data: {
                spotId,
                notes,
            },
            include: {
                spot: true,
            },
        });

        return NextResponse.json(wishlistItem, { status: 201 });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
    }
}

// DELETE remove from wishlist
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const spotId = searchParams.get('spotId');

        await prisma.wishlist.deleteMany({
            where: { spotId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
    }
}

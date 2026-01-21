import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all visits
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const rating = searchParams.get('rating');

        const where = {};

        if (search) {
            where.spot = {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            };
        }

        if (rating) {
            where.rating = parseInt(rating);
        }

        const visits = await prisma.visit.findMany({
            where,
            include: {
                spot: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });

        return NextResponse.json(visits);
    } catch (error) {
        console.error('Error fetching visits:', error);
        return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 });
    }
}

// POST create a new visit
export async function POST(request) {
    try {
        const body = await request.json();
        const { spotName, spotAddress, spotImage, userId, date, mood, rating, notes, items } = body;

        // First, find or create the spot
        let spot = await prisma.spot.findFirst({
            where: { name: spotName },
        });

        if (!spot) {
            spot = await prisma.spot.create({
                data: {
                    name: spotName,
                    address: spotAddress,
                    image: spotImage,
                },
            });
        }

        // Create the visit
        const visit = await prisma.visit.create({
            data: {
                spotId: spot.id,
                userId,
                date: new Date(date),
                mood,
                rating,
                notes,
                items: items || [],
            },
            include: {
                spot: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(visit, { status: 201 });
    } catch (error) {
        console.error('Error creating visit:', error);
        return NextResponse.json({ error: 'Failed to create visit' }, { status: 500 });
    }
}

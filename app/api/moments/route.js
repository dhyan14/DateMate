import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all moments
export async function GET() {
    try {
        const moments = await prisma.moment.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(moments);
    } catch (error) {
        console.error('Error fetching moments:', error);
        return NextResponse.json({ error: 'Failed to fetch moments' }, { status: 500 });
    }
}

// POST create a new moment
export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, image, caption, location } = body;

        const moment = await prisma.moment.create({
            data: {
                userId,
                image,
                caption,
                location,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
            },
        });

        return NextResponse.json(moment, { status: 201 });
    } catch (error) {
        console.error('Error creating moment:', error);
        return NextResponse.json({ error: 'Failed to create moment' }, { status: 500 });
    }
}

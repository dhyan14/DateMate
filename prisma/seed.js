const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seed...');

    // Create users
    const user1 = await prisma.user.create({
        data: {
            name: 'Dhyan',
            email: 'dhyan@datemate.app',
            avatar: 'D',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Partner',
            email: 'partner@datemate.app',
            avatar: 'P',
        },
    });

    console.log('Created users:', user1.name, user2.name);

    // Create moments
    await prisma.moment.createMany({
        data: [
            {
                userId: user1.id,
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
                caption: 'Best coffee in town so far! ☕',
                location: 'Café de Flore',
                likes: 12,
            },
            {
                userId: user2.id,
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
                caption: 'Sunset walk by the river.',
                location: 'Seine River',
                likes: 24,
            },
        ],
    });

    console.log('Created moments');

    // Create spots
    const spot1 = await prisma.spot.create({
        data: {
            name: 'Sushi Zen',
            address: '123 Harbor View Dr.',
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
        },
    });

    const spot2 = await prisma.spot.create({
        data: {
            name: 'Burger & Co.',
            address: '456 Main Street',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        },
    });

    console.log('Created spots:', spot1.name, spot2.name);

    // Create visits
    await prisma.visit.createMany({
        data: [
            {
                spotId: spot1.id,
                userId: user1.id,
                date: new Date('2023-10-15'),
                mood: 'Romantic',
                rating: 5,
                notes: 'The Omakase was incredible. Loved the quiet atmosphere.',
                items: ['Otoro', 'Uni', 'Sake'],
            },
            {
                spotId: spot2.id,
                userId: user2.id,
                date: new Date('2023-11-02'),
                mood: 'Casual',
                rating: 4,
                notes: 'Great smash burgers, but a bit loud.',
                items: ['Double Smash', 'Truffle Fries'],
            },
        ],
    });

    console.log('Created visits');

    // Create menu items
    await prisma.menuItem.createMany({
        data: [
            {
                spotId: spot1.id,
                name: 'Otoro Nigiri',
                rating: 5,
                tags: ['Must Order', 'Favorite'],
            },
            {
                spotId: spot1.id,
                name: 'Uni Spoon',
                rating: 5,
                tags: ['Shared'],
            },
            {
                spotId: spot1.id,
                name: 'Miso Soup',
                rating: 3,
                tags: [],
            },
        ],
    });

    console.log('Created menu items');

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

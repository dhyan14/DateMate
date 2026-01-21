import './globals.css';

export const metadata = {
    title: 'DateMate',
    description: 'Shared moments and places for us.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

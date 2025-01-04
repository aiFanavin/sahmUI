// src/app/layout.tsx
import './globals.css'
import { Providers } from './Providers'
import SessionGuard from '@/components/SessionGuard'

// ...

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <SessionGuard>
                {children}
            </SessionGuard>
        </Providers>
        </body>
        </html>
    )
}
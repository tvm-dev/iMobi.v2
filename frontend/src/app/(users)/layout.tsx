'use client';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { useRef } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <main className='flex flex-col justify-between min-h-screen w-full'>
      <section>
        <Sidebar
          onContactClick={() =>
            contactRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        {children}
      </section>
      <Footer ref={contactRef} />
    </main>
  );
}

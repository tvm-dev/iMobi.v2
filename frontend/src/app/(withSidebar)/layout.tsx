'use client';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { useRef } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <main className='flex flex-col justify-between min-h-screen w-full bg-sky-50/70'>
      <section>
        <Sidebar
          onContactClick={() =>
            contactRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <div className='mx-auto p-4 max-w-7xl h-full'>{children}</div>
      </section>
      <Footer ref={contactRef} />
    </main>
  );
}

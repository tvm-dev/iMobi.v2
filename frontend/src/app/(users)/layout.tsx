import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col justify-between min-h-screen w-full'>
      <section>
        <Sidebar />
        {children}
      </section>
      <Footer />
    </main>
  );
}

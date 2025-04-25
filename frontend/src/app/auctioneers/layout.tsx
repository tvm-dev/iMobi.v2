export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col justify-between min-h-screen w-full bg-sky-50/70'>
      <div className='p-4 w-full max-w-6xl mx-auto h-full'>{children}</div>
    </main>
  );
}

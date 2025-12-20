import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-zinc-900 text-zinc-100 min-h-screen">
        <header className="border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
            <h1 className="text-xl font-bold">📦 Product Manager</h1>
            <nav className="space-x-4 ">
              <a href="/product" className="hover:text-blue-400">สินค้า</a>
              <a href="/product/create" className="hover:text-green-400">เพิ่มสินค้า</a>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}

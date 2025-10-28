export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple sidebar placeholder */}
      <div className="flex">
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
          <h2 className="text-xl font-bold mb-8">AutoNetwork</h2>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800">
              Dashboard
            </a>
            <a href="/dashboard/cars" className="block px-4 py-2 rounded hover:bg-gray-800">
              Vehicles
            </a>
            <a href="/dashboard/inquiries" className="block px-4 py-2 rounded hover:bg-gray-800">
              Inquiries
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
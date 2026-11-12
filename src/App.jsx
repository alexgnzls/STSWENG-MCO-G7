import { useState } from 'react';
import { cx } from './lib/utils';
import LoginPage from './pages/LoginPage';
import SupportPage from './pages/SupportPage';
import PayrollPage from './pages/PayrollPage';

// Shared SVG icons for the shell layout
const Icons = {
  Menu: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
  ),
  Support: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
  ),
  Payroll: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path>
      </svg>
  ),
  Logout: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
  ),
};

const NAV = [
  { group: 'Support', id: 'support', label: 'Cases and complaints', title: 'Support cases', icon: <Icons.Support /> },
  { group: 'Disbursement', id: 'payroll', label: 'Payroll periods', title: 'Payroll', icon: <Icons.Payroll /> },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState('support');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  const page = NAV.find((n) => n.id === route);

  return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        {sidebarOpen && (
            <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col bg-ink text-cream border-r border-ink/10 transition-all duration-300">

              {/* Logo Area */}
              <div className="flex h-[72px] shrink-0 items-center px-6 border-b border-cream/10">
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold text-brand">Manong</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                {NAV.map((n) => (
                    <div key={n.id} className="mb-6">
                      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cream/40">
                        {n.group}
                      </p>
                      <button
                          onClick={() => setRoute(n.id)}
                          aria-current={route === n.id ? 'page' : undefined}
                          className={cx(
                              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
                              route === n.id ? 'bg-brand text-ink shadow-sm' : 'text-cream/80 hover:bg-cream/10 hover:text-white'
                          )}
                      >
                  <span className={cx(route === n.id ? 'text-ink' : 'text-cream/50')}>
                    {n.icon}
                  </span>
                        {n.label}
                      </button>
                    </div>
                ))}
              </nav>

              {/* Sidebar Footer: User Info & Logout */}
              <div className="border-t border-cream/10 p-4">
                <div className="mb-4 px-2">
                  <p className="text-sm font-medium text-cream">{user}</p>
                  {/* Placeholder for time of logged in */}
                  <p className="mt-0.5 text-xs text-cream/40">Last login: Today, 08:30 AM</p>
                </div>
                <button
                    onClick={() => setUser(null)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-cream/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
              <span className="text-red-400/80">
                <Icons.Logout />
              </span>
                  Sign out
                </button>
              </div>
            </aside>
        )}

        {/* Main Content Area */}
        <main className="flex min-w-0 flex-1 flex-col">

          {/* Top Bar */}
          <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-yellow-600 bg-yellow-500 px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg p-2 text-ink/80 hover:bg-black/10 hover:text-ink transition-colors"
                  aria-label="Toggle Sidebar"
              >
                <Icons.Menu />
              </button>
              <h1 className="text-xl font-semibold text-ink">{page.title}</h1>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 border-l border-ink/20 pl-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/40 text-ink font-bold ring-1 ring-ink/10">
                  {user.charAt(0).toUpperCase()}
                </div>
                <div className="hidden flex-col md:flex">
                  <span className="text-sm font-semibold text-ink">{user}</span>
                  <span className="text-xs font-medium text-ink/70">Administrator</span>
                </div>
                <button
                    onClick={() => setUser(null)}
                    className="ml-3 rounded-lg border border-red-800/20 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-6">
            {route === 'support' ? <SupportPage /> : <PayrollPage />}
          </div>
        </main>
      </div>
  );
}
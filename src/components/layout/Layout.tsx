
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Search, User } from 'lucide-react';
import clsx from 'clsx';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Heute', path: '/' },
        { icon: BookOpen, label: 'Lernen', path: '/learn' },
        { icon: Search, label: 'Wörterbuch', path: '/dictionary' },
        { icon: User, label: 'Profil', path: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto pb-20">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={clsx(
                                "flex flex-col items-center gap-1 transition-colors duration-200",
                                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Layout;

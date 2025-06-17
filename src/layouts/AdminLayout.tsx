
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Settings, Clock, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    navigate('/admin/login');
  };
  
  const navItems = [
    { to: '/admin/menu', label: 'Menu', icon: Menu },
    { to: '/admin/builder', label: 'Builder', icon: Settings },
    { to: '/admin/live-orders', label: 'Live Orders', icon: Clock },
    { to: '/admin/settings', label: 'Settings', icon: Cog }
  ];
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-52 bg-[#283526] text-white flex flex-col">
        {/* Logo/Title */}
        <div className="p-6 border-b border-gray-600">
          <h1 className="text-xl font-bold">Take A Bowl</h1>
          <p className="text-sm text-gray-300">Administration</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
        
        {/* Logout */}
        <div className="p-4 border-t border-gray-600">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Panneau d'administration
            </h2>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

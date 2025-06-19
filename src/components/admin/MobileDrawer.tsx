
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, Menu, Settings, Clock, Cog, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    navigate('/admin/login');
    onClose();
  };
  
  const navItems = [
    { to: '/admin/menu', label: 'Menu', icon: Menu },
    { to: '/admin/builder', label: 'Builder', icon: Settings },
    { to: '/admin/live-orders', label: 'Live Orders', icon: Clock },
    { to: '/admin/settings', label: 'Settings', icon: Cog }
  ];

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[70%]">
                  <div className="flex h-full flex-col bg-[#283526] text-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-600">
                      <div>
                        <h2 className="text-lg font-bold">Take A Bowl</h2>
                        <p className="text-sm text-gray-300">Administration</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-300 hover:text-white hover:bg-white/5"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                      <div className="space-y-2">
                        {navItems.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
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
                        Se déconnecter
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

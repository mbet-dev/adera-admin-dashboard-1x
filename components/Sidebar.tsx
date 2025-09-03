import React from 'react';
import { type View } from '../types';
import { DashboardIcon, PackageIcon, StoreIcon, SettingsIcon, LogoutIcon, AderaLogo, ChevronLeftIcon, ChevronRightIcon, FinancialsIcon, ERPIcon } from './Icons';

interface SidebarProps {
  activeView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setView, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'parcels', label: 'Parcels', icon: PackageIcon },
    { id: 'shops', label: 'Shops', icon: StoreIcon },
    { id: 'financials', label: 'Financials', icon: FinancialsIcon },
    { id: 'erp', label: 'ERP', icon: ERPIcon },
  ] as const;

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-700">
           <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <AderaLogo className="h-9 w-auto text-teal-500 dark:text-teal-400" />
           </div>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:outline-none">
            {isOpen ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView({ name: item.id })}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeView.name === item.id || (activeView.name === 'shopDetails' && item.id === 'shops')
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              } ${!isOpen && 'justify-center'}`}
            >
              <item.icon className="h-6 w-6" />
              <span className={`ml-4 font-medium transition-opacity duration-200 ${!isOpen && 'opacity-0 hidden'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setView({ name: 'settings' })}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeView.name === 'settings'
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              } ${!isOpen && 'justify-center'}`}
            >
              <SettingsIcon className="h-6 w-6" />
              <span className={`ml-4 font-medium transition-opacity duration-200 ${!isOpen && 'opacity-0 hidden'}`}>Settings</span>
            </button>
             <button
              className={`flex items-center w-full px-4 py-3 mt-2 rounded-lg transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white ${!isOpen && 'justify-center'}`}
            >
              <LogoutIcon className="h-6 w-6" />
              <span className={`ml-4 font-medium transition-opacity duration-200 ${!isOpen && 'opacity-0 hidden'}`}>Logout</span>
            </button>
        </div>
      </div>

       {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-700">
             <AderaLogo className="h-9 w-auto text-teal-500 dark:text-teal-400" />
           </div>
           <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setView({ name: item.id }); setIsOpen(false); }}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeView.name === item.id || (activeView.name === 'shopDetails' && item.id === 'shops')
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="ml-4 font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                <button
                onClick={() => { setView({ name: 'settings' }); setIsOpen(false); }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeView.name === 'settings'
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
                >
                <SettingsIcon className="h-6 w-6" />
                <span className="ml-4 font-medium">Settings</span>
                </button>
                <button
                className="flex items-center w-full px-4 py-3 mt-2 rounded-lg transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                >
                <LogoutIcon className="h-6 w-6" />
                <span className="ml-4 font-medium">Logout</span>
                </button>
            </div>
        </div>
    </>
  );
};

export default Sidebar;
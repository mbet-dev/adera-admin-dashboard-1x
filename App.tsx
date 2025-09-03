import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Parcels from './components/Parcels';
import Shops from './components/Shops';
import ShopDetails from './components/ShopDetails';
import Financials from './components/Financials';
import Settings from './components/Settings';
import { type View } from './types';
import { AderaLogo } from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ name: 'dashboard' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleViewShop = (shopId: string) => {
    setView({ name: 'shopDetails', shopId });
  };

  const handleBackToShops = () => {
    setView({ name: 'shops' });
  };

  const renderView = useCallback(() => {
    switch (view.name) {
      case 'dashboard':
        return <Dashboard />;
      case 'parcels':
        return <Parcels />;
      case 'shops':
        return <Shops onViewShop={handleViewShop} />;
      case 'shopDetails':
        return <ShopDetails shopId={view.shopId} onBack={handleBackToShops} />;
      case 'financials':
        return <Financials />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  }, [view]);

  // A simple effect to handle sidebar visibility on smaller screens, could be improved with a proper resize listener
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);


  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar activeView={view} setView={setView} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="p-4 md:p-8 h-full overflow-y-auto">
           <div className="flex items-center mb-6 md:hidden">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-4 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
             <AderaLogo className="h-8 w-auto text-teal-400" />
           </div>
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
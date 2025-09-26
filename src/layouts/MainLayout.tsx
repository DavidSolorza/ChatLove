import React from 'react';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

interface User {
  name: string;
  avatar?: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  user?: User;
  hideNavigation?: boolean;
}

// Layout principal que envuelve todas las páginas
const MainLayout: React.FC<MainLayoutProps> = ({ children, user, hideNavigation = false }) => {
  const { logout } = useAuth();
  
  const handleProfileClick = () => {
    console.log('Abrir perfil');
  };

  const handleSettingsClick = () => {
    console.log('Abrir configuración');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header 
        user={user}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      {!hideNavigation && <Navigation />}
      <Footer />
    </div>
  );
};

export default MainLayout;
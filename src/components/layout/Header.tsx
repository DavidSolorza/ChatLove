import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Settings } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

interface User {
  name: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

// Header principal de la aplicación
const Header: React.FC<HeaderProps> = ({ user, onProfileClick, onSettingsClick }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
            <h1 className="text-2xl font-bold">LoveSpace</h1>
          </div>
          
          {/* Información del usuario */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm opacity-90">
                Hola, {user.name}
              </span>
            )}
            
            <div className="flex items-center gap-2">
              <button 
                onClick={onProfileClick}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Perfil"
              >
                <User className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => navigate(ROUTES.SETTINGS)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Configuración"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
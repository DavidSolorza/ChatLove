import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, Camera, Video, BookOpen, Sparkles } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

// Navegación principal de la aplicación
const Navigation: React.FC = () => {
  const navigationItems = [
    { path: ROUTES.CHAT, icon: MessageCircle, label: 'Chat' },
    { path: ROUTES.ALBUM, icon: Camera, label: 'Álbum' },
    { path: ROUTES.VIDEOCALL, icon: Video, label: 'Video' },
    { path: ROUTES.TIMELINE, icon: BookOpen, label: 'Timeline' },
    { path: ROUTES.AI, icon: Sparkles, label: 'IA' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-pink-200 dark:border-gray-700 px-4 py-2 transition-colors">
      <div className="container mx-auto">
        <ul className="flex items-center justify-around gap-2">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-pink-600 bg-pink-50 dark:bg-pink-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-pink-600 hover:bg-pink-25 dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
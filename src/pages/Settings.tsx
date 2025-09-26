import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, User, Bell, Shield, Heart, Save } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';

// Página de configuración del usuario
const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    partnerEmail: ''
  });
  
  const [notifications, setNotifications] = useState({
    messages: true,
    timeline: true,
    videoCalls: false
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Aquí se enviarían los datos al backend
      console.log('Guardando perfil:', profileData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error guardando perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout user={user || undefined} hideNavigation>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-pink-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Configuración</h1>
              <p className="text-gray-600 dark:text-gray-300">Personaliza tu experiencia en LoveSpace</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Perfil */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-pink-500" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Perfil</h2>
              </div>

              <Input
                label="Nombre"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Tu nombre"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="tu@email.com"
              />

              <Input
                label="Biografía"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                placeholder="Cuéntanos algo sobre ti..."
              />

              <Input
                label="Email de tu pareja"
                name="partnerEmail"
                type="email"
                value={profileData.partnerEmail}
                onChange={handleProfileChange}
                placeholder="pareja@email.com"
              />

              <Button
                onClick={handleSaveProfile}
                disabled={isLoading}
                fullWidth
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </Card>

          {/* Apariencia y Notificaciones */}
          <div className="space-y-6">
            {/* Tema */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  {isDarkMode ? (
                    <Moon className="w-6 h-6 text-pink-500" />
                  ) : (
                    <Sun className="w-6 h-6 text-pink-500" />
                  )}
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Apariencia</h2>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Modo oscuro</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Cambia entre tema claro y oscuro
                    </p>
                  </div>
                  
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDarkMode ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>

            {/* Notificaciones */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Notificaciones</h2>
                </div>

                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white capitalize">
                        {key === 'messages' ? 'Mensajes' : 
                         key === 'timeline' ? 'Timeline' : 'Videollamadas'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Recibir notificaciones de {key === 'messages' ? 'mensajes' : 
                         key === 'timeline' ? 'publicaciones' : 'videollamadas'}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Privacidad y Seguridad */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-pink-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Privacidad y Seguridad</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="secondary" fullWidth>
                Cambiar Contraseña
              </Button>
              
              <Button variant="secondary" fullWidth>
                Descargar Mis Datos
              </Button>
              
              <Button variant="danger" fullWidth onClick={handleLogout}>
                Cerrar Sesión
              </Button>
              
              <Button variant="danger" fullWidth>
                Eliminar Cuenta
              </Button>
            </div>
          </div>
        </Card>

        {/* Información de la app */}
        <Card>
          <div className="text-center space-y-2">
            <Heart className="w-8 h-8 text-pink-500 mx-auto" fill="currentColor" />
            <h3 className="font-semibold text-gray-800 dark:text-white">LoveSpace v1.0</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Hecho con 💖 para parejas que se aman
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
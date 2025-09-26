import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './utils/constants';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Album from './pages/Album';
import VideoCall from './pages/VideoCall';
import Timeline from './pages/Timeline';
import AISpace from './pages/AISpace';
import Settings from './pages/Settings';

// Componente interno que usa el hook de autenticación
const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <Routes>
          {/* Rutas públicas */}
          <Route path={ROUTES.LOGIN} element={
            isAuthenticated ? <Navigate to={ROUTES.CHAT} replace /> : <Login />
          } />
          
          <Route path={ROUTES.REGISTER} element={
            isAuthenticated ? <Navigate to={ROUTES.CHAT} replace /> : <Register />
          } />

          {/* Rutas privadas */}
          <Route path={ROUTES.CHAT} element={
            isAuthenticated ? <Chat /> : <Navigate to={ROUTES.LOGIN} replace />
          } />
          
          <Route path={ROUTES.ALBUM} element={
            isAuthenticated ? <Album /> : <Navigate to={ROUTES.LOGIN} replace />
          } />
          
          <Route path={ROUTES.VIDEOCALL} element={
            isAuthenticated ? <VideoCall /> : <Navigate to={ROUTES.LOGIN} replace />
          } />
          
          <Route path={ROUTES.TIMELINE} element={
            isAuthenticated ? <Timeline /> : <Navigate to={ROUTES.LOGIN} replace />
          } />
          
          <Route path={ROUTES.AI} element={
            isAuthenticated ? <AISpace /> : <Navigate to={ROUTES.LOGIN} replace />
          } />
          
          <Route path={ROUTES.SETTINGS} element={
            isAuthenticated ? <Settings /> : <Navigate to={ROUTES.LOGIN} replace />
          } />

          {/* Ruta por defecto */}
          <Route path={ROUTES.HOME} element={
            <Navigate to={isAuthenticated ? ROUTES.CHAT : ROUTES.LOGIN} replace />
          } />
          
          {/* Ruta 404 */}
          <Route path="*" element={
            <Navigate to={isAuthenticated ? ROUTES.CHAT : ROUTES.LOGIN} replace />
          } />
        </Routes>
      </div>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
    </Router>
  );
}

export default App;
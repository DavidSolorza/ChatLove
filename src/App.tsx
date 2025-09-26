import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './utils/constants';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Album from './pages/Album';
import VideoCall from './pages/VideoCall';
import Timeline from './pages/Timeline';
import AISpace from './pages/AISpace';

// Componente principal de la aplicación
function App() {
  // Estado de autenticación simulado (se conectará al backend)
  const isAuthenticated = true; // Cambiar según el estado real de autenticación

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
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
    </Router>
  );
}

export default App;
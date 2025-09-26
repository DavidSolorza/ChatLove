import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Hook personalizado para manejar la autenticación
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Simular verificación de token al cargar la app
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Aquí se verificaría el token con el backend
          const mockUser: User = {
            id: 'user1',
            name: 'María',
            email: 'maria@example.com'
          };
          
          setAuthState({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Aquí se haría la llamada al backend
      console.log('Login:', { email, password });
      
      // Simular respuesta exitosa
      const mockUser: User = {
        id: 'user1',
        name: 'María',
        email
      };
      
      localStorage.setItem('authToken', 'mock-token');
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Aquí se haría la llamada al backend
      console.log('Register:', { name, email, password });
      
      const mockUser: User = {
        id: 'user1',
        name,
        email
      };
      
      localStorage.setItem('authToken', 'mock-token');
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error al crear cuenta' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    register,
    logout
  };
};
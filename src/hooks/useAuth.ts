import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  partnerId: string | null;
  partnerEmail: string | null;
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
    const checkAuth = async () => {
      try {
        const user = await authService.verifySession();
        
        setAuthState({
          user,
          isAuthenticated: !!user,
          isLoading: false
        });
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
      const user = await authService.login(email, password);
      
      setAuthState({
        user,
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
      const user = await authService.register(name, email, password);
      
      setAuthState({
        user,
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
    authService.logout();
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
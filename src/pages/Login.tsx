import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

// Página de inicio de sesión
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(ROUTES.CHAT);
      } else {
        setErrors({ 
          email: result.error || 'Error al iniciar sesión',
          password: '' 
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <Card className="text-center" padding="lg">
          {/* Logo y título */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-500" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">LoveSpace</h1>
            <p className="text-gray-600 dark:text-gray-300">Tu espacio privado en pareja</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleInputChange}
              label="Email"
              error={errors.email}
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              label="Contraseña"
              error={errors.password}
              required
            />

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-6 pt-6 border-t border-pink-200">
            <p className="text-gray-600 dark:text-gray-300">
              ¿No tienes cuenta?{' '}
              <Link 
                to={ROUTES.REGISTER}
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
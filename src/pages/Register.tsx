import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { validateEmail } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

// Página de registro
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Register data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = ROUTES.CHAT;
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center" padding="lg">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-500" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Únete a LoveSpace</h1>
            <p className="text-gray-600">Crea tu cuenta y conecta con tu pareja</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleInputChange}
              label="Nombre completo"
              error={errors.name}
              required
            />

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

            <Input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              label="Confirmar contraseña"
              error={errors.confirmPassword}
              required
            />

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-pink-200">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to={ROUTES.LOGIN}
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
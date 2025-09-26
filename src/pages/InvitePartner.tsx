import React, { useState, useEffect } from 'react';
import { Heart, Mail, UserPlus, Check, X } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { validateEmail } from '../utils/helpers';

interface Invitation {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserEmail: string;
  toEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Página para invitar pareja y gestionar invitaciones
const InvitePartner: React.FC = () => {
  const { user } = useAuth();
  const [partnerEmail, setPartnerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [receivedInvitations, setReceivedInvitations] = useState<Invitation[]>([]);
  const [loadingInvitations, setLoadingInvitations] = useState(true);

  // Cargar invitaciones recibidas
  useEffect(() => {
    const loadInvitations = async () => {
      if (!user?.email) return;
      
      try {
        const invitations = await authService.getReceivedInvitations(user.email);
        setReceivedInvitations(invitations);
      } catch (error) {
        console.error('Error cargando invitaciones:', error);
      } finally {
        setLoadingInvitations(false);
      }
    };

    loadInvitations();
  }, [user?.email]);

  const handleInvitePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!partnerEmail.trim()) {
      setMessage({ type: 'error', text: 'Por favor ingresa un email' });
      return;
    }
    
    if (!validateEmail(partnerEmail)) {
      setMessage({ type: 'error', text: 'Email inválido' });
      return;
    }
    
    if (partnerEmail === user?.email) {
      setMessage({ type: 'error', text: 'No puedes invitarte a ti mismo' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      await authService.invitePartner(user!.id, partnerEmail);
      setMessage({ 
        type: 'success', 
        text: `Invitación enviada a ${partnerEmail}. Cuando acepte la invitación, podrán conectarse como pareja.` 
      });
      setPartnerEmail('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Error al enviar invitación' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await authService.acceptInvitation(invitationId, user!.id);
      setMessage({ 
        type: 'success', 
        text: '¡Invitación aceptada! Ahora están conectados como pareja.' 
      });
      
      // Recargar invitaciones
      const invitations = await authService.getReceivedInvitations(user!.email);
      setReceivedInvitations(invitations);
      
      // Recargar la página para actualizar el estado del usuario
      window.location.reload();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Error al aceptar invitación' 
      });
    }
  };

  // Si ya tiene pareja, mostrar información
  if (user?.partnerId) {
    return (
      <MainLayout user={user}>
        <div className="max-w-2xl mx-auto">
          <Card className="text-center" padding="lg">
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" fill="currentColor" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              ¡Ya tienes pareja!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Estás conectado con: <strong>{user.partnerEmail}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Ahora pueden disfrutar de todas las funciones de LoveSpace juntos.
            </p>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout user={user}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <div className="flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-pink-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Invitar Pareja</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Conecta con tu pareja para usar LoveSpace juntos
              </p>
            </div>
          </div>
        </Card>

        {/* Formulario de invitación */}
        <Card>
          <form onSubmit={handleInvitePartner} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-pink-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Enviar Invitación
              </h2>
            </div>

            <Input
              type="email"
              placeholder="pareja@email.com"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              label="Email de tu pareja"
              required
            />

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              <Mail className="w-4 h-4" />
              {isLoading ? 'Enviando...' : 'Enviar Invitación'}
            </Button>
          </form>

          {/* Mensaje de estado */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
        </Card>

        {/* Invitaciones recibidas */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Invitaciones Recibidas
            </h2>
          </div>

          {loadingInvitations ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
            </div>
          ) : receivedInvitations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No tienes invitaciones pendientes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {receivedInvitations.map((invitation) => (
                <div 
                  key={invitation.id}
                  className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {invitation.fromUserName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {invitation.fromUserEmail}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(invitation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptInvitation(invitation.id)}
                    >
                      <Check className="w-4 h-4" />
                      Aceptar
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                    >
                      <X className="w-4 h-4" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Información adicional */}
        <Card>
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-white">¿Cómo funciona?</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>1. Ingresa el email de tu pareja y envía la invitación</p>
              <p>2. Tu pareja recibirá la invitación cuando inicie sesión</p>
              <p>3. Una vez aceptada, podrán usar todas las funciones juntos</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvitePartner;
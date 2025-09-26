import usersData from '../data/users.json';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  partnerId: string | null;
  partnerEmail: string | null;
  createdAt: string;
}

interface Invitation {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserEmail: string;
  toEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Simulación de base de datos en memoria
let users: User[] = [...usersData.users];
let invitations: Invitation[] = [...usersData.invitations];

// Generar ID único
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Servicio de autenticación
export const authService = {
  // Login de usuario
  async login(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay de red
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }
    
    // Guardar sesión
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      partnerId: user.partnerId,
      partnerEmail: user.partnerEmail
    };
    
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    localStorage.setItem('authToken', `token_${user.id}_${Date.now()}`);
    
    return sessionData;
  },

  // Registro de usuario
  async register(name: string, email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar si el email ya existe
    if (users.find(u => u.email === email)) {
      throw new Error('Este email ya está registrado');
    }
    
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      partnerId: null,
      partnerEmail: null,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Guardar sesión
    const sessionData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      partnerId: newUser.partnerId,
      partnerEmail: newUser.partnerEmail
    };
    
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    localStorage.setItem('authToken', `token_${newUser.id}_${Date.now()}`);
    
    return sessionData;
  },

  // Verificar sesión existente
  async verifySession() {
    const sessionData = localStorage.getItem('userSession');
    const token = localStorage.getItem('authToken');
    
    if (!sessionData || !token) {
      return null;
    }
    
    try {
      return JSON.parse(sessionData);
    } catch {
      return null;
    }
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('userSession');
    localStorage.removeItem('authToken');
  },

  // Invitar pareja
  async invitePartner(fromUserId: string, partnerEmail: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const fromUser = users.find(u => u.id === fromUserId);
    if (!fromUser) {
      throw new Error('Usuario no encontrado');
    }
    
    // Verificar si ya tiene pareja
    if (fromUser.partnerId) {
      throw new Error('Ya tienes una pareja conectada');
    }
    
    // Verificar si ya existe una invitación pendiente
    const existingInvitation = invitations.find(
      inv => inv.fromUserId === fromUserId && inv.toEmail === partnerEmail && inv.status === 'pending'
    );
    
    if (existingInvitation) {
      throw new Error('Ya enviaste una invitación a este email');
    }
    
    const invitation: Invitation = {
      id: generateId(),
      fromUserId,
      fromUserName: fromUser.name,
      fromUserEmail: fromUser.email,
      toEmail: partnerEmail,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    invitations.push(invitation);
    
    return invitation;
  },

  // Obtener invitaciones recibidas
  async getReceivedInvitations(userEmail: string) {
    return invitations.filter(inv => inv.toEmail === userEmail && inv.status === 'pending');
  },

  // Aceptar invitación
  async acceptInvitation(invitationId: string, userId: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const invitation = invitations.find(inv => inv.id === invitationId);
    if (!invitation) {
      throw new Error('Invitación no encontrada');
    }
    
    const user = users.find(u => u.id === userId);
    const partner = users.find(u => u.id === invitation.fromUserId);
    
    if (!user || !partner) {
      throw new Error('Usuario no encontrado');
    }
    
    // Conectar usuarios como pareja
    user.partnerId = partner.id;
    user.partnerEmail = partner.email;
    partner.partnerId = user.id;
    partner.partnerEmail = user.email;
    
    // Marcar invitación como aceptada
    invitation.status = 'accepted';
    
    // Actualizar sesión si es el usuario actual
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (session.id === userId) {
        session.partnerId = partner.id;
        session.partnerEmail = partner.email;
        localStorage.setItem('userSession', JSON.stringify(session));
      }
    }
    
    return { user, partner };
  }
};
import React, { useState, useRef } from 'react';
import { Send, Image, Smile, Heart } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import { generateId, formatTime } from '../utils/helpers';
import { STICKERS } from '../utils/constants';

interface Message {
  id: string;
  type: 'text' | 'image' | 'sticker';
  content: string;
  timestamp: string;
  sender: string;
}

interface Sticker {
  id: number;
  emoji: string;
  name: string;
}

// Componente para mostrar cada mensaje en el chat
const MessageBubble: React.FC<{ message: Message; isOwn: boolean }> = ({ message, isOwn }) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return <p className="break-words">{message.content}</p>;
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={message.content} 
              alt="Imagen enviada" 
              className="rounded-lg w-full h-auto"
            />
          </div>
        );
      case 'sticker':
        return (
          <span className="text-4xl">{message.content}</span>
        );
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-xs lg:max-w-md">
        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm'
              : 'bg-white border border-pink-200 text-gray-800 rounded-bl-sm'
          }`}
        >
          {renderMessageContent()}
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

// Selector de stickers para el chat
const StickerPicker: React.FC<{ 
  isOpen: boolean; 
  onSelectSticker: (sticker: Sticker) => void; 
  onClose: () => void; 
}> = ({ isOpen, onSelectSticker, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-16 left-0 right-0 bg-white border border-pink-200 rounded-t-xl shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800">Stickers</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {STICKERS.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => {
                onSelectSticker(sticker);
                onClose();
              }}
              className="p-3 rounded-lg hover:bg-pink-50 transition-colors"
              title={sticker.name}
            >
              <span className="text-2xl">{sticker.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Página principal del chat
const Chat: React.FC = () => {
  // Estado para los mensajes (se conectará al backend)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'text',
      content: '¡Hola mi amor! ¿Cómo estás?',
      timestamp: new Date().toISOString(),
      sender: 'partner'
    },
    {
      id: '2',
      type: 'text',
      content: '¡Muy bien! Te extraño mucho 💕',
      timestamp: new Date().toISOString(),
      sender: 'me'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Usuario simulado (vendrá del contexto/estado global)
  const currentUser = { name: 'María', id: 'me' };

  const handleSendMessage = (type: 'text' | 'image' | 'sticker' = 'text', content = newMessage) => {
    if (!content.trim() && type === 'text') return;

    const message: Message = {
      id: generateId(),
      type,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      sender: 'me'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Aquí se enviaría al backend
    console.log('Enviando mensaje:', message);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Crear URL temporal para mostrar la imagen
    const imageUrl = URL.createObjectURL(file);
    handleSendMessage('image', imageUrl);
    
    // Aquí se subiría la imagen real al servidor
    console.log('Subiendo imagen:', file);
  };

  const handleStickerSelect = (sticker: Sticker) => {
    handleSendMessage('sticker', sticker.emoji);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MainLayout user={currentUser}>
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header del chat */}
        <div className="bg-white rounded-lg shadow-sm border border-pink-200 p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Chat Privado</h2>
              <p className="text-sm text-gray-600">
                {isTyping ? 'Tu pareja está escribiendo...' : 'En línea'}
              </p>
            </div>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 bg-white rounded-lg border border-pink-200 flex flex-col min-h-0">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.sender === 'me'}
              />
            ))}
          </div>

          {/* Área de escritura */}
          <div className="border-t border-pink-200 p-4 relative">
            <StickerPicker
              isOpen={showStickers}
              onSelectSticker={handleStickerSelect}
              onClose={() => setShowStickers(false)}
            />
            
            <div className="flex items-end gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  title="Enviar imagen"
                >
                  <Image className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setShowStickers(!showStickers)}
                  className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  title="Stickers"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 resize-none border-2 border-pink-200 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                  rows={1}
                />
                
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!newMessage.trim()}
                  size="md"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
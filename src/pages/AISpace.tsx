import React, { useState } from 'react';
import { Sparkles, RefreshCw, Heart, MessageCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { generateId } from '../utils/helpers';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: 'romantic' | 'activity' | 'gift' | 'date' | 'message';
  actionText?: string;
}

// Componente para mostrar sugerencias de IA
const SuggestionCard: React.FC<{ 
  suggestion: Suggestion; 
  onApply: (suggestion: Suggestion) => void; 
}> = ({ suggestion, onApply }) => {
  const getIconByCategory = (category: string) => {
    const icons = {
      romantic: Heart,
      activity: Sparkles,
      gift: Sparkles,
      date: Heart,
      message: Heart
    };
    
    const Icon = icons[category as keyof typeof icons] || Sparkles;
    return <Icon className="w-5 h-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      romantic: 'bg-pink-100 text-pink-600',
      activity: 'bg-purple-100 text-purple-600',
      gift: 'bg-indigo-100 text-indigo-600',
      date: 'bg-rose-100 text-rose-600',
      message: 'bg-fuchsia-100 text-fuchsia-600'
    };
    
    return colors[category as keyof typeof colors] || 'bg-pink-100 text-pink-600';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${getCategoryColor(suggestion.category)}`}>
            {getIconByCategory(suggestion.category)}
          </div>
          
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {suggestion.category}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">{suggestion.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {suggestion.description}
          </p>
        </div>

        {suggestion.actionText && (
          <button
            onClick={() => onApply(suggestion)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-colors"
          >
            {suggestion.actionText}
          </button>
        )}
      </div>
    </Card>
  );
};

// Página del espacio con IA para sugerencias románticas
const AISpace: React.FC = () => {
  // Sugerencias simuladas (se conectarán al backend/IA)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      title: 'Noche de películas románticas',
      description: 'Crea una lista de películas románticas clásicas y prepara palomitas caseras con sabores especiales. ¡No olvides las mantas suaves!',
      category: 'activity',
      actionText: 'Ver ideas de películas'
    },
    {
      id: '2',
      title: 'Mensaje de buenos días',
      description: '"Buenos días, mi amor. Despertar sabiendo que eres parte de mi vida hace que cada día sea perfecto. Te amo infinitamente 💕"',
      category: 'message',
      actionText: 'Enviar mensaje'
    },
    {
      id: '3',
      title: 'Cita sorpresa en casa',
      description: 'Transforma tu sala en un restaurante romántico. Usa velas, música suave y preparen juntos su plato favorito.',
      category: 'date',
      actionText: 'Planificar cita'
    },
    {
      id: '4',
      title: 'Regalo personalizado',
      description: 'Crea un álbum de fotos digital con vuestros mejores momentos y añade notas de voz explicando por qué cada foto es especial.',
      category: 'gift',
      actionText: 'Crear álbum'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const currentUser = { name: 'María', id: 'me' };

  const categories = [
    { id: 'all', name: 'Todo', icon: Sparkles },
    { id: 'romantic', name: 'Romántico', icon: Heart },
    { id: 'activity', name: 'Actividades', icon: Sparkles },
    { id: 'gift', name: 'Regalos', icon: Sparkles },
    { id: 'date', name: 'Citas', icon: Heart },
    { id: 'message', name: 'Mensajes', icon: MessageCircle }
  ];

  const generateNewSuggestions = async () => {
    setIsGenerating(true);
    
    try {
      // Simular llamada a IA para generar nuevas sugerencias
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newSuggestions: Suggestion[] = [
        {
          id: generateId(),
          title: 'Desayuno en la cama',
          description: 'Sorprende a tu pareja con su desayuno favorito servido en la cama con una flor fresca y una nota de amor.',
          category: 'romantic',
          actionText: 'Ver recetas'
        },
        {
          id: generateId(),
          title: 'Paseo nocturno',
          description: 'Un paseo bajo las estrellas por vuestro lugar favorito de la ciudad, con una parada para tomar chocolate caliente.',
          category: 'activity',
          actionText: 'Planificar paseo'
        }
      ];
      
      setSuggestions(prev => [...newSuggestions, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error('Error al generar sugerencias:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplySuggestion = (suggestion: Suggestion) => {
    console.log('Aplicar sugerencia:', suggestion);
    
    // Aquí se implementaría la acción según el tipo de sugerencia
    switch (suggestion.category) {
      case 'message':
        // Abrir chat con el mensaje prellenado
        break;
      case 'activity':
        // Agregar al calendario o lista de actividades
        break;
      case 'gift':
        // Abrir herramientas de creación
        break;
      default:
        // Acción genérica
        break;
    }
  };

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  return (
    <MainLayout user={currentUser}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Espacio IA</h1>
                <p className="text-gray-600">Sugerencias románticas personalizadas</p>
              </div>
            </div>

            <Button
              onClick={generateNewSuggestions}
              disabled={isGenerating}
              variant="secondary"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generando...' : 'Nuevas ideas'}
            </Button>
          </div>
        </Card>

        {/* Filtros de categoría */}
        <Card className="mb-6" padding="sm">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Grid de sugerencias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuggestions.length === 0 ? (
            <div className="col-span-full">
              <Card className="text-center" padding="lg">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No hay sugerencias para esta categoría</p>
                <p className="text-sm text-gray-400">
                  Prueba con otra categoría o genera nuevas ideas
                </p>
              </Card>
            </div>
          ) : (
            filteredSuggestions.map(suggestion => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onApply={handleApplySuggestion}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AISpace;
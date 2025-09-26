import React, { useState, useRef } from 'react';
import { Upload, Heart } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { generateId } from '../utils/helpers';

interface Photo {
  id: string;
  url: string;
  title: string;
  uploadedAt: string;
}

// Componente para mostrar fotos en cuadrícula
const PhotoGrid: React.FC<{ 
  photos: Photo[]; 
  onPhotoClick: (photo: Photo) => void; 
}> = ({ photos, onPhotoClick }) => {
  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No hay fotos aún</p>
        <p className="text-sm text-gray-400">
          Sube tu primera foto para comenzar a crear recuerdos juntos
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div 
          key={photo.id}
          className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group relative"
          onClick={() => onPhotoClick(photo)}
        >
          <img 
            src={photo.url} 
            alt={photo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay con información */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
            <div className="p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs font-medium truncate">{photo.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Página del álbum compartido
const Album: React.FC = () => {
  // Fotos simuladas (se conectarán al backend)
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Nuestra primera cita',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '2', 
      url: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Caminata en el parque',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1024956/pexels-photo-1024956.jpeg?auto=compress&cs=tinysrgb&w=400', 
      title: 'Cena romántica',
      uploadedAt: new Date().toISOString()
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = { name: 'María', id: 'me' };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      // Simular subida de fotos
      const newPhotos: Photo[] = files.map(file => ({
        id: generateId(),
        url: URL.createObjectURL(file),
        title: file.name.split('.')[0],
        uploadedAt: new Date().toISOString()
      }));

      setPhotos(prev => [...newPhotos, ...prev]);
      
      // Aquí se subirían al servidor
      console.log('Subiendo fotos:', files);
      
    } catch (error) {
      console.error('Error al subir fotos:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <MainLayout user={currentUser}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Álbum Compartido</h1>
                <p className="text-gray-600">
                  {photos.length} {photos.length === 1 ? 'foto' : 'fotos'} guardadas
                </p>
              </div>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Subiendo...' : 'Subir Fotos'}
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </Card>

        {/* Grid de fotos */}
        <Card padding="lg">
          <PhotoGrid 
            photos={photos} 
            onPhotoClick={handlePhotoClick}
          />
        </Card>

        {/* Modal para ver foto completa */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{selectedPhoto.title}</h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title}
                className="max-w-full max-h-96 object-contain mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Album;
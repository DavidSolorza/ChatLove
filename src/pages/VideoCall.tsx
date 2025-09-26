import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, Camera, Heart } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Página de videollamada (solo diseño)
const VideoCall: React.FC = () => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isInCall, setIsInCall] = useState(false);

  const currentUser = { name: 'María', id: 'me' };

  const handleStartCall = () => {
    setIsInCall(true);
    // Aquí se iniciaría la videollamada real
    console.log('Iniciando videollamada...');
  };

  const handleEndCall = () => {
    setIsInCall(false);
    console.log('Finalizando videollamada...');
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    console.log('Video:', !isVideoEnabled ? 'encendido' : 'apagado');
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    console.log('Audio:', !isAudioEnabled ? 'encendido' : 'apagado');
  };

  if (!isInCall) {
    return (
      <MainLayout user={currentUser}>
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-96">
          <Card className="text-center" padding="lg">
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" fill="currentColor" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Videollamada</h1>
            <p className="text-gray-600 mb-6">
              Conecta cara a cara con tu pareja en cualquier momento
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant={isVideoEnabled ? 'primary' : 'secondary'}
                  onClick={toggleVideo}
                >
                  {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  {isVideoEnabled ? 'Video ON' : 'Video OFF'}
                </Button>
                
                <Button
                  variant={isAudioEnabled ? 'primary' : 'secondary'}
                  onClick={toggleAudio}
                >
                  {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  {isAudioEnabled ? 'Audio ON' : 'Audio OFF'}
                </Button>
              </div>
              
              <Button size="lg" onClick={handleStartCall}>
                <Camera className="w-5 h-5" />
                Iniciar Videollamada
              </Button>
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout user={currentUser}>
      <div className="max-w-6xl mx-auto h-full">
        <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
          {/* Video principal (pareja) */}
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <div className="text-center text-white">
              <Heart className="w-16 h-16 mx-auto mb-4" fill="currentColor" />
              <p className="text-xl font-semibold">Video de tu pareja</p>
              <p className="text-sm opacity-75">Conectado</p>
            </div>
          </div>
          
          {/* Video propio (esquina) */}
          <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg border-2 border-white overflow-hidden">
            {isVideoEnabled ? (
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                <span className="text-xs text-white font-medium">Tu video</span>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <VideoOff className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Controles */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
              <Button
                variant={isVideoEnabled ? 'secondary' : 'danger'}
                size="sm"
                onClick={toggleVideo}
              >
                {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={isAudioEnabled ? 'secondary' : 'danger'}
                size="sm"
                onClick={toggleAudio}
              >
                {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="danger"
                size="sm"
                onClick={handleEndCall}
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Información de la llamada */}
        <Card className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Llamada en curso</h3>
              <p className="text-sm text-gray-600">Duración: 02:34</p>
            </div>
            
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Conectado</span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default VideoCall;
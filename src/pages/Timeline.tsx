import React, { useState } from 'react';
import { PlusCircle, Heart, Image, Calendar, MessageCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { generateId, formatDate } from '../utils/helpers';

interface Post {
  id: string;
  author: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

// Componente para cada publicación del timeline
const PostCard: React.FC<{ 
  post: Post; 
  onLike: (postId: string) => void; 
  onComment: (postId: string) => void; 
}> = ({ post, onLike, onComment }) => {
  return (
    <Card className="mb-6">
      {/* Header del post */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">
            {post.author.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{post.author}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-3 h-3" />
            {formatDate(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
        
        {post.image && (
          <div className="mt-3">
            <img 
              src={post.image} 
              alt="Imagen del post"
              className="w-full max-w-md rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-6 pt-3 border-t border-pink-100">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            post.isLiked 
              ? 'text-pink-600' 
              : 'text-gray-500 hover:text-pink-600'
          }`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={post.isLiked ? 'currentColor' : 'none'}
          />
          {post.likes} {post.likes === 1 ? 'Me gusta' : 'Me gusta'}
        </button>
        
        <button
          onClick={() => onComment(post.id)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {post.comments} {post.comments === 1 ? 'Comentario' : 'Comentarios'}
        </button>
      </div>
    </Card>
  );
};

// Página del timeline/muro
const Timeline: React.FC = () => {
  // Posts simulados (se conectarán al backend)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'María',
      content: '¡Qué día tan hermoso hemos pasado juntos en el parque! 🌸',
      image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=600',
      createdAt: new Date().toISOString(),
      likes: 2,
      comments: 1,
      isLiked: true
    },
    {
      id: '2',
      author: 'Carlos',
      content: 'Cocinando juntos es una de mis actividades favoritas. ¡El resultado estuvo delicioso!',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      likes: 1,
      comments: 0,
      isLiked: false
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const currentUser = { name: 'María', id: 'me' };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    setIsCreating(true);

    try {
      const post: Post = {
        id: generateId(),
        author: currentUser.name,
        content: newPost.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false
      };

      setPosts(prev => [post, ...prev]);
      setNewPost('');
      
      // Aquí se enviaría al backend
      console.log('Creando post:', post);
      
    } catch (error) {
      console.error('Error al crear post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
    
    console.log('Toggle like para post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Abrir comentarios para post:', postId);
  };

  return (
    <MainLayout user={currentUser}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>
              <p className="text-gray-600">Comparte vuestros momentos especiales</p>
            </div>
          </div>
        </Card>

        {/* Crear nuevo post */}
        <Card className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800">
                ¿Qué está pasando, {currentUser.name}?
              </h3>
            </div>

            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Comparte un momento especial..."
              className="w-full p-4 border-2 border-pink-200 rounded-lg resize-none focus:outline-none focus:border-pink-500 transition-colors"
              rows={3}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                  <Image className="w-5 h-5" />
                </button>
              </div>

              <Button
                onClick={handleCreatePost}
                disabled={!newPost.trim() || isCreating}
              >
                <PlusCircle className="w-4 h-4" />
                {isCreating ? 'Publicando...' : 'Publicar'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista de posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card className="text-center" padding="lg">
              <p className="text-gray-500">No hay publicaciones aún</p>
              <p className="text-sm text-gray-400 mt-2">
                ¡Sé el primero en compartir un momento especial!
              </p>
            </Card>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Timeline;
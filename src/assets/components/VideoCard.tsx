import { Play } from 'lucide-react';
import { Button } from './button';

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnail: string;
  category?: string;
}

export function VideoCard({ title, duration, thumbnail, category }: VideoCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button 
            size="icon"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 shadow-lg"
          >
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
          {duration}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-800 leading-tight">
          {title}
        </h3>
        {category && (
          <p className="text-xs text-gray-500 mt-1">{category}</p>
        )}
      </div>
    </div>
  );
}
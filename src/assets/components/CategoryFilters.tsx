import { Button } from './button';

const categories = [
  { id: 'adventure', name: 'AVENTURA', color: 'bg-green-400', icon: '🏃' },
  { id: 'princesses', name: 'PRINCESAS', color: 'bg-pink-400', icon: '👸' },
  { id: 'dinosaurs', name: 'DINOSSAUROS', color: 'bg-cyan-400', icon: '🦕' },
  { id: 'superheroes', name: 'SUPER HERÓIS', color: 'bg-gray-600', icon: '🦸' },
];

export function CategoryFilter() {
  return (
    <div className="flex items-center justify-between px-4 py-6 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-blue-200 rounded-2xl p-4 max-w-md">
        <h2 className="text-lg font-bold text-blue-900 mb-1">LEGAL!</h2>
        <p className="text-blue-800">O QUE VAMOS ASSISTIR HOJE?</p>
      </div>

      <div className="flex gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            className={`${category.color} hover:opacity-90 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center gap-1 shadow-lg text-xs font-bold`}
            variant="default"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-center leading-tight">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
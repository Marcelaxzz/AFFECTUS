import { VideoCard } from './VideoCard';

const videos = [
  {
    id: 1,
    title: "A SUPER PATRULHA - O MISTÉRIO DO FUTEBOL",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1540692482525-5a161fce26c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBjYXJ0b29ufGVufDF8fHx8MTc1ODczNzI4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Super Heróis"
  },
  {
    id: 2,
    title: "BOB ESPONJA E HORA DE AVENTURA",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1631582053308-40f482e7ace5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNhcnRvb24lMjBhbmltYXRpb258ZW58MXx8fHwxNzU4NzM3MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  },
  {
    id: 3,
    title: "AS MENINAS SUPERPODEROSAS",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1570105381636-78bee6ec04c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmluY2VzcyUyMGZhaXJ5JTIwdGFsZXxlbnwxfHx8fDE3NTg3MzcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Super Heróis"
  },
  {
    id: 4,
    title: "PJ MASKS A HORA DA AVENTURA",
    duration: "18 min",
    thumbnail: "https://images.unsplash.com/photo-1751879182496-375a0a5a2e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwYWR2ZW50dXJlJTIwY2FydG9vbnxlbnwxfHx8fDE3NTg3MzcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  },
  {
    id: 5,
    title: "MUNDO DOS TUBARÕES",
    duration: "12 min",
    thumbnail: "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGFkdmVudHVyZSUyMGNhcnRvb258ZW58MXx8fHwxNzU4NzM3Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  },
  {
    id: 6,
    title: "MILHARES DO FUTURO: HABITANTES DO ESPAÇO",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGFkdmVudHVyZSUyMGNhcnRvb258ZW58MXx8fHwxNzU4NzM3Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  },
  {
    id: 7,
    title: "PEPPA PIG, GEORGE JOGANDO FUTEBOL",
    duration: "8 min",
    thumbnail: "https://images.unsplash.com/photo-1631582053308-40f482e7ace5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNhcnRvb24lMjBhbmltYXRpb258ZW58MXx8fHwxNzU4NzM3MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  },
  {
    id: 8,
    title: "O NOVO FANTASMA DA ESCOLA",
    duration: "22 min",
    thumbnail: "https://images.unsplash.com/photo-1623613253211-33c63f1e3867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5vc2F1ciUyMGNhcnRvb24lMjBraWRzfGVufDF8fHx8MTc1ODczNzI4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Dinossauros"
  },
  {
    id: 9,
    title: "HORA DE AVENTURA",
    duration: "16 min",
    thumbnail: "https://images.unsplash.com/photo-1751879182496-375a0a5a2e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwYWR2ZW50dXJlJTIwY2FydG9vbnxlbnwxfHx8fDE3NTg3MzcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  },
  {
    id: 10,
    title: "SHOW DA LUNA A DANÇA LEGAL",
    duration: "14 min",
    thumbnail: "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGFkdmVudHVyZSUyMGNhcnRvb258ZW58MXx8fHwxNzU4NzM3Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Aventura"
  }
];

export function VideoGrid() {
  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            duration={video.duration}
            thumbnail={video.thumbnail}
            category={video.category}
          />
        ))}
      </div>
    </div>
  );
}
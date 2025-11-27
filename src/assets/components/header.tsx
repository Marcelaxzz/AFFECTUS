import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import exampleImage from 'figma:asset/502c91f75abdca2600cc907f86b86f6cf261e15d.png';

export function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <img 
              src={exampleImage}
              alt="Affectus Mascot"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">AFFECTUS</h1>
            <p className="text-xs text-gray-600">SORRISOS SÃO ABRAÇOS DA ALMA</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm min-w-[300px]">
        <span className="text-gray-600 text-sm">FILTRO</span>
        <div className="w-px h-4 bg-gray-300"></div>
        <Input 
          placeholder="PESQUISAR"
          className="border-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400"
        />
        <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
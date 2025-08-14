import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { starWarsApi, type StarWarsPerson } from '../../services/external-apis/starwars-api';

// Simple inline card components for now
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-white dark:bg-gray-800 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export const StarWarsCharacterWidget: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: character, isLoading, error, refetch } = useQuery({
    queryKey: ['starwars-character', refreshKey],
    queryFn: () => starWarsApi.getRandomCharacter(),
    staleTime: 30000, // 30 seconds
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const getCharacterIcon = (character: StarWarsPerson) => {
    const name = character.name.toLowerCase();
    if (name.includes('skywalker')) return '⭐';
    if (name.includes('vader') || name.includes('sidious')) return '⚡';
    if (name.includes('yoda')) return '🧘';
    if (name.includes('solo')) return '🚀';
    if (name.includes('leia')) return '👑';
    if (name.includes('obi-wan') || name.includes('kenobi')) return '🗡️';
    if (name.includes('droid') || name.includes('c-3po') || name.includes('r2-d2')) return '🤖';
    if (name.includes('chewbacca')) return '🐻';
    return '👤';
  };

  const getBirthYearDisplay = (birthYear: string) => {
    if (birthYear === 'unknown') return 'Unknown Era';
    return birthYear;
  };

  const getGenderDisplay = (gender: string) => {
    const genderMap: Record<string, string> = {
      'male': '♂️ Male',
      'female': '♀️ Female',
      'n/a': '🤖 Droid',
      'hermaphrodite': '⚧ Hermaphrodite',
    };
    return genderMap[gender] || gender;
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/20 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              ⭐
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">Star Wars</h3>
              <p className="text-sm text-gray-300">Random Character</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
            title="Get new character"
          >
            <svg 
              className={`w-5 h-5 text-yellow-400 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 text-sm">Failed to load character</div>
            <button 
              onClick={handleRefresh}
              className="mt-2 text-yellow-400 hover:text-yellow-300 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}

        {character && !isLoading && (
          <div className="space-y-4">
            {/* Character Name and Icon */}
            <div className="text-center">
              <div className="text-4xl mb-2">{getCharacterIcon(character)}</div>
              <h4 className="text-xl font-bold text-yellow-400 mb-1">{character.name}</h4>
              <p className="text-sm text-gray-300">A long time ago in a galaxy far, far away...</p>
            </div>

            {/* Character Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-lg p-3 border border-yellow-500/20">
                <div className="text-yellow-400 text-sm font-medium">Birth Year</div>
                <div className="text-white font-semibold">{getBirthYearDisplay(character.birth_year)}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 border border-purple-500/20">
                <div className="text-purple-400 text-sm font-medium">Gender</div>
                <div className="text-white font-semibold">{getGenderDisplay(character.gender)}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 border border-blue-500/20">
                <div className="text-blue-400 text-sm font-medium">Height</div>
                <div className="text-white font-semibold">{character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 border border-green-500/20">
                <div className="text-green-400 text-sm font-medium">Mass</div>
                <div className="text-white font-semibold">{character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}</div>
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
              <h5 className="text-purple-300 font-medium mb-3 flex items-center gap-2">
                <span>👁️</span> Physical Attributes
              </h5>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-gray-400">Eyes</div>
                  <div className="text-white capitalize">{character.eye_color}</div>
                </div>
                <div>
                  <div className="text-gray-400">Hair</div>
                  <div className="text-white capitalize">{character.hair_color}</div>
                </div>
                <div>
                  <div className="text-gray-400">Skin</div>
                  <div className="text-white capitalize">{character.skin_color}</div>
                </div>
              </div>
            </div>

            {/* Movies Count */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2">
                <span className="text-yellow-400">🎬</span>
                <span className="text-sm text-white">
                  Appeared in <span className="font-bold text-yellow-400">{character.films.length}</span> film{character.films.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StarWarsCharacterWidget;

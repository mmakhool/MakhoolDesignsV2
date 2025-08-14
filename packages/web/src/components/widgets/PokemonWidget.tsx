import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { pokemonApi } from '../../services/external-apis/pokemon-api';

// Simple inline card components for consistency
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

export const PokemonWidget: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['pokemon', refreshKey],
    queryFn: () => pokemonApi.getRandomPokemonWithDetails(),
    staleTime: 30000, // 30 seconds
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const getTypeIcon = (type: string) => {
    const typeIcons: Record<string, string> = {
      normal: '⚪',
      fighting: '👊',
      flying: '🦅',
      poison: '☠️',
      ground: '🌍',
      rock: '🪨',
      bug: '🐛',
      ghost: '👻',
      steel: '⚙️',
      fire: '🔥',
      water: '💧',
      grass: '🌿',
      electric: '⚡',
      psychic: '🔮',
      ice: '❄️',
      dragon: '🐲',
      dark: '🌙',
      fairy: '🧚',
    };
    return typeIcons[type] || '❓';
  };

  const getStatColor = (statValue: number) => {
    if (statValue >= 120) return 'text-red-400';
    if (statValue >= 100) return 'text-orange-400';
    if (statValue >= 80) return 'text-yellow-400';
    if (statValue >= 60) return 'text-green-400';
    return 'text-blue-400';
  };

  const getStatBarColor = (statValue: number) => {
    if (statValue >= 120) return 'bg-red-500';
    if (statValue >= 100) return 'bg-orange-500';
    if (statValue >= 80) return 'bg-yellow-500';
    if (statValue >= 60) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const pokemon = data?.pokemon;
  const species = data?.species;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 border-red-500/20 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='20' cy='5' r='1'/%3E%3Ccircle cx='20' cy='35' r='1'/%3E%3Ccircle cx='5' cy='20' r='1'/%3E%3Ccircle cx='35' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              🎮
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-300">Pokémon</h3>
              <p className="text-sm text-gray-300">Random Encounter</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
            title="Catch new Pokémon"
          >
            <svg 
              className={`w-5 h-5 text-red-400 ${isLoading ? 'animate-spin' : ''}`} 
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
              <div className="w-4 h-4 bg-red-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-red-400 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-4 h-4 bg-red-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 mb-4">⚠️ Pokémon escaped!</div>
            <p className="text-sm text-gray-400 mb-4">
              Failed to catch a wild Pokémon
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {pokemon && species && (
          <div className="space-y-6">
            {/* Pokemon Header with Image */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = pokemon.sprites.front_default;
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold">
                  #{pokemon.id}
                </div>
              </div>
              <div className="text-2xl font-bold text-red-300 mb-1">
                {pokemonApi.formatPokemonName(pokemon.name)}
              </div>
              <div className="text-sm text-gray-300 leading-relaxed">
                {pokemonApi.getPokemonDescription(species)}
              </div>
            </div>

            {/* Types */}
            <div className="flex justify-center gap-2">
              {pokemon.types.map((typeInfo) => (
                <div
                  key={typeInfo.type.name}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: pokemonApi.getTypeColor(typeInfo.type.name) + '40',
                    border: `1px solid ${pokemonApi.getTypeColor(typeInfo.type.name)}80`
                  }}
                >
                  <span>{getTypeIcon(typeInfo.type.name)}</span>
                  <span className="capitalize">{typeInfo.type.name}</span>
                </div>
              ))}
            </div>

            {/* Physical Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Height</div>
                <div className="text-2xl font-bold text-red-400">
                  {(pokemon.height / 10).toFixed(1)}m
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Weight</div>
                <div className="text-2xl font-bold text-red-400">
                  {(pokemon.weight / 10).toFixed(1)}kg
                </div>
              </div>
            </div>

            {/* Base Stats */}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Base Stats</div>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{pokemonApi.getStatName(stat.stat.name)}</span>
                    <span className={`font-bold ${getStatColor(stat.base_stat)}`}>
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${getStatBarColor(stat.base_stat)}`}
                      style={{ width: `${Math.min((stat.base_stat / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Abilities */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Abilities</div>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((abilityInfo) => (
                  <div
                    key={abilityInfo.ability.name}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      abilityInfo.is_hidden 
                        ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' 
                        : 'bg-blue-600/30 border border-blue-500/50 text-blue-300'
                    }`}
                  >
                    {abilityInfo.is_hidden && '✨ '}
                    {pokemonApi.formatPokemonName(abilityInfo.ability.name)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

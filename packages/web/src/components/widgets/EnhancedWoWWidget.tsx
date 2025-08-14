import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { CharacterSearchResult, WoWCharacter } from '../../services/external-apis/wow-api';
import { wowApi } from '../../services/external-apis/wow-api';

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

type ViewMode = 'myCharacters' | 'search' | 'random' | 'guilds';

export const EnhancedWoWWidget: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('myCharacters');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<WoWCharacter | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Query for Mick's characters
  const mickCharactersQuery = useQuery({
    queryKey: ['mickCharacters'],
    queryFn: () => wowApi.getMickCharacters(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for character search
  const searchQuery_ = useQuery({
    queryKey: ['searchCharacters', searchQuery],
    queryFn: () => searchQuery.trim() ? wowApi.searchCharacters(searchQuery) : Promise.resolve([]),
    enabled: viewMode === 'search' && searchQuery.trim().length > 0,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Query for random character
  const randomCharacterQuery = useQuery({
    queryKey: ['randomCharacter', refreshKey],
    queryFn: () => wowApi.getRandomCharacter(),
    enabled: viewMode === 'random',
    staleTime: 30 * 1000,
  });

  // Query for guilds
  const guildsQuery = useQuery({
    queryKey: ['mickGuilds'],
    queryFn: () => wowApi.getMickGuilds(),
    enabled: viewMode === 'guilds',
    staleTime: 5 * 60 * 1000,
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    if (viewMode === 'myCharacters') {
      mickCharactersQuery.refetch();
    } else if (viewMode === 'search') {
      searchQuery_.refetch();
    } else if (viewMode === 'random') {
      randomCharacterQuery.refetch();
    } else if (viewMode === 'guilds') {
      guildsQuery.refetch();
    }
  };

  const getClassColor = (className: string) => {
    const classColors: Record<string, string> = {
      'Death Knight': '#C41E3A',
      'Demon Hunter': '#A330C9',
      'Druid': '#FF7C0A',
      'Evoker': '#33937F',
      'Hunter': '#AAD372',
      'Mage': '#3FC7EB',
      'Monk': '#00FF98',
      'Paladin': '#F48CBA',
      'Priest': '#FFFFFF',
      'Rogue': '#FFF468',
      'Shaman': '#0070DD',
      'Warlock': '#8788EE',
      'Warrior': '#C69B6D',
    };
    return classColors[className] || '#FFFFFF';
  };

  const getFactionIcon = (faction: 'Alliance' | 'Horde') => {
    return faction === 'Alliance' ? '🛡️' : '⚔️';
  };

  const renderCharacterCard = (character: WoWCharacter) => (
    <div
      key={character.id}
      className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedCharacter(character)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getClassColor(character.class) }}
        ></div>
        <div>
          <h4 className="font-bold text-amber-300">{character.name}</h4>
          <p className="text-xs text-gray-400">{character.realm}</p>
        </div>
        <div className="ml-auto text-lg">
          {getFactionIcon(character.faction)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">Level:</span>
          <span className="ml-1 text-amber-300 font-medium">{character.level}</span>
        </div>
        <div>
          <span className="text-gray-400">iLvl:</span>
          <span className="ml-1 text-amber-300 font-medium">{character.itemLevel}</span>
        </div>
        <div>
          <span className="text-gray-400">Class:</span>
          <span className="ml-1 text-amber-300 font-medium">{character.class}</span>
        </div>
        <div>
          <span className="text-gray-400">Race:</span>
          <span className="ml-1 text-amber-300 font-medium">{character.race}</span>
        </div>
      </div>

      {character.guild && (
        <div className="mt-2 pt-2 border-t border-amber-500/20">
          <div className="text-xs">
            <span className="text-gray-400">Guild:</span>
            <span className="ml-1 text-amber-300 font-medium">{character.guild.name}</span>
            <span className="ml-2 text-gray-500">({character.guild.rank})</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderSearchResults = (results: CharacterSearchResult[]) => (
    <div className="space-y-2">
      {results.map((result, index) => (
        <div
          key={`${result.name}-${result.realm}-${index}`}
          className="bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-amber-300">{result.name}</span>
              <span className="ml-2 text-gray-400 text-sm">({result.realm})</span>
            </div>
            <div className="text-sm text-gray-300">
              Lv {result.level} {result.race} {result.class}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Last seen: {result.lastLogin}
          </div>
        </div>
      ))}
    </div>
  );

  const isLoading = 
    (viewMode === 'myCharacters' && mickCharactersQuery.isLoading) ||
    (viewMode === 'search' && searchQuery_.isLoading) ||
    (viewMode === 'random' && randomCharacterQuery.isLoading) ||
    (viewMode === 'guilds' && guildsQuery.isLoading);

  const error = 
    mickCharactersQuery.error || 
    searchQuery_.error || 
    randomCharacterQuery.error || 
    guildsQuery.error;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 border-amber-500/20 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30z'/%3E%3Cpath d='M30 30l-15-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              ⚔️
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300">WoW Armory</h3>
              <p className="text-sm text-gray-300">{wowApi.getBattleTag()}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
            title="Refresh data"
          >
            <svg 
              className={`w-5 h-5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </CardTitle>

        {/* Mode Selection Tabs */}
        <div className="flex gap-1 mt-4">
          {[
            { key: 'myCharacters', label: 'My Characters', icon: '👤' },
            { key: 'search', label: 'Search', icon: '🔍' },
            { key: 'random', label: 'Random', icon: '🎲' },
            { key: 'guilds', label: 'Guilds', icon: '🏰' },
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key as ViewMode)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-300 flex items-center gap-1 ${
                viewMode === mode.key
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-black/30 text-amber-300 hover:bg-black/50'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* Search Input */}
        {viewMode === 'search' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search characters by name, realm, or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/60 text-sm"
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-amber-400 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-4 h-4 bg-amber-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 mb-4">⚠️ Failed to load data</div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content based on view mode */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {/* My Characters View */}
            {viewMode === 'myCharacters' && mickCharactersQuery.data && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-amber-300 mb-3">
                  Your Characters ({mickCharactersQuery.data.length})
                </div>
                {mickCharactersQuery.data.map(character => renderCharacterCard(character))}
              </div>
            )}

            {/* Search Results View */}
            {viewMode === 'search' && (
              <div className="space-y-3">
                {searchQuery.trim() && searchQuery_.data && (
                  <>
                    <div className="text-sm font-medium text-amber-300 mb-3">
                      Search Results ({searchQuery_.data.length})
                    </div>
                    {searchQuery_.data.length > 0 ? (
                      renderSearchResults(searchQuery_.data)
                    ) : (
                      <div className="text-center py-4 text-gray-400">
                        No characters found for "{searchQuery}"
                      </div>
                    )}
                  </>
                )}
                {!searchQuery.trim() && (
                  <div className="text-center py-4 text-gray-400">
                    Enter a character name, realm, or class to search
                  </div>
                )}
              </div>
            )}

            {/* Random Character View */}
            {viewMode === 'random' && randomCharacterQuery.data && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-amber-300 mb-3">
                  Random Character Discovery
                </div>
                {renderCharacterCard(randomCharacterQuery.data)}
              </div>
            )}

            {/* Guilds View */}
            {viewMode === 'guilds' && guildsQuery.data && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-amber-300 mb-3">
                  Your Guilds ({guildsQuery.data.length})
                </div>
                {guildsQuery.data.map((guild, index) => (
                  <div
                    key={`${guild.name}-${guild.realm}-${index}`}
                    className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-amber-500/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getFactionIcon(guild.faction)}</span>
                        <div>
                          <h4 className="font-bold text-amber-300">{guild.name}</h4>
                          <p className="text-xs text-gray-400">{guild.realm}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-amber-300">Level {guild.level}</div>
                        <div className="text-xs text-gray-400">{guild.memberCount} members</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-2">
                      🏆 {guild.achievementPoints.toLocaleString()} Achievement Points
                    </div>
                    
                    {guild.description && (
                      <div className="text-xs text-gray-400 italic">
                        "{guild.description}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Character Detail Modal (when character is selected) */}
        {selectedCharacter && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <div 
              className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-lg p-6 max-w-md w-full border border-amber-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-300">{selectedCharacter.name}</h3>
                  <p className="text-gray-300">{selectedCharacter.realm}</p>
                </div>
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400 uppercase">Level</div>
                    <div className="text-2xl font-bold text-amber-400">{selectedCharacter.level}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400 uppercase">Item Level</div>
                    <div className="text-2xl font-bold text-amber-400">{selectedCharacter.itemLevel}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getClassColor(selectedCharacter.class) }}
                  ></div>
                  <span className="text-white">
                    {selectedCharacter.race} {selectedCharacter.class}
                  </span>
                  <span className="ml-auto text-lg">
                    {getFactionIcon(selectedCharacter.faction)}
                  </span>
                </div>

                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400 uppercase mb-1">Achievement Points</div>
                  <div className="text-lg font-bold text-amber-400">
                    🏆 {selectedCharacter.achievementPoints.toLocaleString()}
                  </div>
                </div>

                {selectedCharacter.guild && (
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400 uppercase mb-1">Guild</div>
                    <div className="text-white font-medium">{selectedCharacter.guild.name}</div>
                    <div className="text-sm text-gray-300">{selectedCharacter.guild.rank}</div>
                  </div>
                )}

                <div className="text-xs text-gray-400">
                  Last seen: {selectedCharacter.lastLogin}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
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

export const WoWCharacterWidget: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Generate a random character using available API methods
  const generateRandomCharacter = async () => {
    const [characterClass, race, realm] = await Promise.all([
      wowApi.getRandomClass(),
      wowApi.getRaces().then(races => races[Math.floor(Math.random() * races.length)]),
      wowApi.getRandomRealm()
    ]);

    // Generate random character details
    const characterNames = [
      'Thrall', 'Jaina', 'Arthas', 'Sylvanas', 'Tyrande', 'Malfurion',
      'Varian', 'Anduin', 'Garrosh', 'Vol\'jin', 'Baine', 'Genn',
      'Alleria', 'Turalyon', 'Khadgar', 'Medivh', 'Illidan', 'Maiev'
    ];

    const name = characterNames[Math.floor(Math.random() * characterNames.length)];
    const level = Math.floor(Math.random() * 80) + 1; // Level 1-80
    const achievementPoints = Math.floor(Math.random() * 25000) + 500;
    const guilds = ['The Eternal Order', 'Dragons of Teldrassil', 'Guardians of Azeroth', 'Horde Elite', 'Alliance Heroes', null];
    const guild = guilds[Math.floor(Math.random() * guilds.length)];

    return {
      name,
      character_class: characterClass.name,
      race: race.name,
      faction: race.faction,
      realm: realm.name,
      level,
      guild,
      achievement_points: achievementPoints
    };
  };

  const { data: character, isLoading, error, refetch } = useQuery({
    queryKey: ['wow-character', refreshKey],
    queryFn: generateRandomCharacter,
    staleTime: 30000, // 30 seconds
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const getClassIcon = (characterClass: string) => {
    const classIcons: Record<string, string> = {
      'warrior': '⚔️',
      'paladin': '🛡️',
      'hunter': '🏹',
      'rogue': '🗡️',
      'priest': '✨',
      'death knight': '💀',
      'shaman': '⚡',
      'mage': '🔮',
      'warlock': '🌙',
      'monk': '🥋',
      'druid': '🌿',
      'demon hunter': '😈',
      'evoker': '🐉',
    };
    return classIcons[characterClass?.toLowerCase()] || '👤';
  };

  const getRaceIcon = (race: string) => {
    const raceIcons: Record<string, string> = {
      'human': '👨',
      'dwarf': '👨‍🦲',
      'night elf': '🧝‍♀️',
      'gnome': '👨‍💼',
      'draenei': '👽',
      'worgen': '🐺',
      'pandaren': '🐼',
      'void elf': '🌌',
      'lightforged draenei': '✨',
      'dark iron dwarf': '⚒️',
      'kul tiran': '⛵',
      'mechagnome': '🤖',
      'orc': '👹',
      'undead': '💀',
      'tauren': '🐂',
      'troll': '🧙‍♂️',
      'blood elf': '🧝‍♂️',
      'goblin': '👺',
      'nightborne': '🌙',
      'highmountain tauren': '🏔️',
      'mag\'har orc': '⛰️',
      'zandalari troll': '🏺',
      'vulpera': '🦊',
    };
    return raceIcons[race?.toLowerCase()] || '👤';
  };

  const getFactionColor = (faction: string) => {
    return faction?.toLowerCase() === 'alliance' ? 'text-blue-400' : 'text-red-400';
  };

  const getFactionIcon = (faction: string) => {
    return faction?.toLowerCase() === 'alliance' ? '🔵' : '🔴';
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-800 border-yellow-500/20 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0L0 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              🏆
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">WoW Armory</h3>
              <p className="text-sm text-gray-300">Character Profile</p>
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
            <div className="text-red-400 mb-4">⚠️ Failed to load character</div>
            <p className="text-sm text-gray-400 mb-4">
              Battle.net API requires authentication
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {character && (
          <div className="space-y-6">
            {/* Character Header */}
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {character.name}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <span>{getFactionIcon(character.faction)}</span>
                <span className={getFactionColor(character.faction)}>
                  {character.faction}
                </span>
                <span>•</span>
                <span>{character.realm}</span>
              </div>
            </div>

            {/* Character Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Class</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getClassIcon(character.character_class)}</span>
                  <span className="text-yellow-400 font-medium">{character.character_class}</span>
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Race</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getRaceIcon(character.race)}</span>
                  <span className="text-yellow-400 font-medium">{character.race}</span>
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Level</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {character.level || '??'}
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Guild</div>
                <div className="text-yellow-400 font-medium">
                  {character.guild || 'None'}
                </div>
              </div>
            </div>

            {/* Achievement Points */}
            {character.achievement_points && (
              <div className="text-center bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Achievement Points</div>
                <div className="text-3xl font-bold text-yellow-400">
                  {character.achievement_points.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo Mode Message */}
        {!character && !isLoading && !error && (
          <div className="text-center py-8">
            <div className="text-yellow-400 mb-4">🏆 Demo Character</div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">Thrall</div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                  <span>🔴</span>
                  <span className="text-red-400">Horde</span>
                  <span>•</span>
                  <span>Durotan</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Class</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-yellow-400 font-medium">Shaman</span>
                  </div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Race</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👹</span>
                    <span className="text-yellow-400 font-medium">Orc</span>
                  </div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Level</div>
                  <div className="text-2xl font-bold text-yellow-400">80</div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Guild</div>
                  <div className="text-yellow-400 font-medium">Earthen Ring</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

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

type FilterType = 'all' | 'PvE' | 'PvP' | 'RP' | 'RP-PvP';
type PopulationFilter = 'all' | 'Low' | 'Medium' | 'High' | 'Full';

interface RealmExtended {
  name: string;
  status: string;
  population: string;
  type: string;
  region: string;
  timezone: string;
}

export const EnhancedServerStatusWidget: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [populationFilter, setPopulationFilter] = useState<PopulationFilter>('all');
  const [selectedRealm, setSelectedRealm] = useState<RealmExtended | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: realms, isLoading, error, refetch } = useQuery({
    queryKey: ['realms', typeFilter, populationFilter, refreshKey],
    queryFn: async () => {
      const filters: { type?: string; population?: string } = {};
      if (typeFilter !== 'all') filters.type = typeFilter;
      if (populationFilter !== 'all') filters.population = populationFilter;
      return wowApi.getRealms(filters);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const { data: stats } = useQuery({
    queryKey: ['wowStats'],
    queryFn: () => wowApi.getStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const getPopulationColor = (population: string) => {
    switch (population) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Full': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPopulationIcon = (population: string) => {
    switch (population) {
      case 'Low': return '🟢';
      case 'Medium': return '🟡';
      case 'High': return '🟠';
      case 'Full': return '🔴';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PvE': return '🛡️';
      case 'PvP': return '⚔️';
      case 'RP': return '📚';
      case 'RP-PvP': return '⚔️📚';
      default: return '🌍';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Online' ? 'text-green-400' : 'text-red-400';
  };

  const getMickCharacterRealms = () => {
    return ['Stormrage', 'Area-52', 'Mal\'Ganis'];
  };

  const filteredRealms = realms || [];
  const mickRealms = getMickCharacterRealms();

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 border-blue-500/20 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='10' cy='30' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              🌍
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">Server Status</h3>
              <p className="text-sm text-gray-300">Realm Information</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
            title="Refresh server status"
          >
            <svg 
              className={`w-5 h-5 text-blue-400 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </CardTitle>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex gap-1">
            {(['all', 'PvE', 'PvP', 'RP', 'RP-PvP'] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-2 py-1 text-xs rounded-full transition-all duration-300 ${
                  typeFilter === type
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-black/30 text-blue-300 hover:bg-black/50'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(['all', 'Low', 'Medium', 'High', 'Full'] as PopulationFilter[]).map((pop) => (
              <button
                key={pop}
                onClick={() => setPopulationFilter(pop)}
                className={`px-2 py-1 text-xs rounded-full transition-all duration-300 ${
                  populationFilter === pop
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-black/30 text-indigo-300 hover:bg-black/50'
                }`}
              >
                {pop === 'all' ? 'All Pops' : pop}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 uppercase">Total Realms</div>
              <div className="text-lg font-bold text-blue-400">{stats.totalRealms}</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 uppercase">Active Players</div>
              <div className="text-lg font-bold text-blue-400">{stats.activePlayerCount}</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 mb-4">⚠️ Failed to load server data</div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Realm List */}
        {!isLoading && !error && filteredRealms.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {/* Mick's Character Realms First */}
            {filteredRealms
              .filter(realm => mickRealms.includes(realm.name))
              .map((realm) => (
                <div
                  key={realm.name}
                  className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-3 border border-amber-500/30 cursor-pointer hover:border-amber-400/50 transition-all duration-300"
                  onClick={() => setSelectedRealm(realm)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-300">⭐</span>
                      <div>
                        <div className="font-medium text-amber-200">{realm.name}</div>
                        <div className="text-xs text-gray-400">{realm.region} - {realm.timezone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{getTypeIcon(realm.type)}</span>
                      <span className={`text-xs font-medium ${getPopulationColor(realm.population)}`}>
                        {getPopulationIcon(realm.population)} {realm.population}
                      </span>
                      <span className={`text-xs ${getStatusColor(realm.status)}`}>
                        {realm.status === 'Online' ? '🟢' : '🔴'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {/* Other Realms */}
            {filteredRealms
              .filter(realm => !mickRealms.includes(realm.name))
              .map((realm) => (
                <div
                  key={realm.name}
                  className="bg-black/20 rounded-lg p-3 border border-blue-500/20 cursor-pointer hover:border-blue-400/40 transition-all duration-300"
                  onClick={() => setSelectedRealm(realm)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-blue-200">{realm.name}</div>
                      <div className="text-xs text-gray-400">{realm.region} - {realm.timezone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{getTypeIcon(realm.type)}</span>
                      <span className={`text-xs font-medium ${getPopulationColor(realm.population)}`}>
                        {getPopulationIcon(realm.population)} {realm.population}
                      </span>
                      <span className={`text-xs ${getStatusColor(realm.status)}`}>
                        {realm.status === 'Online' ? '🟢' : '🔴'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && filteredRealms.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No realms found matching the selected filters
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-blue-500/20">
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <span className="text-amber-300">⭐</span>
              <span>Your Realms</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🛡️</span>
              <span>PvE</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⚔️</span>
              <span>PvP</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📚</span>
              <span>RP</span>
            </div>
          </div>
        </div>

        {/* Realm Detail Modal */}
        {selectedRealm && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRealm(null)}
          >
            <div 
              className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg p-6 max-w-md w-full border border-blue-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-300 flex items-center gap-2">
                    {mickRealms.includes(selectedRealm.name) && <span className="text-amber-300">⭐</span>}
                    {selectedRealm.name}
                  </h3>
                  <p className="text-gray-300">{selectedRealm.region} Region</p>
                </div>
                <button
                  onClick={() => setSelectedRealm(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400 uppercase">Status</div>
                    <div className={`text-lg font-bold flex items-center gap-2 ${getStatusColor(selectedRealm.status)}`}>
                      {selectedRealm.status === 'Online' ? '🟢' : '🔴'}
                      {selectedRealm.status}
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400 uppercase">Population</div>
                    <div className={`text-lg font-bold flex items-center gap-2 ${getPopulationColor(selectedRealm.population)}`}>
                      {getPopulationIcon(selectedRealm.population)}
                      {selectedRealm.population}
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400 uppercase mb-2">Server Type</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(selectedRealm.type)}</span>
                    <div>
                      <div className="text-white font-medium">{selectedRealm.type}</div>
                      <div className="text-xs text-gray-400">
                        {selectedRealm.type === 'PvE' && 'Player vs Environment - No PvP'}
                        {selectedRealm.type === 'PvP' && 'Player vs Player - Open PvP'}
                        {selectedRealm.type === 'RP' && 'Role Playing - Immersive gameplay'}
                        {selectedRealm.type === 'RP-PvP' && 'Role Playing PvP - RP with open PvP'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400 uppercase mb-1">Timezone</div>
                  <div className="text-white">{selectedRealm.timezone}</div>
                </div>

                {mickRealms.includes(selectedRealm.name) && (
                  <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-3 border border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-300">
                      <span>⭐</span>
                      <span className="font-medium">You have characters on this realm!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

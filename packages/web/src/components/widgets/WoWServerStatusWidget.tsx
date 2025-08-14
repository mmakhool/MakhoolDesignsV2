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

export const WoWServerStatusWidget: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: realms, isLoading, error, refetch } = useQuery({
    queryKey: ['wow-realms', refreshKey],
    queryFn: () => wowApi.getRealms(),
    staleTime: 60000, // 1 minute
  });

  const { data: stats } = useQuery({
    queryKey: ['wow-stats'],
    queryFn: () => wowApi.getStats(),
    staleTime: 300000, // 5 minutes
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const getPopulationColor = (population: string) => {
    switch (population.toLowerCase()) {
      case 'full': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPopulationIcon = (population: string) => {
    switch (population.toLowerCase()) {
      case 'full': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pvp': return '⚔️';
      case 'pve': return '🛡️';
      case 'rp': return '📜';
      case 'rppvp': return '📜⚔️';
      default: return '🌍';
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 border-blue-500/20 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='20,1 40,20 20,39 1,20'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              🌍
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">World of Warcraft</h3>
              <p className="text-sm text-gray-300">Server Status</p>
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
      </CardHeader>

      <CardContent className="relative">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 text-sm">Failed to load server status</div>
            <button 
              onClick={handleRefresh}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}

        {realms && !isLoading && (
          <div className="space-y-4">
            {/* Server List */}
            <div className="space-y-2">
              {realms.map((realm, index) => (
                <div 
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{getTypeIcon(realm.type)}</span>
                        <span className="text-sm">{getPopulationIcon(realm.population)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-blue-300">{realm.name}</div>
                        <div className="text-xs text-gray-400">{realm.type.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getPopulationColor(realm.population)}`}>
                        {realm.population}
                      </div>
                      <div className="text-xs text-green-400">Online</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            {stats && (
              <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-4 border border-purple-500/20">
                <h5 className="text-purple-300 font-medium mb-3 flex items-center gap-2">
                  <span>📊</span> Global Statistics
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.activePlayerCount}</div>
                    <div className="text-xs text-gray-400">Active Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{stats.totalRealms}</div>
                    <div className="text-xs text-gray-400">Total Realms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{stats.currentExpansion}</div>
                    <div className="text-xs text-gray-400">Current Expansion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{stats.latestPatch}</div>
                    <div className="text-xs text-gray-400">Latest Patch</div>
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="bg-black/20 rounded-lg p-3 border border-gray-500/20">
              <h6 className="text-gray-300 text-sm font-medium mb-2">Population Legend</h6>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1">🔴 <span className="text-red-400">Full</span></span>
                <span className="flex items-center gap-1">🟠 <span className="text-orange-400">High</span></span>
                <span className="flex items-center gap-1">🟡 <span className="text-yellow-400">Medium</span></span>
                <span className="flex items-center gap-1">🟢 <span className="text-green-400">Low</span></span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WoWServerStatusWidget;

// World of Warcraft API Service
// Using Battle.net API for World of Warcraft
// Note: In production, you'd need proper OAuth setup with client credentials

export interface WoWRealm {
  id: number;
  region: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
  connected_realm?: {
    href: string;
  };
  name: string;
  category: string;
  locale: string;
  timezone: string;
  type: {
    type: string;
    name: string;
  };
  is_tournament: boolean;
  slug: string;
}

export interface WoWConnectedRealm {
  id: number;
  region: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
  realms: Array<{
    id: number;
    region: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    };
    name: string;
    category: string;
    locale: string;
    timezone: string;
    type: {
      type: string;
      name: string;
    };
    is_tournament: boolean;
    slug: string;
  }>;
  has_queue: boolean;
  status: {
    type: string;
    name: string;
  };
  population: {
    type: string;
    name: string;
  };
}

export interface WoWCharacterClass {
  key: {
    href: string;
  };
  name: string;
  id: number;
}

export interface WoWRace {
  key: {
    href: string;
  };
  name: string;
  id: number;
}

export interface WoWPlayableClass {
  id: number;
  name: string;
  gender_name: {
    male: string;
    female: string;
  };
  power_type: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
  specializations: Array<{
    key: {
      href: string;
    };
    name: string;
    id: number;
  }>;
  media: {
    key: {
      href: string;
    };
    id: number;
  };
  pvp_talent_slots: {
    href: string;
  };
}

export interface WoWPlayableRace {
  id: number;
  name: string;
  gender_name: {
    male: string;
    female: string;
  };
  faction: {
    type: string;
    name: string;
  };
  is_selectable: boolean;
  is_allied_race: boolean;
  playable_classes: WoWCharacterClass[];
  media: {
    key: {
      href: string;
    };
    id: number;
  };
}

// Enhanced Character Interface
export interface WoWCharacter {
  id: number;
  name: string;
  realm: string;
  class: string;
  race: string;
  level: number;
  faction: 'Alliance' | 'Horde';
  guild?: {
    name: string;
    realm: string;
    rank: string;
  };
  achievementPoints: number;
  itemLevel: number;
  spec: string;
  role: string;
  lastLogin: string;
  avatar?: string;
  thumbnail?: string;
}

// Guild Interface
export interface WoWGuild {
  name: string;
  realm: string;
  faction: 'Alliance' | 'Horde';
  level: number;
  memberCount: number;
  achievementPoints: number;
  description?: string;
  emblem?: {
    icon: number;
    iconColor: string;
    border: number;
    borderColor: string;
    backgroundColor: string;
  };
}

// Search Results Interface
export interface CharacterSearchResult {
  name: string;
  realm: string;
  class: string;
  race: string;
  level: number;
  faction: 'Alliance' | 'Horde';
  lastLogin: string;
}

// Enhanced Mock data service with your Battle.net integration
class WorldOfWarcraftApiService {
  private readonly BATTLE_TAG = 'Mick#11520';
  
  private readonly mockData = {
    // Your personalized characters based on Mick#11520
    mickCharacters: [
      {
        id: 1,
        name: 'Mickadin',
        realm: 'Stormrage',
        class: 'Paladin',
        race: 'Human',
        level: 80,
        faction: 'Alliance' as const,
        guild: {
          name: 'Knights of Honor',
          realm: 'Stormrage',
          rank: 'Guild Master'
        },
        achievementPoints: 15750,
        itemLevel: 486,
        spec: 'Protection',
        role: 'Tank',
        lastLogin: '2 hours ago',
        avatar: '/api/wow/character/avatar/mickadin-stormrage.jpg'
      },
      {
        id: 2,
        name: 'Mickage',
        realm: 'Stormrage',
        class: 'Mage',
        race: 'Human',
        level: 78,
        faction: 'Alliance' as const,
        guild: {
          name: 'Knights of Honor',
          realm: 'Stormrage',
          rank: 'Officer'
        },
        achievementPoints: 12240,
        itemLevel: 465,
        spec: 'Fire',
        role: 'DPS',
        lastLogin: '1 day ago'
      },
      {
        id: 3,
        name: 'Mickrogue',
        realm: 'Area-52',
        class: 'Rogue',
        race: 'Night Elf',
        level: 75,
        faction: 'Alliance' as const,
        achievementPoints: 8950,
        itemLevel: 445,
        spec: 'Assassination',
        role: 'DPS',
        lastLogin: '3 days ago'
      },
      {
        id: 4,
        name: 'Mickshaman',
        realm: 'Mal\'Ganis',
        class: 'Shaman',
        race: 'Orc',
        level: 73,
        faction: 'Horde' as const,
        guild: {
          name: 'Horde Elite',
          realm: 'Mal\'Ganis',
          rank: 'Member'
        },
        achievementPoints: 7650,
        itemLevel: 421,
        spec: 'Enhancement',
        role: 'DPS',
        lastLogin: '1 week ago'
      }
    ],
    guilds: [
      {
        name: 'Knights of Honor',
        realm: 'Stormrage',
        faction: 'Alliance' as const,
        level: 25,
        memberCount: 487,
        achievementPoints: 125600,
        description: 'Premier raiding guild on Stormrage. Active since 2008!'
      },
      {
        name: 'Horde Elite',
        realm: 'Mal\'Ganis',
        faction: 'Horde' as const,
        level: 22,
        memberCount: 312,
        achievementPoints: 89400,
        description: 'PvP focused guild with mythic+ progression'
      }
    ],
    realms: [
      { name: 'Stormrage', status: 'Online', population: 'High', type: 'PvE', region: 'US', timezone: 'EST' },
      { name: 'Area-52', status: 'Online', population: 'Full', type: 'PvE', region: 'US', timezone: 'EST' },
      { name: 'Tichondrius', status: 'Online', population: 'High', type: 'PvP', region: 'US', timezone: 'PST' },
      { name: 'Mal\'Ganis', status: 'Online', population: 'Full', type: 'PvP', region: 'US', timezone: 'CST' },
      { name: 'Illidan', status: 'Online', population: 'High', type: 'PvP', region: 'US', timezone: 'CST' },
      { name: 'Bleeding Hollow', status: 'Online', population: 'Medium', type: 'PvP', region: 'US', timezone: 'EST' },
      { name: 'Emerald Dream', status: 'Online', population: 'High', type: 'RP-PvP', region: 'US', timezone: 'CST' },
      { name: 'Moon Guard', status: 'Online', population: 'Full', type: 'RP', region: 'US', timezone: 'CST' },
    ],
    classes: [
      { name: 'Death Knight', color: '#C41E3A', role: 'Tank/DPS', icon: '⚔️' },
      { name: 'Demon Hunter', color: '#A330C9', role: 'Tank/DPS', icon: '👹' },
      { name: 'Druid', color: '#FF7C0A', role: 'Tank/Healer/DPS', icon: '🐻' },
      { name: 'Evoker', color: '#33937F', role: 'Healer/DPS', icon: '🐲' },
      { name: 'Hunter', color: '#AAD372', role: 'DPS', icon: '🏹' },
      { name: 'Mage', color: '#3FC7EB', role: 'DPS', icon: '🔮' },
      { name: 'Monk', color: '#00FF98', role: 'Tank/Healer/DPS', icon: '👊' },
      { name: 'Paladin', color: '#F48CBA', role: 'Tank/Healer/DPS', icon: '🛡️' },
      { name: 'Priest', color: '#FFFFFF', role: 'Healer/DPS', icon: '✨' },
      { name: 'Rogue', color: '#FFF468', role: 'DPS', icon: '🗡️' },
      { name: 'Shaman', color: '#0070DD', role: 'Healer/DPS', icon: '⚡' },
      { name: 'Warlock', color: '#8788EE', role: 'DPS', icon: '🔥' },
      { name: 'Warrior', color: '#C69B6D', role: 'Tank/DPS', icon: '⚔️' },
    ],
    races: [
      { name: 'Human', faction: 'Alliance', icon: '👤' },
      { name: 'Dwarf', faction: 'Alliance', icon: '🔨' },
      { name: 'Night Elf', faction: 'Alliance', icon: '🌙' },
      { name: 'Gnome', faction: 'Alliance', icon: '⚙️' },
      { name: 'Draenei', faction: 'Alliance', icon: '💎' },
      { name: 'Worgen', faction: 'Alliance', icon: '🐺' },
      { name: 'Void Elf', faction: 'Alliance', icon: '🌌' },
      { name: 'Lightforged Draenei', faction: 'Alliance', icon: '☀️' },
      { name: 'Orc', faction: 'Horde', icon: '👹' },
      { name: 'Undead', faction: 'Horde', icon: '💀' },
      { name: 'Tauren', faction: 'Horde', icon: '🐂' },
      { name: 'Troll', faction: 'Horde', icon: '🗿' },
      { name: 'Blood Elf', faction: 'Horde', icon: '🩸' },
      { name: 'Goblin', faction: 'Horde', icon: '💰' },
      { name: 'Nightborne', faction: 'Horde', icon: '🌟' },
      { name: 'Highmountain Tauren', faction: 'Horde', icon: '⛰️' },
    ],
    stats: {
      totalRealms: 246,
      totalGuilds: 125000,
      activePlayerCount: '2.8M',
      currentExpansion: 'Dragonflight',
      latestPatch: '10.2.7',
    }
  };

  async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get Mick's characters
  async getMickCharacters(): Promise<WoWCharacter[]> {
    await this.delay(800);
    return this.mockData.mickCharacters;
  }

  // Get specific character by name and realm
  async getCharacter(name: string, realm: string): Promise<WoWCharacter | null> {
    await this.delay(600);
    const character = this.mockData.mickCharacters.find(
      c => c.name.toLowerCase() === name.toLowerCase() && 
           c.realm.toLowerCase() === realm.toLowerCase()
    );
    return character || null;
  }

  // Search characters across all realms
  async searchCharacters(query: string): Promise<CharacterSearchResult[]> {
    await this.delay(700);
    const results: CharacterSearchResult[] = [];
    
    // Search Mick's characters
    this.mockData.mickCharacters.forEach(char => {
      if (char.name.toLowerCase().includes(query.toLowerCase()) ||
          char.realm.toLowerCase().includes(query.toLowerCase()) ||
          char.class.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          name: char.name,
          realm: char.realm,
          class: char.class,
          race: char.race,
          level: char.level,
          faction: char.faction,
          lastLogin: char.lastLogin
        });
      }
    });

    // Add some mock search results for demonstration
    if (query.toLowerCase().includes('mick') || query.toLowerCase().includes('test')) {
      results.push(
        {
          name: 'Mickwarrior',
          realm: 'Illidan',
          class: 'Warrior',
          race: 'Human',
          level: 70,
          faction: 'Alliance',
          lastLogin: '2 weeks ago'
        },
        {
          name: 'Mickpriest',
          realm: 'Tichondrius',
          class: 'Priest',
          race: 'Night Elf',
          level: 68,
          faction: 'Alliance',
          lastLogin: '1 month ago'
        }
      );
    }

    return results.slice(0, 10); // Limit to 10 results
  }

  // Get guild information
  async getGuild(name: string, realm: string): Promise<WoWGuild | null> {
    await this.delay(600);
    const guild = this.mockData.guilds.find(
      g => g.name.toLowerCase() === name.toLowerCase() && 
           g.realm.toLowerCase() === realm.toLowerCase()
    );
    return guild || null;
  }

  // Get all guilds for Mick's characters
  async getMickGuilds(): Promise<WoWGuild[]> {
    await this.delay(500);
    return this.mockData.guilds;
  }

  // Get realms with filtering
  async getRealms(filter?: { type?: string; population?: string; region?: string }): Promise<typeof this.mockData.realms> {
    await this.delay(500);
    let realms = [...this.mockData.realms];
    
    if (filter?.type) {
      realms = realms.filter(r => r.type === filter.type);
    }
    if (filter?.population) {
      realms = realms.filter(r => r.population === filter.population);
    }
    if (filter?.region) {
      realms = realms.filter(r => r.region === filter.region);
    }
    
    return realms;
  }

  async getClasses(): Promise<typeof this.mockData.classes> {
    await this.delay(300);
    return this.mockData.classes;
  }

  async getRaces(): Promise<typeof this.mockData.races> {
    await this.delay(300);
    return this.mockData.races;
  }

  async getStats(): Promise<typeof this.mockData.stats> {
    await this.delay(400);
    return this.mockData.stats;
  }

  async getRandomClass(): Promise<typeof this.mockData.classes[0]> {
    await this.delay(200);
    const classes = this.mockData.classes;
    return classes[Math.floor(Math.random() * classes.length)];
  }

  async getRandomRealm(): Promise<typeof this.mockData.realms[0]> {
    await this.delay(200);
    const realms = this.mockData.realms;
    return realms[Math.floor(Math.random() * realms.length)];
  }

  // Generate random character (existing method enhanced)
  async getRandomCharacter(): Promise<WoWCharacter> {
    await this.delay(400);
    const classes = this.mockData.classes;
    const races = this.mockData.races;
    const realms = this.mockData.realms;
    
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomRealm = realms[Math.floor(Math.random() * realms.length)];
    
    const names = ['Aragorn', 'Legolas', 'Gimli', 'Gandalf', 'Thorin', 'Elrond', 'Galadriel', 'Boromir'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    return {
      id: Math.floor(Math.random() * 1000000),
      name: randomName,
      realm: randomRealm.name,
      class: randomClass.name,
      race: randomRace.name,
      level: Math.floor(Math.random() * 10) + 70,
      faction: randomRace.faction as 'Alliance' | 'Horde',
      achievementPoints: Math.floor(Math.random() * 10000) + 5000,
      itemLevel: Math.floor(Math.random() * 50) + 400,
      spec: randomClass.role.split('/')[0],
      role: randomClass.role.split('/')[0],
      lastLogin: `${Math.floor(Math.random() * 7) + 1} days ago`
    };
  }

  // Get Battle.net tag
  getBattleTag(): string {
    return this.BATTLE_TAG;
  }
}

export const wowApi = new WorldOfWarcraftApiService();

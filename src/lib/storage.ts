import { Chant } from '../constants';

const STORAGE_KEYS = {
  USER_PROFILE: 'sanctuary_user_profile',
  HISTORY: 'sanctuary_history',
  GOALS: 'sanctuary_goals',
  PREFERENCES: 'sanctuary_preferences',
  LIBRARY: 'sanctuary_library'
};

export interface LocalUserProfile {
  displayName: string;
  streak: number;
  lastActive: string;
}

export interface LocalHistory {
  id: string;
  chantId: string;
  repetitions: number;
  timestamp: number;
}

export interface LocalGoal {
  date: string;
  completed: number;
  target: number;
}

export interface LocalPreferences {
  mantraAlarm: boolean;
  morningChant: string;
  eveningMeditation: string;
  ambientVolume: number;
  notificationsEnabled: boolean;
  theme: 'dark' | 'light';
}

const defaultPreferences: LocalPreferences = {
  mantraAlarm: true,
  morningChant: "06:00 AM",
  eveningMeditation: "09:30 PM",
  ambientVolume: 66,
  notificationsEnabled: true,
  theme: 'dark'
};

export const storage = {
  getUserProfile: (): LocalUserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : { displayName: 'Seeker', streak: 0, lastActive: '' };
  },
  setUserProfile: (profile: LocalUserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getHistory: (): LocalHistory[] => {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },
  addHistory: (entry: Omit<LocalHistory, 'id'>) => {
    const history = storage.getHistory();
    const newEntry = { ...entry, id: Math.random().toString(36).substr(2, 9) };
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([newEntry, ...history]));
  },

  getGoals: (): Record<string, LocalGoal> => {
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    return data ? JSON.parse(data) : {};
  },
  getGoalForDate: (date: string): LocalGoal => {
    const goals = storage.getGoals();
    return goals[date] || { date, completed: 0, target: 108 };
  },
  updateGoal: (goal: LocalGoal) => {
    const goals = storage.getGoals();
    goals[goal.date] = goal;
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },

  getPreferences: (): LocalPreferences => {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? JSON.parse(data) : defaultPreferences;
  },
  setPreferences: (prefs: LocalPreferences) => {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  },

  getLibrary: (): Chant[] | null => {
    const data = localStorage.getItem(STORAGE_KEYS.LIBRARY);
    return data ? JSON.parse(data) : null;
  },
  setLibrary: (library: Chant[]) => {
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(library));
  }
};

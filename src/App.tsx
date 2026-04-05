import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home as HomeIcon,
  Activity,
  BarChart3,
  User,
  Bell,
  Settings,
  Flame,
  Play,
  Pause,
  ChevronRight,
  ArrowLeft,
  RotateCcw,
  RotateCw,
  Sun,
  Moon,
  Volume2,
  Music2,
  Info,
  Wifi,
  WifiOff,
  X,
  BookOpen,
  Repeat,
  Check,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import { cn } from "./lib/utils";
import { Screen, SACRED_LIBRARY, Chant } from "./constants";
import {
  storage,
  LocalUserProfile,
  LocalPreferences,
  LocalGoal,
  LocalHistory,
} from "./lib/storage";

// --- Contexts ---

interface AppContextType {
  profile: LocalUserProfile;
  preferences: LocalPreferences;
  isOnline: boolean;
  updateProfile: (p: Partial<LocalUserProfile>) => void;
  updatePreferences: (p: Partial<LocalPreferences>) => void;
}

const AppContext = createContext<AppContextType | null>(null);
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// --- Helper Function ---

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// --- Components ---

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error(err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Something went wrong
          </h2>
          <p className="text-secondary mb-6">
            We encountered an error. Please try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold"
          >
            Refresh App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const OfflineIndicator = () => {
  const { isOnline } = useApp();
  if (isOnline) return null;

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-error text-on-error py-2 px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest md:max-w-md md:left-1/2 md:-translate-x-1/2"
    >
      <WifiOff size={14} />
      <span>Offline Mode - Local Storage Active</span>
    </motion.div>
  );
};

const Heatmap = () => {
  const history = storage.getHistory();
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (34 - i));
    return d.toISOString().split("T")[0];
  });

  const activityMap: Record<string, number> = {};
  history.forEach((h) => {
    const date = new Date(h.timestamp).toISOString().split("T")[0];
    activityMap[date] = (activityMap[date] || 0) + h.repetitions;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-[0.15em] text-secondary font-bold">
          Consistency Heatmap
        </span>
        <span className="text-[10px] text-secondary">Last 5 Weeks</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((date) => {
          const count = activityMap[date] || 0;
          return (
            <div
              key={date}
              title={`${date}: ${count} chants`}
              className={cn(
                "aspect-square rounded-sm transition-colors duration-500",
                count > 10
                  ? "bg-primary"
                  : count > 5
                  ? "bg-primary/60"
                  : count > 0
                  ? "bg-primary/20"
                  : "bg-surface-container-high"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

const PulseChart = () => {
  const history = storage.getHistory();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const data = last7Days.map((date) => {
    const dateStr = date.toISOString().split("T")[0];
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" })[0];
    const value = history
      .filter(
        (h) => new Date(h.timestamp).toISOString().split("T")[0] === dateStr
      )
      .reduce((acc, curr) => acc + curr.repetitions, 0);
    return { name: dayName, value };
  });

  return (
    <div className="h-48 w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              fontSize: "10px",
            }}
            itemStyle={{ color: "#f8fafc" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const BottomNav = ({
  activeScreen,
  setScreen,
}: {
  activeScreen: Screen;
  setScreen: (s: Screen) => void;
}) => {
  const navItems = [
    { id: "home", icon: HomeIcon, label: "Sanctuary" },
    { id: "chant", icon: Music2, label: "Library" },
    { id: "stats", icon: Activity, label: "Pulse" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-surface-container-low/80 backdrop-blur-2xl border-t border-outline-variant/10 flex items-center justify-around px-4 z-50 md:max-w-md md:left-1/2 md:-translate-x-1/2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id as Screen)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={cn(
              "p-2 rounded-xl transition-all duration-300",
              activeScreen === item.id
                ? "bg-primary/10 text-primary"
                : "text-secondary hover:text-on-surface"
            )}
          >
            <item.icon size={20} />
          </div>
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
              activeScreen === item.id
                ? "text-primary opacity-100"
                : "text-secondary opacity-0 group-hover:opacity-100"
            )}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

// --- Screens ---

const HomeScreen = ({
  onChantSelect,
  library,
  setScreen,
  refreshKey,
}: {
  onChantSelect: (c: Chant) => void;
  library: Chant[];
  setScreen: (s: Screen) => void;
  refreshKey: number;
}) => {
  const { profile, preferences } = useApp();
  const [stats, setStats] = useState({
    streak: profile.streak,
    completed: 0,
    target: 108,
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const goal = storage.getGoalForDate(today);

    // Apply saved custom target for new days
    const customTarget = (preferences as any).dailyTarget;
    if (customTarget && goal.target !== customTarget && goal.completed === 0) {
      goal.target = customTarget;
      storage.updateGoal(goal);
    }

    setStats((prev) => ({
      ...prev,
      completed: goal.completed,
      target: goal.target,
    }));
  }, [profile, refreshKey, preferences]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12 pb-24"
    >
      <header className="flex justify-between items-center h-16 w-full fixed top-0 left-0 px-8 bg-surface-container-low/80 backdrop-blur-xl z-50 md:max-w-md md:left-1/2 md:-translate-x-1/2">
        <span className="text-xl font-medium tracking-tight text-on-surface">
          Digital Sanctuary
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => setScreen("stats")}
            className="text-secondary hover:text-primary transition-colors"
          >
            <Bell size={20} />
          </button>
          <button
            onClick={() => setScreen("profile")}
            className="text-secondary hover:text-primary transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="pt-20 px-8 space-y-12">
        <section className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-on-surface leading-tight">
            Good Morning, {profile.displayName}
          </h1>
          <p className="text-secondary text-lg">
            May your path be filled with light today.
          </p>
        </section>

        <section className="bg-surface-container-low px-6 py-5 rounded-xl flex items-center gap-4">
          <div className="text-primary">
            <Flame size={32} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.05em] font-semibold text-secondary">
              Current Streak
            </p>
            <p className="text-xl font-semibold text-primary">
              {stats.streak} Day Streak
            </p>
          </div>
        </section>

        <section className="bg-surface-container-low p-8 rounded-xl space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-on-surface">
                Today's Chant Goal
              </h2>
              <span className="text-primary font-semibold">
                {Math.round((stats.completed / stats.target) * 100)}%
              </span>
            </div>
            <div className="w-full h-1 bg-outline-variant/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    100,
                    (stats.completed / stats.target) * 100
                  )}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.05em] text-secondary mb-1">
                Completed
              </p>
              <p className="text-2xl font-light">
                {stats.completed}{" "}
                <span className="text-sm text-secondary">chants</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.05em] text-secondary mb-1">
                Target
              </p>
              <p className="text-2xl font-light">{stats.target}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light tracking-tight text-on-surface">
              Sacred Library
            </h2>
            <button
              onClick={() => setScreen("chant")}
              className="text-primary text-sm font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {library.slice(0, 2).map((chant) => (
              <button
                key={chant.id}
                onClick={() => onChantSelect(chant)}
                className="group text-left"
              >
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-surface-container-highest relative">
                  <img
                    src={
                      chant.imageUrl ||
                      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop"
                    }
                    alt={chant.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-medium text-lg">
                      {chant.title}
                    </p>
                    <p className="text-secondary text-sm">{chant.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const StatsScreen = () => {
  const history = storage.getHistory();
  const totalChants = history.reduce((acc, curr) => acc + curr.repetitions, 0);

  const chantCounts: Record<string, number> = {};
  history.forEach((h) => {
    chantCounts[h.chantId] = (chantCounts[h.chantId] || 0) + h.repetitions;
  });
  const mostChantedId = Object.entries(chantCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];
  const mostChantedName =
    SACRED_LIBRARY.find((c) => c.id === mostChantedId)?.title || "None yet";

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });
  const activeDays = new Set(
    history.map((h) => new Date(h.timestamp).toISOString().split("T")[0])
  );
  const consistencyCount = last30Days.filter((d) => activeDays.has(d)).length;
  const consistencyScore = Math.round((consistencyCount / 30) * 100);

  const lastMonth = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (i + 30));
    return d.toISOString().split("T")[0];
  });
  const lastMonthChants = history
    .filter((h) =>
      lastMonth.includes(new Date(h.timestamp).toISOString().split("T")[0])
    )
    .reduce((acc, curr) => acc + curr.repetitions, 0);
  const thisMonthChants = history
    .filter((h) =>
      last30Days.includes(new Date(h.timestamp).toISOString().split("T")[0])
    )
    .reduce((acc, curr) => acc + curr.repetitions, 0);

  const growth =
    lastMonthChants === 0
      ? 100
      : Math.round(
          ((thisMonthChants - lastMonthChants) / lastMonthChants) * 100
        );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-16 pb-24 px-8 pt-12"
    >
      <header className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
          Spiritual Pulse
        </span>
        <h1 className="text-4xl font-light tracking-tight text-on-surface">
          Your growth is the only metric that matters.
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-6">
        <div className="bg-surface-container-low p-8 flex flex-col justify-between h-40 rounded-xl">
          <span className="text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">
            Total Chants
          </span>
          <div>
            <div className="text-5xl font-light text-primary">
              {totalChants}
            </div>
            <div className="text-xs text-on-surface-variant mt-2">
              Sessions completed
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 flex flex-col justify-between h-40 rounded-xl">
          <span className="text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">
            Most Chanted
          </span>
          <div>
            <div className="text-2xl font-medium text-on-surface leading-tight">
              {mostChantedName}
            </div>
            <div className="text-xs text-on-surface-variant mt-2">
              Personal resonance
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 flex flex-col justify-between h-40 rounded-xl">
          <span className="text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">
            Consistency Score
          </span>
          <div>
            <div className="text-5xl font-light text-primary">
              {consistencyScore}%
            </div>
            <div className="text-xs text-on-surface-variant mt-2">
              Last 30 days active
            </div>
          </div>
        </div>
      </section>

      <Heatmap />

      <section className="space-y-8 py-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">
            Mindfulness Pulse
          </span>
          <h2 className="text-3xl font-light tracking-tight text-on-surface">
            Deeper immersion found in the silence.
          </h2>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-light text-on-surface">
              {growth > 0 ? "+" : ""}
              {growth}%
            </span>
            <span className="text-primary-dark uppercase text-[10px] font-bold tracking-widest">
              Activity vs last month
            </span>
          </div>
          <p className="text-secondary leading-relaxed pt-4">
            Your chanting activity has {growth >= 0 ? "increased" : "decreased"}{" "}
            by {Math.abs(growth)}% compared to the previous 30-day period. This
            reflects your evolving commitment to the practice.
          </p>
        </div>
        <PulseChart />
      </section>
    </motion.div>
  );
};

const ProfileScreen = () => {
  const { profile, preferences, updatePreferences, updateProfile } = useApp();
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-16 pb-24 px-8 pt-12"
    >
      <header className="flex flex-col gap-6">
        <div className="space-y-1">
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => updateProfile({ displayName: e.target.value })}
            className="text-4xl font-light tracking-tight text-on-surface bg-transparent border-none focus:ring-0 p-0 w-full"
          />
          <p className="text-secondary">Chanting since April 2024</p>
        </div>
      </header>

      <section className="space-y-8">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
          Sanctuary Settings
        </h3>
        <div className="divide-y divide-outline-variant/10">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-6">
              <Moon size={20} className="text-secondary" />
              <span className="text-on-surface">Theme</span>
            </div>
            <button
              onClick={() => {
                const newTheme =
                  preferences.theme === "dark" ? "light" : "dark";
                updatePreferences({ theme: newTheme });
                document.documentElement.classList.remove("dark", "light");
                document.documentElement.classList.add(newTheme);
              }}
              className="text-[10px] uppercase tracking-widest text-primary font-bold"
            >
              {preferences.theme === "dark" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-6">
              <Volume2 size={20} className="text-secondary" />
              <span className="text-on-surface">Ambient Volume</span>
            </div>
            <div className="w-32 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.ambientVolume}
                onChange={(e) =>
                  updatePreferences({ ambientVolume: parseInt(e.target.value) })
                }
                className="w-full h-1 bg-outline-variant/30 appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={() => setShowResetModal(true)}
        className="w-full py-4 bg-surface-container-low text-error text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-surface-container-high transition-colors"
      >
        Reset Local Sanctuary
      </button>

      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container-lowest p-8 rounded-2xl max-w-xs w-full space-y-6 text-center shadow-2xl"
            >
              <h3 className="text-xl font-medium text-on-surface">
                Reset Sanctuary?
              </h3>
              <p className="text-secondary text-sm">
                This will permanently delete all your progress, streaks, and
                history. This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="w-full py-3 bg-error text-on-error rounded-xl font-bold"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-3 bg-surface-container-high text-on-surface rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Lyrics Page ---

const LyricsPage = ({
  chant,
  language,
  setLanguage,
  isPlaying,
  setIsPlaying,
  repetitions,
  onClose,
  currentTime,
  duration,
  onSeek,
  targetReps,
}: {
  chant: Chant;
  language: "ENG" | "HIN";
  setLanguage: (l: "ENG" | "HIN") => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  repetitions: number;
  onClose: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  targetReps: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-[70] bg-background flex flex-col w-full max-w-md mx-auto"
    >
      {/* Header */}
      <header className="flex-shrink-0 flex justify-between items-center px-6 h-16 border-b border-outline-variant/10 bg-surface-container-low/80 backdrop-blur-xl z-10">
        <button
          onClick={onClose}
          className="text-secondary hover:text-on-surface transition-colors p-1"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-secondary font-bold">
            Lyrics
          </p>
          <p className="text-sm font-medium text-on-surface">{chant.title}</p>
        </div>
        {/* Language toggle */}
        <div className="flex items-center bg-surface-container-high rounded-full p-0.5 border border-outline-variant/10">
          <button
            onClick={() => setLanguage("ENG")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors",
              language === "ENG"
                ? "bg-primary text-on-primary"
                : "text-secondary"
            )}
          >
            ENG
          </button>
          <button
            onClick={() => setLanguage("HIN")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors",
              language === "HIN"
                ? "bg-primary text-on-primary"
                : "text-secondary"
            )}
          >
            HIN
          </button>
        </div>
      </header>

      {/* Scrollable lyrics */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-8 py-8 pb-48">
        <div className="space-y-8">
          {chant.lyrics.map((verse, idx) => (
            <div
              key={idx}
              className="space-y-2 border-b border-outline-variant/10 pb-8 last:border-0"
            >
              <p className="text-base font-light leading-loose text-on-surface whitespace-pre-line">
                {language === "ENG" ? verse.translation : verse.original}
              </p>
              <p className="text-xs text-secondary leading-relaxed whitespace-pre-line">
                {language === "ENG" ? verse.original : verse.translation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned bottom player strip */}
      <div className="flex-shrink-0 fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-surface-container-low/95 backdrop-blur-xl border-t border-outline-variant/10 px-8 py-4 flex flex-col gap-4 z-10">
        {/* Seek Bar Integration */}
        <div className="w-full flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onSeek(val);
            }}
            className="w-full h-1 bg-outline-variant/30 appearance-none cursor-pointer accent-primary rounded-full"
          />
          <div className="flex justify-between text-[10px] text-secondary font-medium tracking-wider px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-secondary font-bold">
              Repetitions
            </p>
            <p className="text-2xl font-light text-on-surface">
              {repetitions}{" "}
              <span className="text-sm text-secondary">/ {targetReps}</span>
            </p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 bg-primary flex items-center justify-center rounded-full text-on-primary shadow-lg active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <div className="w-16 text-right">
            <p className="text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">
              Now
            </p>
            <p className="text-xs text-primary font-semibold truncate">
              {chant.subtitle}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Chant Player Screen ---

const ChantPlayerScreen = ({
  chant,
  onBack,
}: {
  chant: Chant;
  onBack: () => void;
}) => {
  const { profile, updateProfile, preferences, updatePreferences } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [repetitions, setRepetitions] = useState(0);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [language, setLanguage] = useState<"ENG" | "HIN">("ENG");
  const [playbackRate, setPlaybackRate] = useState(1);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize from local storage so it survives refresh
  const [targetReps, setTargetReps] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    const goal = storage.getGoalForDate(today);
    const customTarget = (preferences as any).dailyTarget;
    return goal.target !== 108 ? goal.target : customTarget || 108;
  });

  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [autoStart, setAutoStart] = useState(true);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = preferences.ambientVolume / 100;
    }
  }, [preferences.ambientVolume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(console.error);
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const saveTarget = (val: number) => {
    const finalVal = Math.max(1, val);
    setTargetReps(finalVal);
    setIsEditingTarget(false);

    const today = new Date().toISOString().split("T")[0];
    const goal = storage.getGoalForDate(today);

    // Save to today's progress
    storage.updateGoal({ ...goal, target: finalVal });
    // Save to global preferences for future days
    updatePreferences({ dailyTarget: finalVal } as any);
  };

  const completeRepetition = () => {
    const newReps = repetitions + 1;
    setRepetitions(newReps);

    const today = new Date().toISOString().split("T")[0];
    const goal = storage.getGoalForDate(today);
    storage.updateGoal({ ...goal, completed: goal.completed + 1 });

    storage.addHistory({
      chantId: chant.id,
      repetitions: 1,
      timestamp: Date.now(),
    });

    const lastActive = profile.lastActive;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastActive !== today) {
      const newStreak = lastActive === yesterdayStr ? profile.streak + 1 : 1;
      updateProfile({ streak: newStreak, lastActive: today });
    }

    return newReps;
  };

  const adjustRepetitions = (delta: number) => {
    const newVal = Math.max(0, repetitions + delta);
    if (newVal === repetitions) return;
    setRepetitions(newVal);

    const today = new Date().toISOString().split("T")[0];
    const goal = storage.getGoalForDate(today);

    if (delta > 0) {
      storage.updateGoal({ ...goal, completed: goal.completed + 1 });
      storage.addHistory({
        chantId: chant.id,
        repetitions: 1,
        timestamp: Date.now(),
      });
    } else if (delta < 0) {
      storage.updateGoal({
        ...goal,
        completed: Math.max(0, goal.completed - 1),
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="fixed inset-0 z-[60] bg-background flex flex-col md:max-w-md md:left-1/2 md:-translate-x-1/2"
    >
      <audio
        ref={audioRef}
        src={chant.audioUrl}
        onEnded={() => {
          const newReps = completeRepetition();

          if (autoStart && newReps < targetReps) {
            setCurrentTime(0);
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(console.error);
            }
          } else {
            setIsPlaying(false);
            setCurrentTime(0);
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
            }
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
      />

      <header className="flex justify-between items-center px-8 h-16 w-full flex-shrink-0">
        <button
          onClick={onBack}
          className="text-secondary hover:text-on-surface"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium tracking-tight text-on-surface">
          Digital Sanctuary
        </h1>
        <div className="w-8" />
      </header>

      <main className="flex-grow flex flex-col px-8 pt-8 pb-32 overflow-y-auto hide-scrollbar">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-surface-container-low mb-12 shadow-2xl">
          <img
            src={
              chant.imageUrl ||
              "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop"
            }
            alt={chant.title}
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
            <p className="text-xs uppercase tracking-[0.1em] text-primary font-bold mb-1">
              Current Chant
            </p>
            <h2 className="text-3xl font-light tracking-tight text-white">
              {chant.title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="flex items-baseline gap-2">
            <span className="text-8xl font-light tracking-tighter text-on-surface">
              {repetitions}
            </span>
            <span className="text-2xl font-light text-secondary">
              / {targetReps}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold mt-2">
            Repetitions Completed
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between h-28">
            <span className="text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">
              Target
            </span>
            <div className="flex justify-between items-center">
              {isEditingTarget ? (
                <input
                  type="number"
                  min="1"
                  value={targetReps}
                  onChange={(e) => setTargetReps(parseInt(e.target.value) || 1)}
                  onBlur={() => saveTarget(targetReps)}
                  onKeyDown={(e) => e.key === "Enter" && saveTarget(targetReps)}
                  autoFocus
                  className="w-16 bg-transparent border-b border-primary text-2xl font-medium text-on-surface focus:outline-none"
                />
              ) : (
                <span className="text-2xl font-medium">{targetReps}</span>
              )}
              <button
                onClick={() => setIsEditingTarget(!isEditingTarget)}
                className="p-2 -mr-2 text-secondary hover:text-primary transition-colors"
              >
                {isEditingTarget ? <Check size={16} /> : <Settings size={16} />}
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between h-28">
            <span className="text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">
              Tempo
            </span>
            <div className="flex gap-2">
              {[0.75, 1, 1.25].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={cn(
                    "text-[10px] px-2 py-1 rounded transition-colors",
                    playbackRate === rate
                      ? "bg-primary text-on-primary font-bold"
                      : "bg-surface-container-high text-secondary border border-outline-variant/10"
                  )}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lyrics button */}
        <button
          onClick={() => setLyricsOpen(true)}
          className="flex items-center justify-between w-full bg-surface-container-low px-6 py-4 rounded-xl mb-8 group"
        >
          <div className="flex items-center gap-3">
            <BookOpen
              size={18}
              className="text-secondary group-hover:text-primary transition-colors"
            />
            <span className="text-sm font-bold text-secondary group-hover:text-on-surface transition-colors">
              View Full Lyrics
            </span>
          </div>
          <ChevronRight
            size={16}
            className="text-secondary group-hover:text-primary transition-colors"
          />
        </button>

        {/* --- SEEK BAR --- */}
        <div className="w-full flex flex-col gap-2 mb-8">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-outline-variant/30 appearance-none cursor-pointer accent-primary rounded-full"
          />
          <div className="flex justify-between text-[10px] text-secondary font-medium tracking-wider">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => setAutoStart(!autoStart)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              autoStart
                ? "text-primary"
                : "text-secondary hover:text-on-surface"
            )}
            title={autoStart ? "Auto-loop enabled" : "Auto-loop disabled"}
          >
            <Repeat size={20} />
            <span className="text-[8px] font-bold uppercase tracking-widest">
              Loop
            </span>
          </button>

          <button
            onClick={() => adjustRepetitions(-1)}
            className="text-secondary hover:text-on-surface transition-colors"
          >
            <RotateCcw size={32} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-24 h-24 bg-primary flex items-center justify-center rounded-full text-on-primary shadow-2xl active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause size={40} fill="currentColor" />
            ) : (
              <Play size={40} fill="currentColor" className="ml-2" />
            )}
          </button>

          <button
            onClick={() => adjustRepetitions(1)}
            className="text-secondary hover:text-on-surface transition-colors"
          >
            <RotateCw size={32} />
          </button>
        </div>
      </main>

      {/* Lyrics full-page overlay */}
      <AnimatePresence>
        {lyricsOpen && (
          <LyricsPage
            chant={chant}
            language={language}
            setLanguage={setLanguage}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            repetitions={repetitions}
            targetReps={targetReps}
            onClose={() => setLyricsOpen(false)}
            currentTime={currentTime}
            duration={duration}
            onSeek={(time: number) => {
              setCurrentTime(time);
              if (audioRef.current) {
                audioRef.current.currentTime = time;
              }
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [profile, setProfile] = useState<LocalUserProfile>(
    storage.getUserProfile()
  );
  const [preferences, setPreferences] = useState<LocalPreferences>(
    storage.getPreferences()
  );
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedChant, setSelectedChant] = useState<Chant | null>(null);
  const [library] = useState<Chant[]>(SACRED_LIBRARY);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const savedTheme = preferences.theme || "dark";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(savedTheme);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const scheduleNotifications = () => {
      if (!preferences.notificationsEnabled) return;
      if ("Notification" in window && Notification.permission === "granted") {
        const today = new Date().toISOString().split("T")[0];
        const goal = storage.getGoalForDate(today);
        if (goal.completed === 0 && new Date().getHours() > 20) {
          new Notification("Sanctuary Warning", {
            body: "Your streak is close to breaking! Take a moment for a quick chant.",
            icon: "/favicon.ico",
          });
        }
      }
    };

    const interval = setInterval(scheduleNotifications, 1000 * 60 * 60);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [preferences.notificationsEnabled]);

  const updateProfile = (p: Partial<LocalUserProfile>) => {
    const newProfile = { ...profile, ...p };
    setProfile(newProfile);
    storage.setUserProfile(newProfile);
  };

  const updatePreferences = (p: Partial<LocalPreferences>) => {
    const newPrefs = { ...preferences, ...p };
    setPreferences(newPrefs);
    storage.setPreferences(newPrefs);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        preferences,
        isOnline,
        updateProfile,
        updatePreferences,
      }}
    >
      <ErrorBoundary>
        <div className="min-h-screen bg-background text-on-surface flex flex-col items-center">
          <div className="w-full min-h-screen relative md:max-w-md md:shadow-2xl md:bg-surface-container-lowest">
            <OfflineIndicator />
            <AnimatePresence mode="wait">
              {screen === "home" && (
                <HomeScreen
                  key="home"
                  library={library}
                  onChantSelect={(c) => setSelectedChant(c)}
                  setScreen={setScreen}
                  refreshKey={refreshKey}
                />
              )}
              {screen === "stats" && <StatsScreen key="stats" />}
              {screen === "profile" && <ProfileScreen key="profile" />}
              {screen === "chant" && (
                <motion.div
                  key="chant-library"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 pt-12 space-y-8 pb-24"
                >
                  <h1 className="text-3xl font-light text-on-surface">
                    Sacred Library
                  </h1>
                  <div className="grid grid-cols-1 gap-4">
                    {library.map((chant) => (
                      <button
                        key={chant.id}
                        onClick={() => setSelectedChant(chant)}
                        className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 text-left hover:bg-surface-container transition-colors"
                      >
                        <img
                          src={
                            chant.imageUrl ||
                            "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop"
                          }
                          className="w-16 h-16 rounded-lg object-cover grayscale flex-shrink-0"
                          alt={chant.title}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-on-surface">
                            {chant.title}
                          </p>
                          <p className="text-xs text-secondary">
                            {chant.subtitle}
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-secondary flex-shrink-0"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {selectedChant && (
                <ChantPlayerScreen
                  chant={selectedChant}
                  onBack={() => {
                    setSelectedChant(null);
                    setRefreshKey((k) => k + 1);
                  }}
                />
              )}
            </AnimatePresence>

            <BottomNav activeScreen={screen} setScreen={setScreen} />
          </div>
        </div>
      </ErrorBoundary>
    </AppContext.Provider>
  );
}

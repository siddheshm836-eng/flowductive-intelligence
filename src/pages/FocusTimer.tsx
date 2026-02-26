import { useState, useEffect, useRef } from "react";
import AppLayout from "@/components/AppLayout";
import { mockFocusSessions } from "@/data/mockData";
import { FocusSession } from "@/types/index";
import { Play, Pause, RotateCcw, Coffee, Brain, CheckCircle2, Timer } from "lucide-react";

type Mode = "work" | "break" | "long-break";

const MODES: { id: Mode; label: string; duration: number; color: string }[] = [
  { id: "work", label: "Focus", duration: 25 * 60, color: "text-cyan" },
  { id: "break", label: "Short Break", duration: 5 * 60, color: "text-emerald" },
  { id: "long-break", label: "Long Break", duration: 15 * 60, color: "text-violet" },
];

export default function FocusTimer() {
  const [mode, setMode] = useState<Mode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState<FocusSession[]>(mockFocusSessions);
  const [currentTask, setCurrentTask] = useState("Building Dashboard Components");
  const [completedToday, setCompletedToday] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentMode = MODES.find(m => m.id === mode)!;
  const totalDuration = currentMode.duration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setRunning(false);
            setCompletedToday(c => c + 1);
            const newSession: FocusSession = {
              id: "f_" + Date.now(),
              date: new Date().toISOString().split("T")[0],
              duration: currentMode.duration / 60,
              type: mode,
              completed: true,
              taskTitle: mode === "work" ? currentTask : undefined,
            };
            setSessions(prev => [newSession, ...prev]);
            return currentMode.duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode, currentTask]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setRunning(false);
    setTimeLeft(MODES.find(x => x.id === m)!.duration);
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(currentMode.duration);
  };

  const mm = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const ss = (timeLeft % 60).toString().padStart(2, "0");

  const circumference = 2 * Math.PI * 100;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Focus Timer</h1>
          <p className="text-sm text-muted-foreground">Pomodoro-based deep work sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer */}
          <div className="lg:col-span-2 card-surface rounded-2xl p-8">
            {/* Mode selector */}
            <div className="flex gap-2 mb-8">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => switchMode(m.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                    mode === m.id ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:bg-surface-2"
                  }`}
                >
                  {m.id === "work" ? <Brain className="w-3 h-3 inline mr-1" /> : <Coffee className="w-3 h-3 inline mr-1" />}
                  {m.label}
                </button>
              ))}
            </div>

            {/* Ring timer */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-56 h-56">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="100" fill="none" stroke="hsl(222,30%,14%)" strokeWidth="8" />
                  <circle
                    cx="110" cy="110" r="100" fill="none"
                    stroke={mode === "work" ? "hsl(189,100%,48%)" : mode === "break" ? "hsl(158,64%,52%)" : "hsl(262,83%,63%)"}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-5xl font-bold text-foreground tabular-nums">{mm}:{ss}</span>
                  <span className={`text-sm font-medium mt-1 ${currentMode.color}`}>{currentMode.label}</span>
                </div>
              </div>
            </div>

            {/* Task */}
            <div className="mb-6">
              <label className="text-xs text-muted-foreground mb-1.5 block">Current Task</label>
              <input
                value={currentTask}
                onChange={e => setCurrentTask(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button onClick={reset} className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-all">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setRunning(!running)}
                className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground glow-cyan hover:opacity-90 transition-all shadow-elevated"
              >
                {running ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>
              <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">{completedToday}</span>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">{completedToday} sessions completed today</p>
          </div>

          {/* Session history */}
          <div className="card-surface rounded-2xl p-5">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <Timer className="w-4 h-4 text-cyan" /> Session History
            </h3>
            <div className="space-y-2 overflow-y-auto max-h-80 scrollbar-thin">
              {sessions.slice(0, 12).map(s => (
                <div key={s.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${s.type === "work" ? "text-cyan" : "text-emerald"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">{s.taskTitle || s.type}</p>
                    <p className="text-xs text-muted-foreground">{s.duration}m · {s.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Total focus today</span>
                <span className="text-cyan font-semibold">{completedToday * 25}m</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Sessions this week</span>
                <span className="text-foreground font-semibold">{sessions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

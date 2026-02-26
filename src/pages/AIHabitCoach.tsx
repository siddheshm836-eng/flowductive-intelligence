import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Heart, Brain, TrendingUp, Flame, Leaf, Moon, Sun, Dumbbell, CheckCircle2, AlertTriangle, Bot } from "lucide-react";

const habits = [
  { id: 1, name: "Morning Meditation", icon: Brain, color: "text-violet", streak: 12, target: 10, completed: [true, true, true, true, true, false, true] },
  { id: 2, name: "Daily Exercise", icon: Dumbbell, color: "text-cyan", streak: 7, target: 7, completed: [true, true, false, true, true, true, false] },
  { id: 3, name: "Deep Work (2h min)", icon: TrendingUp, color: "text-emerald", streak: 18, target: 14, completed: [true, true, true, true, true, true, true] },
  { id: 4, name: "Evening Journal", icon: Moon, color: "text-amber", streak: 5, target: 7, completed: [true, false, true, true, false, true, true] },
  { id: 5, name: "Hydration (8 glasses)", icon: Leaf, color: "text-emerald", streak: 9, target: 7, completed: [true, true, true, false, true, true, true] },
  { id: 6, name: "Sleep 7+ hours", icon: Sun, color: "text-rose", streak: 4, target: 7, completed: [false, true, true, false, true, false, true] },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

const coachInsights = [
  { icon: TrendingUp, label: "Strongest habit", value: "Deep Work — 18-day streak!", color: "text-emerald" },
  { icon: AlertTriangle, label: "Needs attention", value: "Sleep consistency is at 57%", color: "text-rose" },
  { icon: Brain, label: "Coach advice", value: "Link sleep to exercise — high correlation detected", color: "text-cyan" },
  { icon: Flame, label: "Momentum score", value: "74/100 — Building phase", color: "text-amber" },
];

export default function AIHabitCoach() {
  const [habitList, setHabitList] = useState(habits);

  const toggleToday = (habitId: number) => {
    setHabitList(prev => prev.map(h => {
      if (h.id !== habitId) return h;
      const newCompleted = [...h.completed];
      newCompleted[6] = !newCompleted[6];
      return { ...h, completed: newCompleted, streak: newCompleted[6] ? h.streak + 1 : Math.max(0, h.streak - 1) };
    }));
  };

  const overallConsistency = Math.round(
    habitList.reduce((sum, h) => sum + (h.completed.filter(Boolean).length / 7), 0) / habitList.length * 100
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose" /> AI Habit Coach
            </h1>
            <p className="text-sm text-muted-foreground">Behavioral intelligence & consistency tracking</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-gradient">{overallConsistency}%</p>
            <p className="text-xs text-muted-foreground">Weekly consistency</p>
          </div>
        </div>

        {/* Coach insights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {coachInsights.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card-surface rounded-xl p-4">
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className={`text-xs font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Habit tracker */}
        <div className="card-surface rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Weekly Habit Tracker</h3>
            <div className="flex gap-3 text-xs text-muted-foreground">
              {days.map(d => <span key={d} className="w-6 text-center font-medium">{d}</span>)}
            </div>
          </div>

          <div className="space-y-3">
            {habitList.map(habit => {
              const { icon: Icon, color } = habit;
              const consistency = Math.round(habit.completed.filter(Boolean).length / 7 * 100);
              return (
                <div key={habit.id} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                  <div className={`w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{habit.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full bg-surface-2 ${color} font-medium`}>
                        🔥 {habit.streak}d
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-2 rounded-full mt-1.5">
                      <div className="h-1 rounded-full bg-gradient-primary transition-all" style={{ width: `${consistency}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {habit.completed.map((done, i) => (
                      <button
                        key={i}
                        onClick={i === 6 ? () => toggleToday(habit.id) : undefined}
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-all ${
                          done ? "bg-emerald/20 text-emerald" : "bg-surface-2 text-muted-foreground"
                        } ${i === 6 ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                      >
                        {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-2 h-2 rounded-sm bg-border" />}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="card-surface rounded-xl p-5 border-primary/20 bg-primary/5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 glow-cyan">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Coach Recommendation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your <strong className="text-foreground">Deep Work</strong> habit is your anchor — maintain it. Your sleep habit shows the most variance; I've detected a pattern: you skip sleep goals on days with late evening social activity. Consider setting a <strong className="text-foreground">9:30 PM wind-down alarm</strong>. Linking your sleep improvement to your already-strong exercise habit will compound your results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

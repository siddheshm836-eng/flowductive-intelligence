import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { mockTasks, mockWeeklyData, mockMonthlyData } from "@/data/mockData";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, CheckCircle2, Timer, Flame, Brain, AlertTriangle, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const kpis = [
  { label: "Productivity Score", value: "87", unit: "/100", icon: TrendingUp, color: "text-cyan", bg: "bg-cyan/10", trend: "+5 this week" },
  { label: "Tasks Completed", value: "24", unit: "/ 31", icon: CheckCircle2, color: "text-emerald", bg: "bg-emerald/10", trend: "77% completion" },
  { label: "Focus Hours", value: "38.5", unit: "hrs", icon: Timer, color: "text-amber", bg: "bg-amber/10", trend: "This month" },
  { label: "Habit Streak", value: "12", unit: "days", icon: Flame, color: "text-rose", bg: "bg-rose/10", trend: "Personal best: 18" },
];

const insights = [
  { icon: Brain, label: "Peak Focus Window", value: "9 – 11 AM", color: "text-cyan" },
  { icon: Target, label: "Completion Rate", value: "73%", color: "text-emerald" },
  { icon: AlertTriangle, label: "Burnout Risk", value: "Low (18%)", color: "text-amber" },
  { icon: Zap, label: "Flow State Days", value: "4 / 7", color: "text-violet" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const doneTasks = mockTasks.filter(t => t.status === "done");
  const inProgressTasks = mockTasks.filter(t => t.status === "in-progress");
  const todoTasks = mockTasks.filter(t => t.status === "todo");

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Good morning, <span className="text-gradient">{user?.name?.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-1 border border-border text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            System Active
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, unit, icon: Icon, color, bg, trend }) => (
            <div key={label} className="card-surface rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-2xl font-bold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground">{unit}</span>
              </div>
              <p className="text-xs font-medium text-foreground mb-0.5">{label}</p>
              <p className="text-xs text-muted-foreground">{trend}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Weekly Activity */}
          <div className="lg:col-span-2 card-surface rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm">Weekly Activity</h3>
                <p className="text-xs text-muted-foreground">Tasks & Focus Score</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={mockWeeklyData}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(189,100%,48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(189,100%,48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(222,40%,8%)", border: "1px solid hsl(222,30%,14%)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "hsl(210,40%,96%)" }}
                />
                <Area type="monotone" dataKey="focus" stroke="hsl(189,100%,48%)" strokeWidth={2} fill="url(#focusGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights */}
          <div className="card-surface rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground text-sm mb-4">AI Insights</h3>
            <div className="space-y-3">
              {insights.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                  <span className={`text-xs font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
            <Link to="/ai-assistant" className="flex items-center gap-1.5 mt-4 text-xs text-primary hover:underline">
              <Brain className="w-3.5 h-3.5" />
              Open AI Assistant
            </Link>
          </div>
        </div>

        {/* Tasks overview + Monthly trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Tasks */}
          <div className="lg:col-span-2 card-surface rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground text-sm">Active Tasks</h3>
              <Link to="/workflow" className="text-xs text-primary hover:underline">View Board →</Link>
            </div>
            <div className="space-y-2">
              {[...inProgressTasks, ...todoTasks].slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === "in-progress" ? "bg-amber animate-pulse" : "bg-muted-foreground"}`} />
                  <span className="flex-1 text-sm text-foreground truncate">{task.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    task.priority === "high" ? "bg-rose/10 text-rose" :
                    task.priority === "medium" ? "bg-amber/10 text-amber" :
                    "bg-muted text-muted-foreground"
                  }`}>{task.priority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Score */}
          <div className="card-surface rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground text-sm mb-4">Monthly Score</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={mockMonthlyData}>
                <XAxis dataKey="month" tick={{ fill: "hsl(215,20%,55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "hsl(222,40%,8%)", border: "1px solid hsl(222,30%,14%)", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="score" fill="hsl(189,100%,48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 text-center">
              <span className="font-display text-2xl font-bold text-gradient">87</span>
              <p className="text-xs text-muted-foreground">Current month score</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

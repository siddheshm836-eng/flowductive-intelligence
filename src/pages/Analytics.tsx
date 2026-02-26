import AppLayout from "@/components/AppLayout";
import { mockWeeklyData, mockMonthlyData } from "@/data/mockData";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, LineChart, Line
} from "recharts";
import { TrendingUp, Target, Flame, Brain, AlertTriangle, Activity, Zap, Clock } from "lucide-react";

const radarData = [
  { subject: "Focus", A: 85 },
  { subject: "Tasks", A: 73 },
  { subject: "Habits", A: 78 },
  { subject: "Energy", A: 68 },
  { subject: "Mood", A: 82 },
  { subject: "Recovery", A: 72 },
];

const moodProductivity = [
  { day: "Mon", mood: 8, productivity: 85 },
  { day: "Tue", mood: 9, productivity: 92 },
  { day: "Wed", mood: 6, productivity: 67 },
  { day: "Thu", mood: 8, productivity: 95 },
  { day: "Fri", mood: 7, productivity: 78 },
  { day: "Sat", mood: 9, productivity: 45 },
  { day: "Sun", mood: 8, productivity: 30 },
];

const kpis = [
  { label: "Productivity Score", value: "87/100", icon: TrendingUp, color: "text-cyan", detail: "+5 from last week" },
  { label: "Task Completion Rate", value: "77%", icon: Target, color: "text-emerald", detail: "24 of 31 tasks" },
  { label: "Habit Consistency", value: "68%", icon: Flame, color: "text-rose", detail: "12-day streak" },
  { label: "Focus Efficiency", value: "91%", icon: Brain, color: "text-violet", detail: "Low distraction" },
  { label: "Burnout Risk", value: "Low 18%", icon: AlertTriangle, color: "text-amber", detail: "72/100 recovery" },
  { label: "Weekly Activity", value: "94 pts", icon: Activity, color: "text-cyan", detail: "Top 15% of users" },
  { label: "Mood Average", value: "7.9/10", icon: Zap, color: "text-emerald", detail: "Positive trend" },
  { label: "Avg Focus Block", value: "47 min", icon: Clock, color: "text-amber", detail: "Above target (25m)" },
];

const tooltipStyle = { background: "hsl(222,40%,8%)", border: "1px solid hsl(222,30%,14%)", borderRadius: 8, fontSize: 11 };

export default function Analytics() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Analytics Engine</h1>
          <p className="text-sm text-muted-foreground">Data-driven productivity intelligence</p>
        </div>

        {/* KPIs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {kpis.map(({ label, value, icon: Icon, color, detail }) => (
            <div key={label} className="card-surface rounded-xl p-4">
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <p className="font-display font-bold text-base text-foreground">{value}</p>
              <p className="text-xs font-medium text-foreground/80 mb-0.5">{label}</p>
              <p className="text-xs text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card-surface rounded-xl p-5">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(222,30%,14%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} />
                <Radar name="You" dataKey="A" stroke="hsl(189,100%,48%)" fill="hsl(189,100%,48%)" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-2 card-surface rounded-xl p-5">
            <h3 className="font-display font-semibold text-sm text-foreground mb-1">Mood vs Productivity Correlation</h3>
            <p className="text-xs text-muted-foreground mb-4">Your mood directly predicts next-day performance</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodProductivity}>
                <XAxis dataKey="day" tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="mood" stroke="hsl(262,83%,63%)" strokeWidth={2} dot={{ fill: "hsl(262,83%,63%)", r: 3 }} name="Mood (x10)" />
                <Line type="monotone" dataKey="productivity" stroke="hsl(189,100%,48%)" strokeWidth={2} dot={{ fill: "hsl(189,100%,48%)", r: 3 }} name="Productivity %" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-0.5 rounded bg-violet inline-block" /> Mood</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-0.5 rounded bg-cyan inline-block" /> Productivity %</div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-surface rounded-xl p-5">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Monthly Productivity Score</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockMonthlyData}>
                <XAxis dataKey="month" tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="score" fill="hsl(189,100%,48%)" radius={[4, 4, 0, 0]} name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card-surface rounded-xl p-5">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Weekly Focus Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={mockWeeklyData}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262,83%,63%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(262,83%,63%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="focus" stroke="hsl(262,83%,63%)" strokeWidth={2} fill="url(#areaGrad)" name="Focus %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Burnout indicator */}
        <div className="card-surface rounded-xl p-5">
          <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber" /> Burnout Risk Indicator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Physical Fatigue", level: 22, color: "bg-emerald" },
              { label: "Mental Exhaustion", level: 35, color: "bg-amber" },
              { label: "Emotional Drain", level: 18, color: "bg-emerald" },
            ].map(({ label, level, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-foreground font-medium">{level}%</span>
                </div>
                <div className="h-2 bg-surface-2 rounded-full">
                  <div className={`h-2 rounded-full ${color} transition-all duration-700`} style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 bg-emerald/5 border border-emerald/20 rounded-lg px-3 py-2">
            ✅ Overall burnout risk: <strong className="text-emerald">LOW (18%)</strong> — Recovery score 72/100. Keep your current pace with adequate breaks.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

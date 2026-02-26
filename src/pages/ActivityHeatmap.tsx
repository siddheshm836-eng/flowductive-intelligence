import AppLayout from "@/components/AppLayout";
import { generateHeatmapData } from "@/data/mockData";
import { useMemo } from "react";
import { Activity, Flame, TrendingUp, Calendar } from "lucide-react";

const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const levelColors = [
  "bg-surface-2",
  "bg-cyan/20",
  "bg-cyan/40",
  "bg-cyan/65",
  "bg-cyan",
];

export default function ActivityHeatmap() {
  const data = useMemo(() => generateHeatmapData(), []);

  const totalActivity = data.reduce((sum, d) => sum + d.count, 0);
  const activeDays = data.filter(d => d.count > 0).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].count > 0) streak++;
      else break;
    }
    return streak;
  })();

  // Group into weeks
  const weeks: typeof data[] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Month labels
  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    data.forEach((d, idx) => {
      const month = new Date(d.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ label: MONTHS[month], col: Math.floor(idx / 7) });
        lastMonth = month;
      }
    });
    return labels;
  }, [data]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Activity Heatmap</h1>
          <p className="text-sm text-muted-foreground">365-day behavioral consistency tracker</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Activities", value: totalActivity, icon: Activity, color: "text-cyan" },
            { label: "Active Days", value: activeDays, icon: Calendar, color: "text-violet" },
            { label: "Current Streak", value: `${currentStreak}d`, icon: Flame, color: "text-rose" },
            { label: "Consistency", value: `${Math.round(activeDays / 365 * 100)}%`, icon: TrendingUp, color: "text-emerald" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card-surface rounded-xl p-4 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
              <div>
                <p className="font-display font-bold text-lg text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="card-surface rounded-2xl p-6">
          <h3 className="font-display font-semibold text-foreground text-sm mb-5">Daily Activity — Last 12 Months</h3>

          <div className="overflow-x-auto scrollbar-thin pb-2">
            <div className="relative" style={{ minWidth: "max-content" }}>
              {/* Month labels */}
              <div className="flex ml-8 mb-1">
                {monthLabels.map(({ label, col }) => (
                  <div key={`${label}-${col}`} className="text-xs text-muted-foreground" style={{ position: "absolute", left: `${32 + col * 13}px` }}>
                    {label}
                  </div>
                ))}
              </div>

              <div className="flex gap-0.5 mt-5">
                {/* Day labels */}
                <div className="flex flex-col gap-0.5 mr-1">
                  {DAYS.map((d, i) => (
                    <div key={i} className="w-3 h-3 text-[10px] text-muted-foreground flex items-center justify-end">{d}</div>
                  ))}
                </div>

                {/* Cells */}
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-0.5">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={`${day.date}: ${day.count} activities`}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125 ${levelColors[Math.min(day.count, 4)]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-1.5 mt-3 justify-end">
                <span className="text-xs text-muted-foreground">Less</span>
                {levelColors.map((cls, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
                ))}
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

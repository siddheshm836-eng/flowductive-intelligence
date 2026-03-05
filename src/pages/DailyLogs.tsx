import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { LogEntry } from "@/types/index";
import { Plus, Smile, Zap, TrendingUp, X, Check, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const moodEmoji: Record<number, string> = { 10: "🤩", 9: "😄", 8: "😊", 7: "🙂", 6: "😐", 5: "😕", 4: "😔", 3: "😢", 2: "😞", 1: "😤" };

export default function DailyLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", mood: 7, energy: 7, productivity: 7, tags: "" });
  const [selected, setSelected] = useState<LogEntry | null>(null);

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from("log_entries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) { toast.error("Failed to load logs"); return; }
    const mapped: LogEntry[] = (data || []).map(l => ({
      id: l.id,
      date: l.date,
      title: l.title,
      content: l.content,
      mood: l.mood,
      energy: l.energy,
      productivity: l.productivity,
      tags: l.tags || [],
      createdAt: l.created_at,
    }));
    setLogs(mapped);
    setLoading(false);
  };

  const addLog = async () => {
    if (!form.title || !form.content) { toast.error("Title and content are required"); return; }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }
    const { data, error } = await supabase.from("log_entries").insert({
      user_id: user.id,
      title: form.title,
      content: form.content,
      mood: form.mood,
      energy: form.energy,
      productivity: form.productivity,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      date: new Date().toISOString().split("T")[0],
    }).select().single();
    setSaving(false);
    if (error) { toast.error("Failed to save log"); return; }
    const log: LogEntry = {
      id: data.id, date: data.date, title: data.title, content: data.content,
      mood: data.mood, energy: data.energy, productivity: data.productivity,
      tags: data.tags || [], createdAt: data.created_at,
    };
    setLogs(prev => [log, ...prev]);
    setShowAdd(false);
    setForm({ title: "", content: "", mood: 7, energy: 7, productivity: 7, tags: "" });
    toast.success("Log entry saved!");
  };

  const SliderInput = ({ label, icon: Icon, color, value, onChange }: { label: string; icon: React.ElementType; color: string; value: number; onChange: (v: number) => void }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon className={`w-3.5 h-3.5 ${color}`} />{label}
        </div>
        <span className={`text-xs font-bold ${color}`}>{value}/10</span>
      </div>
      <input type="range" min={1} max={10} value={value} onChange={e => onChange(+e.target.value)}
        className="w-full h-1.5 rounded-full appearance-none bg-surface-2 accent-primary cursor-pointer" />
    </div>
  );

  if (loading) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    </AppLayout>
  );

  return (
    <AppLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Daily Log Board</h1>
            <p className="text-sm text-muted-foreground">{logs.length} entries — track your journey</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 glow-cyan">
            <Plus className="w-4 h-4" /> New Entry
          </button>
        </div>

        {showAdd && (
          <div className="card-surface rounded-xl p-5 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Today's Log Entry</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-all"
                placeholder="Log title..." />
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={4}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-all resize-none"
                placeholder="How did your day go? What did you accomplish?" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SliderInput label="Mood" icon={Smile} color="text-cyan" value={form.mood} onChange={v => setForm(f => ({ ...f, mood: v }))} />
                <SliderInput label="Energy" icon={Zap} color="text-amber" value={form.energy} onChange={v => setForm(f => ({ ...f, energy: v }))} />
                <SliderInput label="Productivity" icon={TrendingUp} color="text-emerald" value={form.productivity} onChange={v => setForm(f => ({ ...f, productivity: v }))} />
              </div>
              <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-all"
                placeholder="Tags: work, focus, deep-work (comma separated)" />
              <div className="flex gap-2">
                <button onClick={addLog} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-60">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save Entry
                </button>
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {logs.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-display font-semibold mb-2">No log entries yet</p>
            <p className="text-sm">Start tracking your daily journey by adding your first entry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logs.map(log => (
              <div key={log.id} className="card-surface rounded-xl p-5 cursor-pointer hover:border-primary/20 transition-all" onClick={() => setSelected(log)}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm">{log.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(log.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                  </div>
                  <span className="text-2xl">{moodEmoji[log.mood] || "🙂"}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{log.content}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Mood", value: log.mood, color: "text-cyan" },
                    { label: "Energy", value: log.energy, color: "text-amber" },
                    { label: "Prod.", value: log.productivity, color: "text-emerald" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center bg-surface-2 rounded-lg py-2">
                      <p className={`font-bold text-sm ${color}`}>{value}/10</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
                {log.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {log.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selected && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="card-surface rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{new Date(selected.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <p className="text-sm text-foreground leading-relaxed mb-4">{selected.content}</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Mood", value: `${selected.mood}/10 ${moodEmoji[selected.mood]}`, color: "text-cyan" },
                  { label: "Energy", value: `${selected.energy}/10`, color: "text-amber" },
                  { label: "Productivity", value: `${selected.productivity}/10`, color: "text-emerald" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-surface-2 rounded-lg p-3 text-center">
                    <p className={`font-bold text-sm ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

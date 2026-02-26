import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Wrench, Bot, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, TrendingUp, Clock, Zap } from "lucide-react";

const WORKFLOW_ISSUES = [
  { id: 1, severity: "high", issue: "Context switching 8x/hour in afternoon block", impact: "-23% productivity", fix: "Implement 90-min deep work blocks with hard cutoffs" },
  { id: 2, severity: "medium", issue: "No clear task prioritization method", impact: "-15% task completion", fix: "Apply Eisenhower Matrix: urgent/important quadrant first" },
  { id: 3, severity: "medium", issue: "Morning routine inconsistent (3/7 days)", impact: "Low peak performance activation", fix: "Create a 10-minute minimum morning protocol" },
  { id: 4, severity: "low", issue: "No weekly planning session", impact: "Reactive work mode", fix: "Schedule 30-min Sunday review + weekly goal setting" },
];

const REFACTORED_WORKFLOW = [
  { time: "07:00 – 07:30", activity: "Morning Activation", detail: "Hydration, light exercise, 5-min journal", icon: "🌅" },
  { time: "09:00 – 11:00", activity: "Deep Work Block #1", detail: "Highest priority task, no interruptions", icon: "🎯" },
  { time: "11:00 – 11:15", activity: "Recovery Break", detail: "Walk, stretch, hydrate", icon: "☕" },
  { time: "11:15 – 12:30", activity: "Communication Block", detail: "Emails, Slack, meetings", icon: "💬" },
  { time: "13:30 – 15:30", activity: "Deep Work Block #2", detail: "Second priority task", icon: "⚡" },
  { time: "15:30 – 17:00", activity: "Admin & Review", detail: "Docs, planning, light tasks", icon: "📋" },
  { time: "17:00 – 17:15", activity: "Daily Close", detail: "Log entry, tomorrow's top 3 tasks", icon: "✅" },
];

export default function AIWorkflowRefactor() {
  const [refactoring, setRefactoring] = useState(false);
  const [refactored, setRefactored] = useState(false);
  const [score, setScore] = useState(67);

  const runRefactor = async () => {
    setRefactoring(true);
    await new Promise(r => setTimeout(r, 2000));
    setRefactoring(false);
    setRefactored(true);
    setScore(89);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan" /> AI Workflow Refactor Engine
            </h1>
            <p className="text-sm text-muted-foreground">Analyze, detect inefficiencies, and optimize your workflow</p>
          </div>
          <div className="text-center">
            <p className={`font-display text-2xl font-bold transition-all duration-700 ${refactored ? "text-gradient" : "text-amber"}`}>{score}/100</p>
            <p className="text-xs text-muted-foreground">Workflow score</p>
          </div>
        </div>

        {/* Issues detected */}
        <div className="card-surface rounded-xl p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber" /> Detected Inefficiencies
          </h3>
          <div className="space-y-3">
            {WORKFLOW_ISSUES.map(issue => (
              <div key={issue.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 border border-border">
                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  issue.severity === "high" ? "bg-rose" : issue.severity === "medium" ? "bg-amber" : "bg-muted-foreground"
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">{issue.issue}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{issue.impact}</p>
                  {refactored && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald">
                      <CheckCircle2 className="w-3 h-3" />
                      Fix: {issue.fix}
                    </div>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  issue.severity === "high" ? "bg-rose/10 text-rose" : issue.severity === "medium" ? "bg-amber/10 text-amber" : "bg-muted text-muted-foreground"
                }`}>{issue.severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Refactor button */}
        {!refactored && (
          <div className="text-center">
            <button
              onClick={runRefactor}
              disabled={refactoring}
              className="inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all glow-cyan shadow-elevated disabled:opacity-70"
            >
              {refactoring ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing workflow patterns...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  Run AI Workflow Refactor
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Refactored workflow */}
        {refactored && (
          <div className="card-surface rounded-xl p-5 border-primary/20 animate-slide-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">Optimized Workflow Template</h3>
              <span className="text-xs text-emerald bg-emerald/10 border border-emerald/20 px-2 py-0.5 rounded-full ml-auto">+22 pts improvement</span>
            </div>
            <div className="space-y-2">
              {REFACTORED_WORKFLOW.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-2 transition-colors">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div className="w-28 flex-shrink-0">
                    <span className="text-xs font-mono text-primary">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-emerald/5 border border-emerald/20 text-xs text-emerald">
              ✅ Workflow refactored. Estimated productivity improvement: <strong>+22 points</strong>. Apply this template starting tomorrow for 14 days to measure impact.
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

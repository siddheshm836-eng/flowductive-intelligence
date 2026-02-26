import { Task, KanbanColumn, LogEntry, FocusSession, AIMessage } from "@/types/index";

export const mockTasks: Task[] = [
  { id: "t1", title: "Design system architecture", description: "Plan the overall system design and component library", status: "done", priority: "high", tags: ["design", "system"], createdAt: "2025-02-10", dueDate: "2025-02-15", completedAt: "2025-02-14" },
  { id: "t2", title: "Implement authentication module", description: "JWT-based auth with bcrypt", status: "done", priority: "high", tags: ["backend", "security"], createdAt: "2025-02-12", dueDate: "2025-02-18", completedAt: "2025-02-17" },
  { id: "t3", title: "Build analytics dashboard", description: "Charts and KPI cards", status: "in-progress", priority: "high", tags: ["frontend", "analytics"], createdAt: "2025-02-15", dueDate: "2025-02-28" },
  { id: "t4", title: "Integrate AI assistant", description: "OpenAI GPT integration for productivity coaching", status: "in-progress", priority: "medium", tags: ["ai", "backend"], createdAt: "2025-02-18", dueDate: "2025-03-05" },
  { id: "t5", title: "Activity heatmap visualization", description: "GitHub-style 365-day heatmap", status: "todo", priority: "medium", tags: ["frontend", "visualization"], createdAt: "2025-02-20", dueDate: "2025-03-10" },
  { id: "t6", title: "Pomodoro focus timer", description: "Advanced focus session tracker", status: "todo", priority: "low", tags: ["frontend", "productivity"], createdAt: "2025-02-21", dueDate: "2025-03-12" },
  { id: "t7", title: "Daily log entry board", description: "Rich daily journaling system", status: "todo", priority: "medium", tags: ["frontend", "logs"], createdAt: "2025-02-22", dueDate: "2025-03-15" },
  { id: "t8", title: "Write API documentation", description: "Swagger/OpenAPI docs", status: "todo", priority: "low", tags: ["docs", "backend"], createdAt: "2025-02-23", dueDate: "2025-03-20" },
];

export const mockColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", color: "hsl(var(--muted-foreground))" },
  { id: "in-progress", title: "In Progress", color: "hsl(var(--amber))" },
  { id: "review", title: "In Review", color: "hsl(var(--violet))" },
  { id: "done", title: "Done", color: "hsl(var(--emerald))" },
];

export const mockLogs: LogEntry[] = [
  { id: "l1", date: "2025-02-26", title: "Deep work session", content: "Worked on auth module, completed JWT middleware. Feeling focused and productive.", mood: 8, energy: 7, productivity: 9, tags: ["work", "backend"], createdAt: "2025-02-26T09:00:00" },
  { id: "l2", date: "2025-02-25", title: "Design sprint day", content: "Finalized component designs. Had great flow state for 3 hours.", mood: 9, energy: 8, productivity: 8, tags: ["design", "flow"], createdAt: "2025-02-25T10:00:00" },
  { id: "l3", date: "2025-02-24", title: "Research & planning", content: "Studied analytics architecture. Planned MongoDB aggregation pipelines.", mood: 7, energy: 6, productivity: 7, tags: ["research", "planning"], createdAt: "2025-02-24T11:00:00" },
  { id: "l4", date: "2025-02-23", title: "Challenging day", content: "Struggled with complex async patterns. Took breaks. Recovered well.", mood: 5, energy: 5, productivity: 6, tags: ["work", "challenge"], createdAt: "2025-02-23T09:30:00" },
];

export const mockFocusSessions: FocusSession[] = [
  { id: "f1", date: "2025-02-26", duration: 25, type: "work", completed: true, taskTitle: "JWT Authentication" },
  { id: "f2", date: "2025-02-26", duration: 5, type: "break", completed: true },
  { id: "f3", date: "2025-02-26", duration: 25, type: "work", completed: true, taskTitle: "Dashboard Components" },
  { id: "f4", date: "2025-02-25", duration: 50, type: "work", completed: true, taskTitle: "Design System" },
  { id: "f5", date: "2025-02-24", duration: 25, type: "work", completed: true, taskTitle: "API Routes" },
];

export const mockAIMessages: AIMessage[] = [
  { id: "ai1", role: "assistant", content: "Hello Alex! I've analyzed your productivity data from the past 2 weeks. Your peak performance window is **9–11 AM**, and you complete 73% more tasks on days you log in the morning. Want me to suggest a workflow optimization?", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "ai2", role: "user", content: "Yes, please suggest a workflow for today.", timestamp: new Date(Date.now() - 3500000).toISOString() },
  { id: "ai3", role: "assistant", content: "Based on your patterns, here's your **optimal workflow for today**:\n\n1. 🎯 **9:00–11:00 AM** — Deep work block (Build Analytics Dashboard — your highest priority task)\n2. ☕ **11:00–11:15 AM** — Break\n3. 📧 **11:15–12:00 PM** — Communication & review\n4. 🍽️ **12:00–1:00 PM** — Lunch\n5. 🔧 **1:00–3:00 PM** — AI integration (medium complexity)\n6. 📖 **3:00–4:00 PM** — Documentation & planning\n\n⚠️ **Burnout risk**: Low (72/100 recovery score)\n💡 **Insight**: You haven't logged yesterday's evening routine. Consistency tracking helps me give better recommendations.", timestamp: new Date(Date.now() - 3400000).toISOString() },
];

// Analytics data
export const mockWeeklyData = [
  { day: "Mon", tasks: 4, focus: 85, mood: 8 },
  { day: "Tue", tasks: 6, focus: 92, mood: 9 },
  { day: "Wed", tasks: 3, focus: 67, mood: 6 },
  { day: "Thu", tasks: 7, focus: 95, mood: 8 },
  { day: "Fri", tasks: 5, focus: 78, mood: 7 },
  { day: "Sat", tasks: 2, focus: 45, mood: 9 },
  { day: "Sun", tasks: 1, focus: 30, mood: 8 },
];

export const mockMonthlyData = [
  { month: "Sep", score: 68 }, { month: "Oct", score: 72 }, { month: "Nov", score: 75 },
  { month: "Dec", score: 71 }, { month: "Jan", score: 80 }, { month: "Feb", score: 87 },
];

// Generate heatmap data
export function generateHeatmapData() {
  const data: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 5);
    data.push({ date: dateStr, count });
  }
  return data;
}

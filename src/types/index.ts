// Workflow / Kanban types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
}

// Log Entry types
export interface LogEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: number;
  energy: number;
  productivity: number;
  tags: string[];
  createdAt: string;
}

// Focus Session types
export interface FocusSession {
  id: string;
  date: string;
  duration: number;
  type: "work" | "break" | "long-break";
  completed: boolean;
  taskTitle?: string;
}

// AI types
export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Analytics types
export interface AnalyticsSummary {
  productivityScore: number;
  taskCompletionRate: number;
  weeklyActivityScore: number;
  habitConsistency: number;
  focusEfficiency: number;
  burnoutRisk: number;
  moodAverage: number;
}

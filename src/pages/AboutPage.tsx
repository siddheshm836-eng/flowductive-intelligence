import AppLayout from "@/components/AppLayout";
import { Server, Database, Shield, Brain, Users, Layers, ArrowDown, Globe, Zap, Code2, BarChart3, Bot, CheckCircle2 } from "lucide-react";

const sections = [
  {
    id: "what",
    icon: Zap,
    color: "text-cyan",
    bg: "bg-cyan/10",
    title: "What Flowductive Does",
    content: [
      "Flowductive is an **intelligent productivity and workflow management platform** that unifies structured task execution, AI-driven optimization, behavioral tracking, and analytics into a single cohesive system.",
      "It tracks tasks, habits, focus sessions, and daily logs — then uses AI to analyze patterns and generate actionable performance insights. The GitHub-style activity heatmap provides a 365-day visualization of behavioral consistency.",
    ],
    bullets: ["Task execution & Kanban workflow management", "Focus sessions with Pomodoro intelligence", "AI-generated productivity optimization", "365-day behavioral heatmap tracking", "Advanced analytics with burnout detection"],
  },
  {
    id: "who",
    icon: Users,
    color: "text-violet",
    bg: "bg-violet/10",
    title: "Who It Helps",
    content: ["Flowductive is designed for high-performance individuals who want data-driven insights into their productivity patterns."],
    bullets: ["🎓 Students managing study schedules and deadlines", "💻 Developers managing complex projects and sprints", "🚀 Freelancers handling multiple client workflows", "📊 Professionals optimizing daily execution systems", "🏆 Anyone building long-term consistency and discipline"],
  },
  {
    id: "frontend",
    icon: Code2,
    color: "text-amber",
    bg: "bg-amber/10",
    title: "How the Frontend Works",
    content: ["Built with **React + Vite + TypeScript** using a component-based architecture. Global state is managed through Context API (AuthContext). Protected routes guard all core modules — unauthenticated users are redirected to login."],
    bullets: ["React + Vite + TypeScript for fast, typed development", "Context API for authentication state management", "Protected route HOC for secure navigation", "Axios-based API service with auto Authorization headers", "Recharts for dynamic analytics visualizations", "React Router for SPA navigation: Landing → Login → Dashboard → Modules"],
  },
  {
    id: "backend",
    icon: Server,
    color: "text-emerald",
    bg: "bg-emerald/10",
    title: "How the Backend Works",
    content: ["The backend is a **Node.js + Express REST API** following MVC architecture. Every private route is protected by JWT middleware that validates tokens and enforces user ownership. MongoDB Atlas provides cloud-hosted data persistence."],
    bullets: ["Express.js with MVC architecture (routes → controllers → models)", "JWT middleware on every protected endpoint", "bcrypt password hashing (10+ salt rounds)", "Helmet + express-rate-limit for security hardening", "Morgan for HTTP request logging", "Centralized error handler with proper HTTP status codes", "MongoDB aggregation pipelines for analytics queries"],
  },
  {
    id: "database",
    icon: Database,
    color: "text-cyan",
    bg: "bg-cyan/10",
    title: "Database Structure",
    content: ["MongoDB Atlas stores all user data. Every model includes a `userId` field and all queries are user-scoped, ensuring complete data isolation between accounts."],
    bullets: ["**User** — name, email, password (hashed), role, createdAt, lastLogin", "**Task** — title, description, status, priority, tags, dueDate, userId", "**Activity** — date, count, type, userId (powers heatmap)", "**FocusSession** — duration, type, taskTitle, completed, userId", "**LogEntry** — date, title, content, mood, energy, productivity, userId", "**AIConversation** — messages[], model, createdAt, userId", "**WellnessProfile** — habits[], streaks[], consistency, userId"],
  },
  {
    id: "ai",
    icon: Bot,
    color: "text-violet",
    bg: "bg-violet/10",
    title: "AI Integration",
    content: ["The AI layer analyzes aggregated user data from MongoDB to detect patterns, generate optimization suggestions, and refactor workflows. Chat history is stored in the AIConversation collection for context-aware responses."],
    bullets: ["AI Assistant: productivity coaching & schedule optimization", "Habit Coach: behavioral pattern detection & streak analysis", "Workflow Refactor Engine: detects inefficiencies, proposes optimized templates", "Life & Fitness Optimizer: wellness tracking & recovery scoring", "Burnout Risk Indicator: multi-factor fatigue detection algorithm"],
  },
  {
    id: "howto",
    icon: CheckCircle2,
    color: "text-emerald",
    bg: "bg-emerald/10",
    title: "How to Use Flowductive",
    content: ["Follow these steps to get maximum value from the platform:"],
    bullets: ["1️⃣ **Register** your account on the landing page", "2️⃣ **Login** to access your private workspace", "3️⃣ **Add tasks** and organize them on the Workflow Kanban Board", "4️⃣ **Start Focus Sessions** for deep work tracking", "5️⃣ **Log daily entries** with mood, energy, and productivity scores", "6️⃣ **Chat with the AI Assistant** for personalized recommendations", "7️⃣ **Review Analytics** dashboard for weekly performance insights", "8️⃣ **Track habits** with the AI Habit Coach for consistency", "9️⃣ **Run Workflow Refactor** to detect and fix inefficiencies"],
  },
];

const architectureLayers = [
  { label: "React Frontend", desc: "Components, Context API, Protected Routes, Axios", icon: Globe, color: "text-cyan", border: "border-cyan/30" },
  { label: "↓ REST API Calls (JWT Auth)", desc: "", icon: ArrowDown, color: "text-muted-foreground", border: "border-transparent" },
  { label: "Express Backend", desc: "MVC, Middleware, Controllers, Rate Limiting", icon: Server, color: "text-amber", border: "border-amber/30" },
  { label: "↓ Mongoose ODM", desc: "", icon: ArrowDown, color: "text-muted-foreground", border: "border-transparent" },
  { label: "MongoDB Atlas", desc: "Users, Tasks, Sessions, Logs, AI Conversations", icon: Database, color: "text-violet", border: "border-violet/30" },
  { label: "↓ Aggregation Pipelines", desc: "", icon: ArrowDown, color: "text-muted-foreground", border: "border-transparent" },
  { label: "Analytics Engine", desc: "Productivity Score, Burnout Risk, Habit Consistency", icon: BarChart3, color: "text-emerald", border: "border-emerald/30" },
  { label: "↓ Pattern Analysis", desc: "", icon: ArrowDown, color: "text-muted-foreground", border: "border-transparent" },
  { label: "AI Optimization Layer", desc: "GPT-Powered Coaching, Workflow Refactoring, Predictions", icon: Brain, color: "text-cyan", border: "border-cyan/30" },
];

function renderContent(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
  );
}

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" /> System Documentation v1.0
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            About <span className="text-gradient">Flowductive</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            Complete technical documentation explaining the architecture, modules, and intelligence behind the Flowductive productivity platform.
          </p>
        </div>

        {/* Sections */}
        {sections.map(({ id, icon: Icon, color, bg, title, content, bullets }) => (
          <div key={id} className="card-surface rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
            </div>
            {content.map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{renderContent(p)}</p>
            ))}
            <ul className="space-y-2 mt-4">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${color.replace("text-", "bg-")}`} />
                  <span>{renderContent(b)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Architecture Diagram */}
        <div className="card-surface rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground">System Architecture</h2>
          </div>
          <div className="flex flex-col items-center gap-1">
            {architectureLayers.map(({ label, desc, icon: Icon, color, border }, i) => {
              const isArrow = border === "border-transparent";
              return (
                <div key={i} className={`${isArrow ? "py-1" : `w-full max-w-md border ${border} rounded-xl p-4 bg-surface-2`} flex items-center gap-3`}>
                  {!isArrow && (
                    <>
                      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                      <div>
                        <p className={`text-sm font-semibold ${color}`}>{label}</p>
                        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
                      </div>
                    </>
                  )}
                  {isArrow && <p className="text-xs text-muted-foreground mx-auto font-mono">{label}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact */}
        <div className="card-surface rounded-2xl p-6 md:p-8 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-cyan">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground">Real-World Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Encourages Consistency", "Daily tracking and streaks build discipline through positive reinforcement loops."],
              ["Prevents Burnout", "Multi-factor burnout risk scoring detects fatigue before it impacts performance."],
              ["Data-Driven Productivity", "Every recommendation is backed by your own behavioral data, not generic advice."],
              ["Combines Execution + Intelligence", "Unlike simple task managers, Flowductive pairs doing with understanding why."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

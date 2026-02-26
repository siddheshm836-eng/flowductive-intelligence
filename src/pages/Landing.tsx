import { Link } from "react-router-dom";
import { Zap, ArrowRight, BarChart3, Bot, Kanban, Timer, Activity, Shield, Brain, TrendingUp, Star, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const features = [
  { icon: Kanban, title: "Workflow Board", desc: "Visual Kanban boards for structured task execution and project management.", color: "text-cyan" },
  { icon: Bot, title: "AI Assistant", desc: "GPT-powered productivity coach that analyzes your patterns and optimizes performance.", color: "text-violet" },
  { icon: BarChart3, title: "Analytics Engine", desc: "Deep insights into productivity scores, burnout risk, focus efficiency and habits.", color: "text-emerald" },
  { icon: Timer, title: "Focus Timer", desc: "Pomodoro-based focus sessions with smart break recommendations.", color: "text-amber" },
  { icon: Activity, title: "Activity Heatmap", desc: "GitHub-style 365-day behavioral consistency tracker.", color: "text-rose" },
  { icon: Brain, title: "AI Habit Coach", desc: "Behavioral intelligence that detects burnout, suggests routines and builds discipline.", color: "text-cyan" },
];

const stats = [
  { value: "10+", label: "Core Modules" },
  { value: "AI", label: "Powered Engine" },
  { value: "365", label: "Day Tracking" },
  { value: "100%", label: "Data-Driven" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-cyan">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground tracking-wide">FLOWDUCTIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <Link to="/about" className="hover:text-foreground transition-colors">Docs</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Sign in
            </Link>
            <Link to="/register" className="text-sm font-medium bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity glow-cyan">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-slide-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            AI-Powered Productivity Intelligence System
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Work Smarter.<br />
            <span className="text-gradient">Flow Deeper.</span><br />
            Achieve More.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            FLOWDUCTIVE combines structured task execution, AI-driven optimization, behavioral analytics, and habit intelligence into one unified productivity system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all glow-cyan shadow-elevated"
            >
              Start Free Today
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-foreground px-8 py-3.5 rounded-xl border border-border hover:bg-surface-1 transition-all"
            >
              Sign in to Dashboard
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl font-bold text-gradient">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Every tool you need to <span className="text-gradient">maximize flow state</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Twelve integrated modules working together to turn your daily activity into measurable performance gains.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-surface rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
                <div className={`w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center card-surface rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse-glow" />
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to enter <span className="text-gradient">your flow state?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join professionals, developers, and students building better habits with intelligent productivity tracking.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all glow-cyan"
            >
              <Zap className="w-4 h-4" />
              Start Building Your System
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm">FLOWDUCTIVE</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Flowductive. AI-Powered Productivity System.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">Architecture</Link>
            <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

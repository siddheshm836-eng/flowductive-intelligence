import { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { mockAIMessages } from "@/data/mockData";
import { AIMessage } from "@/types/index";
import { Bot, Send, Brain, Sparkles, TrendingUp, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";

const QUICK_PROMPTS = [
  "Analyze my productivity this week",
  "Suggest an optimal daily schedule",
  "What's my biggest productivity blocker?",
  "How can I improve my focus sessions?",
];

const AI_RESPONSES = [
  "Based on your data, your **key productivity blocker** is context-switching. You switch tasks an average of **8 times per hour** during your 2–4 PM window. Recommendation: implement a hard block of 90-minute deep work sessions in the afternoon.\n\n💡 **Quick win**: Set your phone to DND mode from 2–4 PM and disable notifications during that block.",
  "Your **optimal daily schedule** based on cognitive performance patterns:\n\n- **7:00 AM** — Morning routine + journaling (10 min)\n- **9:00–11:00 AM** — Deep work block #1 (your biological peak)\n- **11:00 AM** — Review + communication\n- **1:00–3:00 PM** — Collaborative work\n- **3:00–5:00 PM** — Deep work block #2\n- **5:00 PM** — Daily review & log entry",
  "This week your **top 3 focus hours** were 9–10 AM (96 score), 10–11 AM (94 score), and 2–3 PM (89 score). You completed **6 high-priority tasks**, 2 more than last week.\n\n📈 **Improvement**: +8% task completion, +5 productivity score.",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>(mockAIMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const responseIdx = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: AIMessage = {
      id: "m_" + Date.now(),
      role: "user",
      content: msg,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg: AIMessage = {
      id: "m_" + Date.now() + "_ai",
      role: "assistant",
      content: AI_RESPONSES[responseIdx.current % AI_RESPONSES.length],
      timestamp: new Date().toISOString(),
    };
    responseIdx.current++;
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan" /> AI Productivity Assistant
            </h1>
            <p className="text-sm text-muted-foreground">Powered by behavioral intelligence</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald bg-emerald/10 border border-emerald/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            AI Online
          </div>
        </div>

        {/* Quick prompts */}
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_PROMPTS.map(p => (
            <button key={p} onClick={() => sendMessage(p)} className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all">
              {p}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 card-surface rounded-2xl overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                msg.role === "assistant" ? "bg-gradient-primary glow-cyan" : "bg-surface-3 border border-border"
              }`}>
                {msg.role === "assistant" ? <Sparkles className="w-4 h-4 text-primary-foreground" /> : <span className="text-xs font-bold text-muted-foreground">You</span>}
              </div>
              <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "assistant" ? "bg-surface-2 border border-border text-foreground" : "bg-primary/10 border border-primary/20 text-foreground"
              }`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-surface-2 border border-border rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            className="flex-1 bg-surface-1 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-all"
            placeholder="Ask about your productivity, habits, workflow..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground glow-cyan hover:opacity-90 transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

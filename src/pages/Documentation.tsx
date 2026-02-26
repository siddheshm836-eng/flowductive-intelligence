import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { FileText, Plus, Search, BookOpen, Edit3, X, Check, Tag } from "lucide-react";

interface Doc {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

const initialDocs: Doc[] = [
  { id: "d1", title: "System Architecture Notes", content: "Frontend: React + Vite + TypeScript\nBackend: Express + MongoDB Atlas\nAuth: JWT + bcrypt\nAnalytics: MongoDB aggregation pipelines", tags: ["architecture", "tech"], updatedAt: "2025-02-25" },
  { id: "d2", title: "Daily Workflow Protocol", content: "1. Morning review (15 min)\n2. Top 3 tasks for the day\n3. Deep work blocks\n4. Evening log entry\n5. Tomorrow planning", tags: ["workflow", "personal"], updatedAt: "2025-02-24" },
  { id: "d3", title: "API Endpoints Reference", content: "POST /api/auth/login\nGET /api/tasks\nPOST /api/tasks\nGET /api/analytics/summary\nGET /api/focus-sessions", tags: ["api", "reference"], updatedAt: "2025-02-22" },
];

export default function Documentation() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Doc | null>(null);
  const [creating, setCreating] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", content: "", tags: "" });

  const filtered = docs.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const saveDoc = () => {
    if (!newDoc.title) return;
    const doc: Doc = {
      id: "d_" + Date.now(),
      title: newDoc.title,
      content: newDoc.content,
      tags: newDoc.tags.split(",").map(t => t.trim()).filter(Boolean),
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setDocs(prev => [doc, ...prev]);
    setCreating(false);
    setNewDoc({ title: "", content: "", tags: "" });
  };

  const saveEdit = () => {
    if (!editing) return;
    setDocs(prev => prev.map(d => d.id === editing.id ? { ...editing, updatedAt: new Date().toISOString().split("T")[0] } : d));
    setEditing(null);
  };

  return (
    <AppLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan" /> Documentation Workspace
            </h1>
            <p className="text-sm text-muted-foreground">{docs.length} documents</p>
          </div>
          <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 glow-cyan">
            <Plus className="w-4 h-4" /> New Doc
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-1 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-all"
            placeholder="Search documents..." />
        </div>

        {/* Create form */}
        {creating && (
          <div className="card-surface rounded-xl p-5 border-primary/20">
            <h3 className="font-display font-semibold text-foreground mb-4">New Document</h3>
            <div className="space-y-3">
              <input value={newDoc.title} onChange={e => setNewDoc(n => ({ ...n, title: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                placeholder="Document title..." />
              <textarea value={newDoc.content} onChange={e => setNewDoc(n => ({ ...n, content: e.target.value }))}
                rows={6}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none font-mono"
                placeholder="Document content..." />
              <input value={newDoc.tags} onChange={e => setNewDoc(n => ({ ...n, tags: e.target.value }))}
                className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                placeholder="Tags: architecture, notes, reference" />
              <div className="flex gap-2">
                <button onClick={saveDoc} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
                  <Check className="w-4 h-4" /> Save
                </button>
                <button onClick={() => setCreating(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Docs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(doc => (
            <div key={doc.id} className="card-surface rounded-xl p-5 hover:border-primary/20 transition-all group">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{doc.title}</h3>
                <button onClick={() => setEditing({ ...doc })} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-4 font-sans mb-3">{doc.content}</pre>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map(tag => (
                    <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-surface-2 text-muted-foreground flex items-center gap-0.5">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{doc.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Edit modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
            <div className="card-surface rounded-2xl p-6 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">Edit Document</h2>
                <button onClick={() => setEditing(null)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                <input value={editing.title} onChange={e => setEditing(d => d ? { ...d, title: e.target.value } : d)}
                  className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/40" />
                <textarea value={editing.content} onChange={e => setEditing(d => d ? { ...d, content: e.target.value } : d)}
                  rows={10}
                  className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/40 resize-none font-mono" />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
                    <Check className="w-4 h-4" /> Save Changes
                  </button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

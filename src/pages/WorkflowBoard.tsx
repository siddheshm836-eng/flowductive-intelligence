import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { mockTasks, mockColumns } from "@/data/mockData";
import { Task } from "@/types/index";
import { Plus, MoreHorizontal, Flag, Tag, Calendar, X, Check } from "lucide-react";

export default function WorkflowBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dragTask, setDragTask] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status);

  const addTask = (colId: string) => {
    if (!newTaskTitle.trim()) return;
    const task: Task = {
      id: "t_" + Date.now(),
      title: newTaskTitle.trim(),
      description: "",
      status: colId as Task["status"],
      priority: "medium",
      tags: [],
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, task]);
    setNewTaskTitle("");
    setShowAddTask(null);
  };

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as Task["status"] } : t));
  };

  const handleDrop = (colId: string) => {
    if (dragTask) moveTask(dragTask, colId);
    setDragTask(null);
    setDragOver(null);
  };

  const priorityColor: Record<string, string> = {
    high: "text-rose bg-rose/10",
    medium: "text-amber bg-amber/10",
    low: "text-emerald bg-emerald/10",
  };

  return (
    <AppLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Workflow Board</h1>
            <p className="text-sm text-muted-foreground">{tasks.length} tasks across {mockColumns.length} stages</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-surface-1 border border-border">Drag to move</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-4">
          {mockColumns.map(col => {
            const colTasks = getTasksByStatus(col.id);
            return (
              <div
                key={col.id}
                className={`flex flex-col rounded-xl border transition-all duration-200 min-h-[400px] ${
                  dragOver === col.id ? "border-primary/40 bg-primary/5" : "border-border bg-surface-1"
                }`}
                onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
                onDrop={() => handleDrop(col.id)}
                onDragLeave={() => setDragOver(null)}
              >
                {/* Column header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                    <span className="font-display font-semibold text-sm text-foreground">{col.title}</span>
                    <span className="text-xs text-muted-foreground bg-surface-2 rounded-full px-2 py-0.5">{colTasks.length}</span>
                  </div>
                  <button
                    onClick={() => setShowAddTask(col.id)}
                    className="w-6 h-6 rounded-md hover:bg-surface-2 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tasks */}
                <div className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin">
                  {colTasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDragTask(task.id)}
                      onDragEnd={() => setDragTask(null)}
                      className={`card-surface-2 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-border/80 transition-all group ${
                        dragTask === task.id ? "opacity-50 scale-95" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm text-foreground leading-snug font-medium">{task.title}</p>
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5" />
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
                      )}
                      <div className="flex items-center flex-wrap gap-1.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${priorityColor[task.priority]}`}>
                          <Flag className="w-2.5 h-2.5 inline mr-0.5" />{task.priority}
                        </span>
                        {task.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-surface-3 text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-0.5">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add task inline */}
                  {showAddTask === col.id && (
                    <div className="card-surface-2 rounded-lg p-3">
                      <input
                        autoFocus
                        value={newTaskTitle}
                        onChange={e => setNewTaskTitle(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addTask(col.id)}
                        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none mb-2"
                        placeholder="Task title..."
                      />
                      <div className="flex gap-1.5">
                        <button onClick={() => addTask(col.id)} className="flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:opacity-90">
                          <Check className="w-3 h-3" /> Add
                        </button>
                        <button onClick={() => setShowAddTask(null)} className="p-1 rounded hover:bg-surface-3 text-muted-foreground">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WorkflowBoard from "./pages/WorkflowBoard";
import DailyLogs from "./pages/DailyLogs";
import Documentation from "./pages/Documentation";
import FocusTimer from "./pages/FocusTimer";
import ActivityHeatmap from "./pages/ActivityHeatmap";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
import AIHabitCoach from "./pages/AIHabitCoach";
import AIWorkflowRefactor from "./pages/AIWorkflowRefactor";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/workflow" element={<ProtectedRoute><WorkflowBoard /></ProtectedRoute>} />
            <Route path="/logs" element={<ProtectedRoute><DailyLogs /></ProtectedRoute>} />
            <Route path="/docs" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
            <Route path="/focus" element={<ProtectedRoute><FocusTimer /></ProtectedRoute>} />
            <Route path="/heatmap" element={<ProtectedRoute><ActivityHeatmap /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
            <Route path="/ai-coach" element={<ProtectedRoute><AIHabitCoach /></ProtectedRoute>} />
            <Route path="/ai-refactor" element={<ProtectedRoute><AIWorkflowRefactor /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

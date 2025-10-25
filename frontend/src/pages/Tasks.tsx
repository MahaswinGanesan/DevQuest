import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Plus, CheckSquare } from "lucide-react";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Pick up groceries",
      group: "Roommates",
      dueDate: "Today",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Book movie tickets",
      group: "Movie Club",
      dueDate: "Tomorrow",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Submit group project",
      group: "Study Group",
      dueDate: "Oct 28",
      priority: "high",
      completed: false,
    },
    {
      id: 4,
      title: "Plan weekend trip",
      group: "Friends",
      dueDate: "Oct 30",
      priority: "low",
      completed: true,
    },
  ];

  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-accent text-accent-foreground",
    low: "bg-secondary text-secondary-foreground",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Smart Shared Life
            </h1>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tasks</h2>
              <p className="text-muted-foreground">Coordinate tasks across your groups</p>
            </div>
            <Link to="/tasks/new">
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Tasks</p>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Pending</p>
              <p className="text-3xl font-bold text-accent">
                {tasks.filter((t) => !t.completed).length}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Completed</p>
              <p className="text-3xl font-bold text-secondary">
                {tasks.filter((t) => t.completed).length}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Due Today</p>
              <p className="text-3xl font-bold text-destructive">
                {tasks.filter((t) => t.dueDate === "Today").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks
                  .filter((task) => !task.completed)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Checkbox id={`task-${task.id}`} className="mt-1" />
                      <div className="flex-1">
                        <label
                          htmlFor={`task-${task.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {task.title}
                        </label>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${priorityColors[task.priority]}`}
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{task.group}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Recently finished tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.completed)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      <Checkbox id={`task-${task.id}`} checked className="mt-1" />
                      <div className="flex-1 opacity-60">
                        <p className="font-medium line-through">{task.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {task.priority}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{task.group}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;

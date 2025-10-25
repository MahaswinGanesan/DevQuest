import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-image.jpg";
import expenseIcon from "@/assets/expense-icon.png";
import tasksIcon from "@/assets/tasks-icon.png";
import groupsIcon from "@/assets/groups-icon.png";
import { Users, Receipt, CheckSquare, Vote, BookOpen, Bell } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Smart Shared Life
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Share Life,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Split Smart
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Your privacy-conscious companion for group expenses, tasks, decisions, and memories.
                Coordinate seamlessly with friends, roommates, and teams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg">
                    Start Free Today
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Friends sharing a meal together"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Everything You Need</h3>
            <p className="text-muted-foreground text-lg">
              Powerful tools to manage shared life, all in one place
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4">
                  <img src={expenseIcon} alt="Expense splitting" className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold">Smart Expense Splitting</h4>
                <p className="text-muted-foreground">
                  Create bills, assign participants, and track settlements with automated reminders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <img src={tasksIcon} alt="Task management" className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold">Predictive Reminders</h4>
                <p className="text-muted-foreground">
                  Never miss deadlines with smart, context-aware nudges that adapt to your behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
                  <img src={groupsIcon} alt="Group collaboration" className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold">Group Coordination</h4>
                <p className="text-muted-foreground">
                  Create groups, invite members, and collaborate on tasks without reputation tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Vote className="w-10 h-10 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold">Democratic Polls</h4>
                <p className="text-muted-foreground">
                  Resolve decisions together with voting and auto-resolution when quorum is reached.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-secondary-foreground" />
                </div>
                <h4 className="text-xl font-semibold">Shared Memories</h4>
                <p className="text-muted-foreground">
                  Journal entries and searchable timeline to capture and revisit shared moments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-10 h-10 text-accent-foreground" />
                </div>
                <h4 className="text-xl font-semibold">Privacy First</h4>
                <p className="text-muted-foreground">
                  Your data stays private. No reputation tracking, just neutral task coordination.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-background opacity-95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl lg:text-5xl font-bold">
              Ready to Simplify Shared Life?
            </h3>
            <p className="text-lg text-muted-foreground">
              Join thousands of groups already coordinating better with Smart Shared Life Companion.
            </p>
            <Link to="/auth">
              <Button variant="hero" size="lg" className="text-lg px-12">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">Smart Shared Life</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Smart Shared Life. Privacy-conscious group management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

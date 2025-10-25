import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, ArrowLeft, Plus, BarChart3 } from "lucide-react";

const Polls = () => {
  const polls = [
    {
      id: 1,
      question: "Where should we go for dinner this weekend?",
      group: "Friends",
      status: "active",
      totalVotes: 4,
      options: [
        { text: "Italian Restaurant", votes: 2, percentage: 50 },
        { text: "Sushi Place", votes: 1, percentage: 25 },
        { text: "BBQ Joint", votes: 1, percentage: 25 },
      ],
      deadline: "2025-10-27",
    },
    {
      id: 2,
      question: "What movie should we watch on Friday?",
      group: "Movie Club",
      status: "active",
      totalVotes: 6,
      options: [
        { text: "Action Thriller", votes: 3, percentage: 50 },
        { text: "Comedy", votes: 2, percentage: 33 },
        { text: "Drama", votes: 1, percentage: 17 },
      ],
      deadline: "2025-10-26",
    },
    {
      id: 3,
      question: "Preferred study time for group session?",
      group: "Study Group",
      status: "closed",
      totalVotes: 4,
      options: [
        { text: "Morning (9-12)", votes: 3, percentage: 75 },
        { text: "Afternoon (2-5)", votes: 1, percentage: 25 },
        { text: "Evening (6-9)", votes: 0, percentage: 0 },
      ],
      deadline: "2025-10-23",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
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
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Polls</h2>
              <p className="text-muted-foreground">Make group decisions democratically</p>
            </div>
            <Link to="/polls/new">
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                New Poll
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {polls.map((poll) => (
            <Card key={poll.id} className="shadow-md border-0">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={poll.status === "active" ? "default" : "secondary"}>
                        {poll.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{poll.group}</span>
                    </div>
                    <CardTitle className="text-lg">{poll.question}</CardTitle>
                    <CardDescription className="mt-1">
                      {poll.totalVotes} {poll.totalVotes === 1 ? "vote" : "votes"} • Deadline: {poll.deadline}
                    </CardDescription>
                  </div>
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center shrink-0">
                    <BarChart3 className="h-5 w-5 text-accent-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {poll.options.map((option, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{option.text}</span>
                        <span className="text-muted-foreground">
                          {option.votes} ({option.percentage}%)
                        </span>
                      </div>
                      <Progress value={option.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                {poll.status === "active" && (
                  <Button variant="outline" className="w-full mt-4">
                    Cast Your Vote
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Polls;

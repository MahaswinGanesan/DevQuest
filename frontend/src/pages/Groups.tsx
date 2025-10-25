import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, ArrowLeft } from "lucide-react";

const Groups = () => {
  const groups = [
    { id: 1, name: "Friends", members: 5, balance: "$45.00", tasks: 3, color: "bg-gradient-primary" },
    { id: 2, name: "Roommates", members: 3, balance: "$120.50", tasks: 5, color: "bg-gradient-secondary" },
    { id: 3, name: "Movie Club", members: 8, balance: "$0.00", tasks: 1, color: "bg-gradient-accent" },
    { id: 4, name: "Study Group", members: 4, balance: "$25.00", tasks: 7, color: "bg-gradient-primary" },
  ];

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
              <h2 className="text-3xl font-bold mb-2">Your Groups</h2>
              <p className="text-muted-foreground">Manage and coordinate with your groups</p>
            </div>
            <Link to="/groups/new">
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-10" />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Link key={group.id} to={`/groups/${group.id}`}>
              <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 ${group.color} rounded-xl flex items-center justify-center`}>
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">{group.members} members</span>
                  </div>
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <CardDescription>Active group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-semibold text-accent">{group.balance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Tasks</span>
                      <span className="font-semibold">{group.tasks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;

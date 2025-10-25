import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Plus, Mail, DollarSign, ImagePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const GroupDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  // Polls state
  type Poll = { id: string; question: string; options: { id?: string; text: string; votes?: number }[]; createdAt?: string };
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loadingPolls, setLoadingPolls] = useState(false);
  const [showPollDialog, setShowPollDialog] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [creatingPoll, setCreatingPoll] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchPolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPolls = async () => {
    if (!id) return;
    setLoadingPolls(true);
    try {
      const res = await fetch(`/api/groups/${id}/polls`);
      if (!res.ok) throw new Error("Failed to load polls");
      const data = await res.json();
      setPolls(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPolls(false);
    }
  };

  const addPollOption = () => setPollOptions((s) => [...s, ""]);
  const updatePollOption = (index: number, value: string) =>
    setPollOptions((s) => s.map((o, i) => (i === index ? value : o)));
  const removePollOption = (index: number) =>
    setPollOptions((s) => s.filter((_, i) => i !== index));

  const handleCreatePoll = async () => {
    if (!id) return;
    const payload = {
      question: pollQuestion.trim(),
      options: pollOptions.map((o) => o.trim()).filter(Boolean),
    };
    if (!payload.question || payload.options.length < 2) {
      toast({ title: "Invalid poll", description: "Enter a question and at least two options." });
      return;
    }
    setCreatingPoll(true);
    try {
      const res = await fetch(`/api/groups/${id}/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create poll failed");
      toast({ title: "Poll created", description: "Poll has been added to the group." });
      setShowPollDialog(false);
      setPollQuestion("");
      setPollOptions(["", ""]);
      await fetchPolls();
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to create poll." });
    } finally {
      setCreatingPoll(false);
    }
  };

  // Mock data
  const group = {
    id: id,
    name: "Friends",
    description: "Weekend hangout crew",
    members: [
      { id: 1, name: "John Doe", email: "john@example.com", avatar: "", balance: 45.00, role: "admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "", balance: -25.00, role: "member" },
      { id: 3, name: "Mike Johnson", email: "mike@example.com", avatar: "", balance: -20.00, role: "member" },
    ],
    splits: [
      { id: 1, description: "Dinner at Italian Place", amount: 120.00, paidBy: "John Doe", date: "2024-01-15", settled: false },
      { id: 2, description: "Movie tickets", amount: 60.00, paidBy: "Jane Smith", date: "2024-01-12", settled: true },
      { id: 3, description: "Grocery shopping", amount: 85.50, paidBy: "John Doe", date: "2024-01-10", settled: false },
    ],
    memories: [
      { id: 1, description: "Amazing sunset at the beach 🌅", date: "2024-01-14", photos: 3, author: "Jane Smith" },
      { id: 2, description: "First group meetup! Had so much fun", date: "2024-01-05", photos: 5, author: "John Doe" },
    ],
  };

  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return;
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${newMemberEmail}`,
    });
    setNewMemberEmail("");
  };

  const handleAddMemory = () => {
    if (!memoryDescription.trim()) return;
    toast({
      title: "Memory added",
      description: "Your memory has been saved to the group",
    });
    setMemoryDescription("");
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
          <Link to="/groups">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Groups
            </Button>
          </Link>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{group.name}</h2>
              <p className="text-muted-foreground">{group.description}</p>
              <Badge variant="secondary" className="mt-2">{group.members.length} members</Badge>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          {/* make tabs responsive and match the actual number of triggers */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="splits">Splits</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
            <TabsTrigger value="polls">Polls ({polls.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Group activity summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Expenses</span>
                    <span className="font-semibold text-xl">${group.splits.reduce((sum, s) => sum + s.amount, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pending Settlements</span>
                    <span className="font-semibold">{group.splits.filter(s => !s.settled).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Memories</span>
                    <span className="font-semibold">{group.memories.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates in the group</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.splits.slice(0, 3).map((split) => (
                    <div key={split.id} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium">{split.description}</p>
                        <p className="text-muted-foreground text-xs">{split.date}</p>
                      </div>
                      <span className="font-semibold">${split.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Group Members</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="hero" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join this group
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        type="email"
                        placeholder="member@example.com"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddMember} className="w-full" variant="hero">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Invitation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.members.map((member) => (
                <Card key={member.id} className="shadow-md border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{member.name}</CardTitle>
                          {member.role === "admin" && (
                            <Badge variant="secondary" className="text-xs">Admin</Badge>
                          )}
                        </div>
                        <CardDescription className="text-xs">{member.email}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className={`font-semibold ${member.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {member.balance >= 0 ? '+' : ''}${member.balance.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Splits Tab */}
          <TabsContent value="splits" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Expense Splits</h3>
              <Link to="/expenses/new">
                <Button variant="hero" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Expense
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {group.splits.map((split) => (
                <Card key={split.id} className="shadow-md border-0">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{split.description}</CardTitle>
                        <CardDescription className="mt-1">
                          Paid by {split.paidBy} • {split.date}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">${split.amount.toFixed(2)}</p>
                        <Badge variant={split.settled ? "default" : "secondary"} className="mt-1">
                          {split.settled ? "Settled" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>Split among {group.members.length} members</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Memories Tab */}
          <TabsContent value="memories" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Shared Memories</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="hero" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Memory
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Memory</DialogTitle>
                    <DialogDescription>
                      Share a special moment with your group
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="What made this moment special?"
                        rows={4}
                        value={memoryDescription}
                        onChange={(e) => setMemoryDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Photos (Optional)</label>
                      <Button variant="outline" className="w-full">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Upload Photos
                      </Button>
                    </div>
                    <Button onClick={handleAddMemory} className="w-full" variant="hero">
                      Save Memory
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {group.memories.map((memory) => (
                <Card key={memory.id} className="shadow-md border-0">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-secondary text-primary-foreground text-xs">
                            {memory.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{memory.author}</p>
                          <p className="text-xs text-muted-foreground">{memory.date}</p>
                        </div>
                      </div>
                      {memory.photos > 0 && (
                        <Badge variant="secondary">
                          {memory.photos} photos
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base text-foreground">
                      {memory.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Polls Tab */}
          <TabsContent value="polls" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Group Polls</h3>
              <Button variant="hero" size="sm" onClick={() => setShowPollDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Poll
              </Button>
            </div>

            {loadingPolls ? (
              <p>Loading polls...</p>
            ) : polls.length === 0 ? (
              <p className="text-sm text-muted-foreground">No polls yet.</p>
            ) : (
              <div className="space-y-3">
                {polls.map((p) => (
                  <Card key={p.id} className="shadow-md border-0">
                    <CardHeader>
                      <CardTitle className="text-base">{p.question}</CardTitle>
                      <CardDescription className="text-xs">{p.createdAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {p.options.map((o, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{o.text}</span>
                            <span className="text-muted-foreground">{o.votes ?? 0} votes</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Poll create dialog */}
            <Dialog open={showPollDialog} onOpenChange={setShowPollDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Poll</DialogTitle>
                  <DialogDescription>Add a question and options for the group poll</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 pt-4">
                  <Input placeholder="Poll question" value={pollQuestion} onChange={(e) => setPollQuestion(e.target.value)} />
                  <div className="space-y-2">
                    {pollOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input value={opt} onChange={(e) => updatePollOption(idx, e.target.value)} placeholder={`Option ${idx + 1}`} />
                        {pollOptions.length > 2 && (
                          <Button variant="ghost" onClick={() => removePollOption(idx)}>Remove</Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={addPollOption}>Add option</Button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowPollDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreatePoll} disabled={creatingPoll}>{creatingPoll ? "Creating..." : "Create Poll"}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetails;

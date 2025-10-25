import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Plus, Receipt } from "lucide-react";

const Expenses = () => {
  const expenses = [
    {
      id: 1,
      title: "Dinner at Olive Garden",
      amount: 150.0,
      paidBy: "John",
      split: 5,
      status: "pending",
      group: "Friends",
      date: "2025-10-24",
    },
    {
      id: 2,
      title: "Grocery Shopping",
      amount: 85.5,
      paidBy: "Sarah",
      split: 3,
      status: "settled",
      group: "Roommates",
      date: "2025-10-23",
    },
    {
      id: 3,
      title: "Movie Tickets",
      amount: 120.0,
      paidBy: "Mike",
      split: 8,
      status: "pending",
      group: "Movie Club",
      date: "2025-10-22",
    },
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
              <h2 className="text-3xl font-bold mb-2">Expenses</h2>
              <p className="text-muted-foreground">Track and split your shared expenses</p>
            </div>
            <Link to="/expenses/new">
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                New Expense
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">You Owe</p>
              <p className="text-3xl font-bold text-destructive">₹124.50</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">You're Owed</p>
              <p className="text-3xl font-bold text-secondary">₹95.00</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
              <p className="text-3xl font-bold text-accent">₹29.50</p>
            </CardContent>
          </Card>
        </div>

        {/* Expenses List */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>All shared expenses across your groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center shrink-0">
                      <Receipt className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{expense.title}</h4>
                        <Badge variant={expense.status === "settled" ? "secondary" : "default"}>
                          {expense.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Paid by {expense.paidBy} • {expense.group} • {expense.date}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Split {expense.split} ways
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-accent">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{(expense.amount / expense.split).toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expenses;

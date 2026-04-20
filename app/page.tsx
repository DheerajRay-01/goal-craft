import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Building2,
  Bookmark,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

export default function GoalCraftHomepage() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      desc: "Find experiences by company, role, or tech stack instantly.",
    },
    {
      icon: MessageSquare,
      title: "Community Insights",
      desc: "Learn from real discussions and follow-up questions.",
    },
    {
      icon: Bookmark,
      title: "Save & Revise",
      desc: "Bookmark posts and revisit them anytime.",
    },
    {
      icon: TrendingUp,
      title: "Trending Topics",
      desc: "Stay updated with trending interview patterns.",
    },
    {
      icon: ShieldCheck,
      title: "Structured Content",
      desc: "Clean and well-organized experiences.",
    },
    {
      icon: Users,
      title: "Real Contributors",
      desc: "Insights from students, alumni & professionals.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* 🔥 HERO */}
      <section className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Real Experiences. Real Preparation.
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn From
              <span className="text-primary"> Real Interview Experiences</span>
            </h1>

            <p className="mt-4 text-muted-foreground text-lg">
              Discover real interview journeys, questions, and preparation strategies
              shared by candidates.
            </p>

            {/* CTA */}
            <div className="mt-6 flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-accent">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline">
                Share Experience
              </Button>
            </div>

            {/* STATS */}
            <div className="mt-8 flex gap-8 text-sm">
              <div>
                <p className="text-xl font-semibold">500+</p>
                <p className="text-muted-foreground">Companies</p>
              </div>
              <div>
                <p className="text-xl font-semibold">1200+</p>
                <p className="text-muted-foreground">Experiences</p>
              </div>
              <div>
                <p className="text-xl font-semibold">5k+</p>
                <p className="text-muted-foreground">Users</p>
              </div>
            </div>
          </div>

          {/* RIGHT (Clean Feature Cards) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Building2, label: "Company Specific" },
              { icon: Briefcase, label: "Interview Rounds" },
              { icon: Bookmark, label: "Save Posts" },
              { icon: Star, label: "Top Insights" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="hover:shadow-lg transition">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-20">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">
            Why GoalCraft?
          </h2>
          <p className="text-muted-foreground mt-2">
            Built for real, structured, and effective preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-5">
                  <div className="mb-3 p-2 inline-flex rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </section>

    </main>
  );
}
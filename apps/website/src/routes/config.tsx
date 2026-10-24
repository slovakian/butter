import { Link, createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ConfiguratorPage = () => (
  <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <div className="border-border/60 mb-10 border-b pb-8">
      <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono">TOOL: BUTTER-CONFIG-001</span>
        <span>•</span>
        <span>Status: In Progress</span>
      </div>
      <div className="flex items-center gap-3">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          Slice Configurator
        </h1>
        <Badge variant="secondary">Upcoming</Badge>
      </div>
      <p className="text-muted-foreground mt-3 text-base">
        Interactive configuration generator and registry distributor for Butter
        Auth slices.
      </p>
    </div>

    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="text-muted-foreground h-5 w-5" />
          <CardTitle>Route Not Implemented</CardTitle>
        </div>
        <CardDescription>
          The interactive Configurator route is currently under active
          development and has not been implemented yet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex flex-col gap-4 text-sm">
          <p>
            When complete, this route will allow you to select auth slices
            (sessions, email/password, OAuth, passkeys), choose your ORM and
            database adapter, and customize invariants tailored directly to your
            stack.
          </p>
          <div className="pt-2">
            <Link className={buttonVariants({ variant: "outline" })} to="/">
              Return to Overview
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const Route = createFileRoute("/config")({
  component: ConfiguratorPage,
  head: () => ({
    meta: [
      {
        title: "Configurator | Butter",
      },
      {
        content:
          "Interactive slice configurator for Butter Auth (Under Construction).",
        name: "description",
      },
    ],
  }),
});

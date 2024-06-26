"use client";

import { Card } from "@/components/ui/card";
import { routes } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">ai</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          chat with ai
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {routes
          .filter((route) => !route.isOnlySidebar)
          .map((tool) => {
            return (
              <Card
                onClick={() => !tool.disabled && router.push(tool.href)}
                key={tool.href}
                className={cn(
                  "p-4 border-black/5 flex items-center justify-between hover:shadow-md transition",
                  tool.disabled ? "cursor-not-allowed" : "cursor-pointer"
                )}
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                  <div className="font-semibold">{tool.label}</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default DashboardPage;

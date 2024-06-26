"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "./free-counter";
import { routes } from "@/constants";

// const routes = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "Conversation",
//     icon: MessageSquare,
//     href: "/conversation",
//     color: "text-violet-500",
//   },
//   {
//     label: "Image generation",
//     icon: ImageIcon,
//     href: "/image",
//     color: "text-pink-700",
//   },
//   {
//     label: "Image inpainting",
//     icon: ImagePlus,
//     href: "/code",
//     color: "text-green-700",
//   },
//   {
//     label: "Video generation",
//     icon: VideoIcon,
//     href: "/video",
//     color: "text-orange-700",
//   },
//   {
//     label: "Music generation",
//     icon: Music,
//     href: "/music",
//     color: "text-emerald-500",
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     href: "/setting",
//     // color: "text-green-700",
//   },
// ];

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.jpg" />
          </div>
          <h1 className={cn("text-2xl font-bold")}>ai toolbox</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            return (
              <Link
                href={route.disabled ? {} : route.href}
                key={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400",
                  route.disabled ? "cursor-not-allowed" : "cursor-pointer"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;

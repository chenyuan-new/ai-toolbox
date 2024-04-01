import {
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  ImagePlus,
  LayoutDashboard,
} from "lucide-react";

export const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    isOnlySidebar: true,
  },
  {
    label: "Conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    icon: MessageSquare,
    href: "/conversation",
  },
  {
    label: "Image generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Image inpainting",
    icon: ImagePlus,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    disabled:true,
  },
  {
    label: "Video generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    disabled:true,

  },
  {
    label: "Music generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    disabled:true,

  },
];


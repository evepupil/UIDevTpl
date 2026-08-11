"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BotIcon,
  BoxIcon,
  CloudIcon,
  FolderGit2Icon,
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  TerminalIcon,
} from "lucide-react"

import type { PlatformPage } from "../lib/platform-data"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <CloudIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Workspace",
      url: "#overview",
      icon: <LayoutDashboardIcon />,
      items: [
        {
          title: "Overview",
          url: "#overview",
        },
        {
          title: "Deployments",
          url: "#deployments",
        },
        {
          title: "Activity",
          url: "#overview",
        },
      ],
    },
    {
      title: "Platform",
      url: "#models",
      icon: <CloudIcon />,
      items: [
        {
          title: "Models",
          url: "#models",
        },
        {
          title: "Domains",
          url: "#settings",
        },
        {
          title: "Usage",
          url: "#billing",
        },
      ],
    },
    {
      title: "Settings",
      url: "#settings",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Project settings",
          url: "#settings",
        },
        {
          title: "Team",
          url: "#settings",
        },
        {
          title: "Billing",
          url: "#billing",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Atlas",
      url: "#overview",
      icon: <FolderGit2Icon />,
    },
    {
      name: "Northstar",
      url: "#models",
      icon: <BotIcon />,
    },
    {
      name: "Edge API",
      url: "#deployments",
      icon: <BoxIcon />,
    },
  ],
}

export function AppSidebar({
  activePage = "overview",
  onNavigate,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  activePage?: PlatformPage
  onNavigate?: (page: PlatformPage) => void
}) {
  const activeNav = activePage === "deployment-detail" ? "deployments" : activePage
  const navMain = data.navMain.map((item) => ({
    ...item,
    isActive: item.url === `#${activeNav}` || item.items.some((subItem) => subItem.url === `#${activeNav}`),
    items: item.items.map((subItem) => ({
      ...subItem,
      isActive: subItem.url === `#${activeNav}`,
    })),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} onNavigate={onNavigate} />
        <NavProjects projects={data.projects} onNavigate={onNavigate} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

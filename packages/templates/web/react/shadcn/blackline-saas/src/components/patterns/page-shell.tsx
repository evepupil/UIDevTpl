import type { ReactNode } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "../app-sidebar"
import type { PlatformPage } from "../../lib/platform-data"

export function WorkspaceShell({
  activePage,
  breadcrumb,
  actions,
  onNavigate,
  children,
}: {
  activePage: PlatformPage
  breadcrumb: string
  actions?: ReactNode
  onNavigate?: (page: PlatformPage) => void
  children: ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider className="blackline-root">
        <AppSidebar activePage={activePage} onNavigate={onNavigate} />
        <SidebarInset className="blackline-main">
          <header className="blackline-header">
            <div className="blackline-header__left">
              <SidebarTrigger aria-label="Toggle navigation" />
              <Separator orientation="vertical" className="blackline-header__separator" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#overview">Workspace</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {actions ? <div className="blackline-header__actions">{actions}</div> : null}
          </header>
          <main className="blackline-content">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

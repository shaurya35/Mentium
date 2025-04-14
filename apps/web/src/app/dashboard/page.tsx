"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileIcon } from "@/components/header/ProfileIcon";
// import { Skeleton } from "@/components/ui/skeleton";
import {
  Todos,
  TodosSearch,
  TodosToday,
  TodosUpcoming,
} from "@/components/dashboard/todos/Todos";
import Settings from "@/components/dashboard/settings/Settings";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "todos";
  const subview = searchParams.get("subview");

  const renderContent = () => {
    switch (view) {
      case "todos":
        switch (subview) {
          case "search":
            return <TodosSearch />;
          case "today":
            return <TodosToday />;
          case "upcoming":
            return <TodosUpcoming />;
          default:
            return <Todos />;
        }
      case "settings":
        return <Settings />;
      default:
        return <Todos />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {view && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/dashboard?view=${view}`}>
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {subview && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {subview.charAt(0).toUpperCase() + subview.slice(1)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Todos</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-4 cursor-pointer">
            <ProfileIcon />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
            <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
            <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          {/* <Skeleton className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

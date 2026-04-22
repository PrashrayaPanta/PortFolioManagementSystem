import { AppSidebar } from "@/components/app-sidebar";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

import ProjectData from "../../projectData.json";
import { DataTable } from "@/components/data-table"; 

const List = () => {

    const { pathname } = useLocation()

    const totalNoofProjects = 20;

    return (
        
         <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards totalNoofProjects={totalNoofProjects}  pathname={pathname} />
                {/* <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div> */}
                <DataTable data={ProjectData} page="projects" />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    )


 }


 export default List
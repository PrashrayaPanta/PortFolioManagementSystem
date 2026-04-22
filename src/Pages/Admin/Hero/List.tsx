 
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import HeroData from "../../heroData.json";


const List = () => {

    const { pathname } = useLocation()

    console.log(pathname);


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
                <SectionCards pathname={pathname}   />
                {/* <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div> */}
                <DataTable data={HeroData} page="hero" />
              </div>    
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
        
    )


 }


 export default List
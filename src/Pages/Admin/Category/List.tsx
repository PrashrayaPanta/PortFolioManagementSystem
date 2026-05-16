 
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import HeroData from "../../heroData.json";
import { useQuery } from "@tanstack/react-query";
import { getAllCatgeory, getHero } from "@/api";
import Loading from "@/components/Loading";


const List = () => {

    const { pathname } = useLocation()

    console.log(pathname);
  

  
  console.log("I am inaside the list of hero");
  
  

  
  const { data, isLoading, isSuccess, isError, error } = useQuery({ queryFn: getAllCatgeory, queryKey: ["getAllCategory"] })
  

  if (isLoading) {
    return <Loading/>
  }






  console.log(HeroData);
  

  console.log("after the sucecs data is", data);
  

  console.log("The query is loading", isLoading);

  console.log("is it success", isSuccess);

  console.log("Is it error", isError);


  console.log("The error is", error);
  
  
  
  


    
  
    

  


    console.log("I am inside the hero list");
    
  



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
                <DataTable data={data?.data} page="category" />
              </div>    
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
        
    )


 }


 export default List
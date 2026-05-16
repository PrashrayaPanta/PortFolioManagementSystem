import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import Loading from "@/components/Loading";
import { useQuery, useQueries } from "@tanstack/react-query"; // Import useQueries
import { getAllProject, getAllProjectImages } from "@/api";

const List = () => {
  console.log("I am list of projects");
  const { pathname } = useLocation();
  const totalNoofProjects = 20;

  // First, fetch all projects
  const { 
    data: projectsData, 
    isLoading: isLoadingProjects, 
    isSuccess, 
    isError, 
    error 
  } = useQuery({ 
    queryFn: getAllProject, 
    queryKey: ["getAllProject"] 
  });

  console.log("after fetching");

  // Extract all project IDs once projects are loaded
  const projectIds = projectsData?.data?.map(({ id }) => id) || [];

  console.log("The id array is", projectIds);

  // Second, fetch images for EACH project individually using useQueries
  const imageQueries = useQueries({
    queries: projectIds.map(projectId => ({
      queryKey: ["getAllProjectImages", projectId],
      queryFn: () => getAllProjectImages(projectId), // Pass the specific projectId
      enabled: !!projectsData?.data, // Only run after projects are loaded
    }))
  });


  console.log("The Image Queries is", imageQueries);
  

  // console.log("The Image Queries is", imageQueries);
  

  // Check if any image queries are still loading
  const isLoadingImages = imageQueries.some(query => query.isLoading);

  // Show loading while either projects or images are loading
  if (isLoadingProjects || isLoadingImages) {
    return <Loading />;
  }

  

  console.log("The images Queires is after loading maanged", imageQueries);

  

  // Combine projects with their respective images

  //! Including the images properties
  const projectsWithImages = projectsData.data.map((project, index) => ({
    ...project,
    images: imageQueries[index]?.data?.data || [] // Adjust based on your API response structure
  }));


  

  console.log("Projects with images is you know", projectsWithImages);

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
                <SectionCards totalNoofProjects={totalNoofProjects} pathname={pathname} />
                <DataTable data={projectsWithImages} page="projects" />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default List;
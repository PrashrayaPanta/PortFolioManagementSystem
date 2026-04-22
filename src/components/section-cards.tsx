import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  totalNoofSkills?: number;
  totalNoofExperience?: number;
  totalNoofProjects?: number;
  totalNoofEducation?: number;
  pathname: string;
}

export function SectionCards({  totalNoofSkills, totalNoofExperience, totalNoofProjects, pathname, totalNoofEducation}: SectionCardsProps) {
  console.log(totalNoofExperience, totalNoofProjects, totalNoofSkills, pathname);
  
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {
        pathname === "/skills" && (
          <Card className="@container/card bg-amber-300">
            <CardHeader>
              <CardDescription> Skills Count</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalNoofSkills}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
   
          </Card>
        )
      }
 
      {
        pathname === "/experience" && (
          <Card className="@container/card bg-green-300">
            <CardHeader>
              <CardDescription>Experience Count</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalNoofExperience}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        )

        
      }


      {
        pathname === "/education" && (
          <Card className="@container/card bg-green-300">
            <CardHeader>
              <CardDescription>Education Count</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalNoofEducation}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        )
 
      }


         {
        pathname === "/contact" && (
          <Card className="@container/card bg-green-300">
            <CardHeader>
              <CardDescription>Contact Count</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
               2
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        )
 
      }

      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>No of Year Experinece</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card> */}
      {
        pathname === "/projects" && (
           <Card className="@container/card bg-blue-300">
           <CardHeader>
             <CardDescription>No of Projects Done</CardDescription>
             <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
               {totalNoofProjects}
             </CardTitle>
             <CardAction>
               <Badge variant="outline">
                 <IconTrendingUp />
                 +12.5%
               </Badge>
             </CardAction>
           </CardHeader>
           </Card>
        ) 
      }

      {
        pathname === "/" && (
          <>
            
           {/* Total no of  Project Card */}
          <Card className="@container/card bg-blue-300">
          <CardHeader>
            <CardDescription>No of Projects Done</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalNoofProjects}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
            </Card>

            
               <Card className="@container/card bg-blue-300">
          <CardHeader>
            <CardDescription>No of Expeience</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalNoofExperience}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
            </Card>
            
          <Card className="@container/card bg-blue-300">
          <CardHeader>
            <CardDescription>No of Skills</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalNoofSkills}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>

          </Card>
          </>
       



        )

        
        
      }
      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>No of Projects Done</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card> */}
    </div>
  );
}

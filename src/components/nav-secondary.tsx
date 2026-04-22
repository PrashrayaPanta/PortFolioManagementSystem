

import * as React from "react"
import { type Icon } from "@tabler/icons-react"


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
  } & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  console.log("Nav Secondary Compoiennt", items);
  
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <>
                  <Link to={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-2xl text-black">{item.title}
                  </span>
                  </Link>
                  <hr />
                </>
              
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

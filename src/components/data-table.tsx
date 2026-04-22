import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,

  IconEdit,
  IconGripVertical,

  IconPlus,
  IconTrash,
  IconTrendingUp,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { description } from "./chart-area-interactive";


export const SkillsSchema = z.object({
  id: z.number(),
  Name: z.string(),
  Level: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})


export const ExperienceSchema = z.object({
  id: z.number(),
  Name: z.string(),
  YearsOfExperience: z.number(),
  Role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})


export const ProjectsSchema = z.object({
  id: z.number(),
  Name: z.string(),
  technologyused: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})


export const EducationSchema = z.object({
  id: z.number(),
  Degree: z.string(),
  Board: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})


export const ContactSchema = z.object({
  id: z.number(),
  title: z.string(),
  contactDescription: z.string(),
})


export const AboutSchema = z.object({
  id: z.number(),
  description: z.string()
})

export const HeroSchema = z.object({
  id: z.number(),
  Name: z.string("text is required"),
  Designation:z.string("designation is required"),
  Description: z.string("description is required"),
  imgUrl: z.string().url("Must be a valid image URL"),
  createdAt: z.string(),
  updatedAt: z.string()
})


// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}



function DraggableRow({ row }: { row: Row<z.infer<typeof SkillsSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable<TData>({
  data: initialData,
  page,

}: {


  data: z.infer<typeof SkillsSchema | typeof EducationSchema | typeof ExperienceSchema | typeof ProjectsSchema | typeof ContactSchema | typeof HeroSchema | typeof AboutSchema>[];
  page: string,

  
}) {

  const navigate = useNavigate()
  const { pathname } = useLocation();
  console.log(pathname);

  const columns: ColumnDef<z.infer<typeof SkillsSchema | typeof EducationSchema | typeof ExperienceSchema | typeof ProjectsSchema | typeof AboutSchema | typeof HeroSchema>>[] = React.useMemo(() => {
    const actionColumn: ColumnDef<any> = {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <>
            <div className="flex gap-4">
              <Button onClick={() => navigate(`${pathname}/edit`)} className="bg-blue-600">
                <IconEdit className="text-white" />
                Edit</Button>
              <Button className="bg-red-600" onClick={() => toast("Delete action clicked")}>
                <IconTrash className="text-white" />
                Delete</Button>
            </div>
          </>
        );
      },
      enableSorting: false,
    };

    switch (page) {
      case "skills":
        return [
          {
            accessorKey: "Name",
            header: "Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Name" in row.original && row.original.Name}
              </Badge>
            ),
          },
          {
            accessorKey: "Level",
            header: "Level",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Level" in row.original && row.original.Level}
              </Badge>
            ),
          },
          {
            accessorKey: "CreatedAt",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.createdAt}
              </Badge>
            ),
          },
          {
            accessorKey: "Updated At",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ] as ColumnDef<any>[]
      case "experience":
        return [
          {
            accessorKey: "Name",
            header: "Company Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Name" in row.original && row.original.Name}
              </Badge>
            ),
          },
          {
            accessorKey: "Role",
            header: "Role",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Role" in row.original && row.original.Role}
              </Badge>
            ),
          },
          {
            accessorKey: "YearOfExperience",
            header: "Years of Experience",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"YearsOfExperience" in row.original && row.original.YearsOfExperience}
              </Badge>
            ),
          },
          {
            accessorKey: "created At",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.createdAt}
              </Badge>
            ),
          },
          {
            accessorKey: "status",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ];
      case "projects":
        return [
          {
            accessorKey: "Name",
            header: "Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Name" in row.original && row.original.Name}
              </Badge>
            ),
          },
          {
            accessorKey: "technologyused",
            header: "Technology Used",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"technologyused" in row.original && row.original.technologyused}
              </Badge>
            ),
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"status" in row.original && row.original.status}
              </Badge>
            ),
          },
          actionColumn,
        ];
      case "education":
        return [
          {
            accessorKey: "Degree",
            header: "Degree",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Degree" in row.original && row.original.Degree}
              </Badge>
            ),
          },
          {
            accessorKey: "Board",
            header: "Board",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Board" in row.original && row.original.Board}
              </Badge>
            ),
          },
          {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.createdAt}
              </Badge>
            ),
          },


          {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ];
      case "contact":
        return [
          {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
              <h1  className="text-black px-1.5 text-2xl">
                {row.original.title}
              </h1>
            ),
          },
          {
            accessorKey: "contactDescription",
            header: "Content Description",
            cell: ({ row }) => (
              <h1 className=" px-1.5 text-2xl text-black">
                {row.original.contactDescription}
              </h1>
            ),
          },
          actionColumn,
        ];
      case "aboutus":
        return [
          {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"description" in row.original && row.original.description}
              </Badge>
            ),
          },
          actionColumn,
        ];
      case "hero":
        return [
          {
            accessorKey: "Name",
            header: "Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Name" in row.original && row.original.Name}
              </Badge>
            ),
          },
          {
            accessorKey: "Designation",
            header: "Designation",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Designation" in row.original && row.original.Designation}
              </Badge>
            ),
          },
          {
            accessorKey: "Desription",
            header: "Description",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"Description" in row.original && row.original.Description}

              </Badge>
            ),
          },
          {
            accessorKey: "imgUrl",
            header: "Image",
            cell: ({ row }) => {
              // console.log("The roe orginal is ", row.original);
              // console.log("The row original is ", row.original.imgUrl);
              
              // console.log(row.getValue("imgUrl").imgUrl);
              const imageUrl = row.getValue("imgUrl") as string | undefined;
              return imageUrl ? (
                <a href={imageUrl}>
                  <img  
                  src={imageUrl}
                  alt="Hero Image"
                  className="object-cover rounded-md h-[100px] w-[700px]"
                />
                </a>
         
              ) : (
                <span className="text-muted-foreground text-sm">No image</span>
              );
            },
          },
          {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"createdAt" in row.original && row.original.createdAt}
              </Badge>
            ),
          },
          {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {"updatedAt" in row.original && row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ]; default:
        return [];
    }
  }, [page]);
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id?.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 bg-amber-100"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View111
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div className="">
          <Button className="bg-red-600" onClick={() => navigate(`${pathname}/create`)}>
            <IconPlus className="text-white" />
            Add
          </Button>

        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-green-500 text-2xl">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof SkillsSchema | typeof EducationSchema | typeof ProjectsSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          jmnjnj
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>jnjn</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

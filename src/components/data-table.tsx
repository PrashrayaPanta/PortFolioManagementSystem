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


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";




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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";



export const SkillsSchema = z.object({
  id: z.number(),
  Title: z.string(),
  CreatedAt: z.string(),
  UpdatedAt: z.string(),
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
  name: z.string(),
  description: z.string(),
  category_id: z.number(),
  images: z.string(),
  created_at: z.string(),
  updated_at: z.string(),

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


export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()



})


export const AboutSchema = z.object({
  id: z.number(),
  description: z.string()
})

export const HeroSchema = z.object({
  id: z.number(),
  name:z.string(),
  title: z.string("text is required"),
  heroDescription: z.string("designation is required"),
  img_path: z.string().url("Must be a valid image URL"),
  createdAt: z.string(),
  updatedAt: z.string()
})


// Create a separate component for the drag handle
// function DragHandle({ id }: { id: number }) {
//   const { attributes, listeners } = useSortable({
//     id,
//   });

//   return (
//     <Button
//       {...attributes}
//       {...listeners}
//       variant="ghost"
//       size="icon"
//       className="text-muted-foreground size-7 hover:bg-transparent"
//     >
//       <IconGripVertical className="text-muted-foreground size-3" />
//       <span className="sr-only">Drag to reorder</span>
//     </Button>
//   );
// }


//! Displays the content of each row and makes it draggable
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

export function DataTable({
  data: initialData,
  page,

}: {




  data: z.infer<typeof SkillsSchema | typeof EducationSchema | typeof ExperienceSchema | typeof ProjectsSchema | typeof ContactSchema | typeof HeroSchema | typeof AboutSchema | typeof CategorySchema>[];
  page: string,

}) {


  const [data, setData] = React.useState(() => initialData);


  console.log("The education data is", data);


  console.log("The data table data is", data);


  const navigate = useNavigate()
  const { pathname } = useLocation();
  console.log(pathname);

  const columns: ColumnDef<any>[] = React.useMemo(() => {


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
      enableSorting: true,
    };

    switch (page) {
      case "skills":
        return [
          {
            accessorKey: "Title",
            header: "Title",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"Title" in row.original && row.original.Title}
              </Badge>
            ),
          },
          {
            accessorKey: "CreatedAt",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.CreatedAt}
              </Badge>
            ),
          },
          {
            accessorKey: "UpdatedAt",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.UpdatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ]
      case "experience":
        return [
          {
            accessorKey: "Name",
            header: "Company Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"Name" in row.original && row.original.Name}
              </Badge>
            ),
          },
          {
            accessorKey: "Role",
            header: "Role",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"Role" in row.original && row.original.Role}
              </Badge>
            ),
          },
          {
            accessorKey: "YearOfExperience",
            header: "Years of Experience",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"YearsOfExperience" in row.original && row.original.YearsOfExperience}
              </Badge>
            ),
          },
          {
            accessorKey: "created At",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.createdAt}
              </Badge>
            ),
          },
          {
            accessorKey: "status",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ]
      case "projects":
        return [
          {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"name" in row.original && row.original.name}
              </Badge>
            ),
          },
          {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"description" in row.original && row.original.description}
              </Badge>
            ),
          },
          {
            accessorKey: "category_id",
            header: "Category Id",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"category_id" in row.original && row.original.category_id}
              </Badge>
            ),
          },

          {
            accessorKey: "images",
            header: "Images",
            cell: ({ row }) => (
              <>
                {/* {console.log(row.original)} */}
                {
                  row.original.images.map((image) => (



                    <a href={`http://localhost:5000/${image.image_path}`}>
                      <img src={`http://localhost:5000/${image.image_path}`} alt="" />
                    </a>


                  ))

                }

              </>

            ),
          },
          actionColumn,
        ]
      case "education":
        return [
          {
            accessorKey: "Level",
            header: "Level",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"Level" in row.original && row.original.Level}
              </Badge>
            ),
          },
          {
            accessorKey: "Board",
            header: "Board",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"Board" in row.original && row.original.Board}
              </Badge>
            ),
          },

          {
            accessorKey: "TimeRange",
            header: "Time Range",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"TimeRange" in row.original && row.original.TimeRange}
              </Badge>
            ),
          },
          {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.createdAt}
              </Badge>
            ),
          },


          {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ]
      case "contact":
        return [
          {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
              <h1 className="text-black px-1.5 text-2xl">
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
        ]
      case "aboutus":
        return [
          {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"description" in row.original && row.original.description}
              </Badge>
            ),
          },
          actionColumn,
        ]

      case "category":
        return [
          {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"name" in row.original && row.original.name}
              </Badge>
            ),
          },
          {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"description" in row.original && row.original.description}
              </Badge>
            ),
          },
          {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"created_at" in row.original && row.original.created_at}
              </Badge>
            ),
          },
          {
            accessorKey: "updated_at",
            header: "UpdatedAt",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {"updated_at" in row.original && row.original.updated_at}
              </Badge>
            ),
          },
          actionColumn,
        ]

      case "hero":
        console.log("Hello I am inside the hero case1");

        return [
          {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (

              <>
                {console.log("Title data is", row)}
                <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                  {"title" in row.original && row.original.title}
                  {console.log("The  data of column Title", row.original.title)}
                </Badge>
              </>

            ),
          },
              {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (

              <>
                {console.log("Title data is", row)}
                <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                  {"name" in row.original && row.original.name}

                </Badge>
              </>

            ),
          },
          {
            accessorKey: "heroDescription",
            header: "Description",
            cell: ({ row }) => (
              <p className="px-1.5 text-lg max-w-md whitespace-pre-wrap">
                {"heroDescription" in row.original && row.original.heroDescription}
              </p>
            ),
          },
          {
            accessorKey: "img_path",
            header: "Image",
            cell: ({ row }) => {
              const imagePath = row.original.img_path;
              return imagePath ? (
                <a href={`http://localhost:5000/${imagePath}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`http://localhost:5000/${imagePath}`}
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
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.createdAt}
              </Badge>
            ),
          },
          {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5 text-2xl">
                {row.original.updatedAt}
              </Badge>
            ),
          },
          actionColumn,
        ];

      default:
        return [];
    }


  }, [page]);


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



  console.log("The hero data is", data);



  // console.log("The values is", Object.values(data).map(({ id }) => id))



  // console.log("Thenvalie sis ", Object.keys(data))



  // const dataIds = data?.data.map(({ Name }) => id);


  // console.log(dataIds);






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
        const oldIndex = [1];
        const newIndex = [1];
        return arrayMove(data, 1, 1);
      });
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 bg-amber-100"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        {/* <Label htmlFor="view-selector" className="sr-only">
            View111
          </Label> */}
        {/* <Select defaultValue="outline"> */}

        {/* </Select> */}
        {/* <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex"> */}
        <Input className="w-80 border-2 border-black" placeholder={page} />
        {/* <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="past-performance">
              Past Performance <Badge variant="secondary">3</Badge>
            </TabsTrigger> */}
        {/* <TabsTrigger value="key-personnel">
              Key Personnel <Badge variant="secondary">2</Badge>
            </TabsTrigger> */}
        {/* <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger> */}
        {/* </TabsList> */}

        {/* Add Button */}
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
              {/* Table Head */}
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
              {/* Table Body */}
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={[1]}
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


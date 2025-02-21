"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "@/components/custom-ui/delete";
import Link from "next/link";


export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <Link href={`/dashboard/collections/${row.original._id}`} className="hover:underline hover:text-sky-900">{row.original.title}</Link>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} />
  },
]
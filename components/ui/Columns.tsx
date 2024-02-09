"use client"

import { ColumnDef } from "@tanstack/react-table"
import RowActions from "./RowActions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Urls = {
  createdAt: string,
  nanoId: string,
  shortenedUrl:string,
  redirectUrl: string,
  clicks: number | null,
  updatedAt: Date,
  id:string,
  userId:string
}

export const columns: ColumnDef<Urls>[] = [
  {
    accessorKey: "redirectUrl",
    header: "Url",
  },
  {
    accessorKey: "shortenedUrl",
    header: "ShortedUrl",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:'actions',
    cell:  ({row}) =>  <RowActions data={row.original}/> 
  }

]

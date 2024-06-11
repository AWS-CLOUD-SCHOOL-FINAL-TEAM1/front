"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { myCardData } from "@/data/myCardData";

const ComponentTable = ({ id }) => {
  const card = myCardData.find((card) => card.id === id);

  if (!card) {
    return <div>No data found</div>;
  }

  return (
    <Table aria-label="Component Table" className="table-auto w-full bg-white">
      <TableHeader className="bg-gray-200">
        <TableColumn>Component</TableColumn>
        <TableColumn>Details</TableColumn>
      </TableHeader>
      <TableBody>
        {myCardData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-blue-400 font-semibold">
              {item.component}
            </TableCell>
            <TableCell>{item.details}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ComponentTable;
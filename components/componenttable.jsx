import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { myCardData } from "@/data/myCardData";

const ComponentTable = ({ id, style }) => {
  const card = myCardData.find((card) => card.id === id);

  if (!card) {
    return <div>No data found</div>;
  }

  return (
    <Table aria-label="Component Table" className="table-auto w-full bg-white" style={style}>
      <TableHeader className="bg-gray-200">
        <TableColumn>Component</TableColumn>
        <TableColumn>Details</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.entries(card.details).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="border px-4 py-2">{key}</TableCell>
            <TableCell className="border px-4 py-2">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComponentTable;

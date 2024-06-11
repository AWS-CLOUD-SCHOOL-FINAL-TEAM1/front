import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { CommunityCardData } from "@/data/CommunityCardData"; // Ensure the path is correct
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import NextLink from "next/link";

const CommunityCard = ({ id, title, description }) => {
  const card = CommunityCardData.find((card) => card.id === id);

  if (!card) {
    return <div>No data found</div>;
  }

  return (
    <NextLink href={`/community/${id}`} passHref>
      <Card className="py-4" style={{ width: "360px", height: "560px" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <Table
            aria-label="Component Table"
            className="table-auto w-full bg-white"
          >
            <TableHeader>
              <TableColumn>Component</TableColumn>
              <TableColumn>Details</TableColumn>
            </TableHeader>
            <TableBody>
              {Object.entries(card.details).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </NextLink>
  );
};

export default CommunityCard;

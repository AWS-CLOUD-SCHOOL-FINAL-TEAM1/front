"use client";
import React from "react";
import { useParams } from "next/navigation";
import { CommunityCardData } from "@/data/CommunityCardData"; // Ensure the path is correct
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const CommunityDetail = () => {
  const params = useParams();
  const { id } = params;
  const card = CommunityCardData.find((card) => card.id === parseInt(id, 10));

  if (!card) {
    return <div>No data found</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1>{card.title}</h1>
        <p>{card.description}</p>
      </div>
      <Card className="py-4" style={{ width: "360px", height: "560px" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="font-bold text-large">{card.title}</h4>
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
    </section>
  );
};

export default CommunityDetail;

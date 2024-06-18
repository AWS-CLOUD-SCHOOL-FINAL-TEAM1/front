"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import componentData from "@/data/componentData";

const EstimateCard = ({ id, title, type, description }) => {
  return (
    <NextLink href={`/recommend/${id}`} passHref>
      <Card className="py-4" style={{ width: "100%", height: "auto" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="font-semibold text-2xl mb-2">{type}</h4>
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={160}
            height={160}
            style={{ width: "160px", height: "160px" }}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <h4 className="font-bold text-large">{title}</h4>
          <Table
            hideHeader
            aria-label="Component Table"
            className="w-full"
            style={{ height: "240px" }}
          >
            <TableHeader>
              <TableColumn>Component</TableColumn>
              <TableColumn>Details</TableColumn>
            </TableHeader>
            <TableBody>
              {componentData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-blue-400 font-semibold">
                    {item.component}
                  </TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </NextLink>
  );
};

export default EstimateCard;

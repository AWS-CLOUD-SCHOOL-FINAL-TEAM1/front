import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const placeholderImage =
  "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg";

const MyOrderCard = ({ order }) => {
  const renderOrderDetails = () => {
    const excludedKeys = [
      "OrderID",
      "UserID",
      "Model",
      "ImageURL",
      "TotalPrice",
    ];
    return (
      <Table aria-label="Order Details" className="text-xs md:text-sm">
        <TableHeader>
          <TableColumn>Component</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody>
          {Object.entries(order)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card
      className="flex flex-col justify-between p-2 w-full h-full border border-gray-200 rounded-lg shadow-sm"
      style={{ minHeight: "600px", maxHeight: "600" }}
    >
      <CardHeader className="pb-0 text-center">
        <h2 className="text-sm font-semibold">{order.Model}</h2>
      </CardHeader>
      <div className="flex justify-center mb-2">
        <Image
          src={placeholderImage || order.ImageURL}
          alt="PC Case Image"
          className="rounded-xl"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div className="mt-2 text-blue-500 font-semibold text-sm text-center">
        총 가격: {order.TotalPrice.toLocaleString()}₩
      </div>
      <CardBody className="pt-2 overflow-y-auto">
        {renderOrderDetails()}
      </CardBody>
    </Card>
  );
};

export default MyOrderCard;

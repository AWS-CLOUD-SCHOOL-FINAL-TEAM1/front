import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import CustomImage from "@/components/CustomImage"; // Ensure the path is correct

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
      className="p-3 cursor-pointer"
      style={{ width: "100%", height: "100%" }}
    >
      <CardBody className="pt-2 overflow-y-auto">
        <div className="flex justify-center">
          <CustomImage
            src={order.ImageURL}
            alt="PC Case Image"
            className="rounded-xl"
            style={{ width: "150px", height: "150px" }} // 이미지 크기 조정
          />
        </div>{" "}
        <br></br>
        <div className="mt-2 text-blue-600 font-semibold text-xl text-center">
          {order.TotalPrice.toLocaleString()} ₩
        </div>
        <br></br>
        {renderOrderDetails()}
      </CardBody>
    </Card>
  );
};

export default MyOrderCard;

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

const MyOrderCard = ({ order }) => {
  const renderOrderDetails = () => {
    return (
      <Table aria-label="Order Details">
        <TableHeader>
          <TableColumn>Component</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="CPU">
            <TableCell>CPU</TableCell>
            <TableCell>{order.CPU}</TableCell>
          </TableRow>
          <TableRow key="GPU">
            <TableCell>GPU</TableCell>
            <TableCell>{order.GPU}</TableCell>
          </TableRow>
          <TableRow key="Mainboard">
            <TableCell>Mainboard</TableCell>
            <TableCell>{order.Mainboard}</TableCell>
          </TableRow>
          <TableRow key="Memory">
            <TableCell>Memory</TableCell>
            <TableCell>{order.Memory}</TableCell>
          </TableRow>
          <TableRow key="Storage">
            <TableCell>Storage</TableCell>
            <TableCell>{order.Storage}</TableCell>
          </TableRow>
          <TableRow key="PcCase">
            <TableCell>PC Case</TableCell>
            <TableCell>{order.PcCase}</TableCell>
          </TableRow>
          <TableRow key="Cooler">
            <TableCell>Cooler</TableCell>
            <TableCell>{order.Cooler}</TableCell>
          </TableRow>
          <TableRow key="Power">
            <TableCell>Power</TableCell>
            <TableCell>{order.Power}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <Card className="p-4 w-full h-auto border border-gray-200 rounded-lg shadow-sm">
      <CardHeader className="pb-0 text-center">
        <h2 className="text-lg font-semibold">{order.OrderID}</h2>
      </CardHeader>
      <CardBody className="pt-2">
        <Image
          src={order.ImageURL}
          alt="PC Case Image"
          className="rounded-xl w-full h-48 object-cover"
        />
        {renderOrderDetails()}
      </CardBody>
    </Card>
  );
};

export default MyOrderCard;

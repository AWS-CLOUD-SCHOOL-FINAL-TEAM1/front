import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { getComponentDetail } from "./api";
const ComponentTable = ({ order, style }) => {
  const [componentDetails, setComponentDetails] = useState({});

  useEffect(() => {
    const fetchAllComponentDetails = async () => {
      const componentTypes = [
        { id: "CPUID", type: "CpuType" },
        { id: "GPUID", type: "GpuType" },
        { id: "MemoryID", type: "MemoryType" },
        { id: "CoolerID", type: "CoolerType" },
        { id: "MainboardID", type: "MainboardType" },
        { id: "StorageID", type: "StorageType" },
        { id: "PcCaseID", type: "PcCaseType" },
        { id: "PowerID", type: "PowerType" },
      ];
      const details = {};
      for (const { id, type } of componentTypes) {
        if (order[id] && order[type]) {
          details[id] = await fetchComponentDetails(order[id], order[type]);
        }
      }
      setComponentDetails(details);
    };
    const fetchComponentDetails = async (componentId, componentType) => {
      const response = await getComponentDetail(componentId, componentType);
      return response;
    };
    fetchAllComponentDetails();
    fetchComponentDetails();
  }, [order]);

  const keyDetails = (details) => {
    if (!details) return "Loading...";
    const keysToShow = ["Model"];
    return keysToShow.map((key) => (
      <p key={key}>
        <strong>{key}:</strong> {details[key]}
      </p>
    ));
  };

  return (
    <Table aria-label="Component Details" style={style}>
      <TableHeader>
        <TableColumn>Component</TableColumn>
        <TableColumn>Details</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.entries(componentDetails).map(([id, details]) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{keyDetails(details)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComponentTable;

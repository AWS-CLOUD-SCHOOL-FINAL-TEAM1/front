import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import axios from "axios";

const fetchComponentDetails = async (componentId, componentType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_KEY}/component_detail/`,
      {
        component_id: componentId,
        component_type: componentType,
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("Failed to fetch component details:", error);
    return null;
  }
};

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

    fetchAllComponentDetails();
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
"use client";

import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

export default function ComponentTable() {
    return (
        <Table  hideHeader aria-label="Component Table" className="w-360 h-360">
            <TableHeader>
                <TableColumn>COMPONENT</TableColumn>
                <TableColumn>DETAILS</TableColumn>
            </TableHeader>
            <TableBody>
                {[
                    { component: "CPU", details: "Intel i9" },
                    { component: "메인보드", details: "ASUS ROG" },
                    { component: "메모리", details: "16GB DDR4" },
                    { component: "그래픽카드", details: "NVIDIA RTX 3080" },
                    { component: "쿨러", details: "Cooler Master" },
                    { component: "SSD", details: "Samsung 1TB" },
                    { component: "HDD", details: "Seagate 2TB" },
                    { component: "케이스", details: "NZXT H510" },
                    { component: "파워", details: "Corsair 750W" }
                ].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-blue-400 font-semibold" >{item.component}</TableCell>
                        <TableCell>{item.details}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

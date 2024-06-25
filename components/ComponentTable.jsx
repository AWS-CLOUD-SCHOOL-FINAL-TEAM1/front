// "use client";

// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableColumn,
//   TableRow,
//   TableCell,
// } from "@nextui-org/table";
// import componentData from "../data/componentData";

// export default function ComponentTable() {
//   return (
//     <Table hideHeader aria-label="Component Table" className="w-360 h-360">
//       <TableHeader>
//         <TableColumn>COMPONENT</TableColumn>
//         <TableColumn>DETAILS</TableColumn>
//       </TableHeader>
//       <TableBody>
//         {componentData.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell className="text-blue-400 font-semibold">
//               {item.component}
//             </TableCell>
//             <TableCell>{item.details}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }

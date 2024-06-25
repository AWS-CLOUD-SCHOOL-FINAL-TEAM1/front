// "use client";
// import React from "react";
// import { Card, CardHeader, CardBody } from "@nextui-org/card";
// import { Button } from "@nextui-org/button";
// import Link from "next/link";
// import { FaEdit } from "react-icons/fa";
// import ComponentTable from "@/components/ComponentTable";

// const MypageCard = ({ id, title, description, details }) => {
//   return (
//     <Card className="py-4" style={{ width: "100%", height: "460px" }}>
//       <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
//         <h4 className="font-bold text-large">{title}</h4>
//         <div className="flex space-x-2">
//           <Link href={`/estimate/${id}`}>
//             <Button color="primary" variant="ghost" size="sm">
//               <FaEdit />
//             </Button>
//           </Link>
//         </div>
//       </CardHeader>
//       <Link href={`/mypage/${id}`}>
//         <CardBody className="overflow-visible py-2 items-center mt-4">
//           <ComponentTable id={id} style={{ width: "100%", height: "320px" }} />
//         </CardBody>
//       </Link>
//     </Card>
//   );
// };

// export default MypageCard;

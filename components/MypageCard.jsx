"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FaEdit, FaShareAlt } from "react-icons/fa";

const MypageCard = ({ id, title, description, details }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/estimate/${id}`);
  };

  return (
    <Card className="py-4" style={{ width: "360px", height: "460px" }}>
      <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
        <h4 className="font-bold text-large">{title}</h4>
        <div className="flex space-x-2">
          <Button
            onClick={handleEditClick}
            color="primary"
            variant="ghost"
            size="sm"
          >
            <FaEdit />
          </Button>
          <Button color="primary" variant="ghost" size="sm">
            <FaShareAlt />
          </Button>
        </div>
      </CardHeader>
      <NextLink href={`/mypage/${id}`}>
        <CardBody className="overflow-visible py-2 items-center">
          <table className="table-auto w-full text-left">
            <tbody>
              {Object.entries(details).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-4 py-2 font-semibold">{key}</td>
                  <td className="px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </NextLink>
    </Card>
  );
};

export default MypageCard;

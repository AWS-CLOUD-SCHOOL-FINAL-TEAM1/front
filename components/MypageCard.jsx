"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaEdit, FaShareAlt } from "react-icons/fa";

const MypageCard = ({ id, title, description, details }) => {
  return (
    <Card className="py-4" style={{ width: "360px", height: "460px" }}>
      <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
        <h4 className="font-bold text-large">{title}</h4>
        <div className="flex space-x-2">
          <Link href={`/estimate/${id}`}>
            <Button color="primary" variant="ghost" size="sm">
              <FaEdit />
            </Button>
          </Link>
          <Button color="primary" variant="ghost" size="sm">
            <FaShareAlt />
          </Button>
        </div>
      </CardHeader>
      <Link href={`/mypage/${id}`}>
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
      </Link>
    </Card>
  );
};

export default MypageCard;

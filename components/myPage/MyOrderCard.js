"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import ComponentTable from "@/components/myPage/ComponentTable";
import { Image } from "@nextui-org/image";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const MyOrderCard = ({ order }) => {
  const { OrderID, PcCaseID, PcCaseType } = order;
  const [caseImageUrl, setCaseImageUrl] = useState("");

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/component_detail/`,
          {
            component_id: PcCaseID,
            component_type: PcCaseType,
          }
        );
        if (response.data.length > 0) {
          setCaseImageUrl(response.data[0].ImageURL);
        }
      } catch (error) {
        console.error("Failed to fetch case details:", error);
      }
    };

    fetchCaseDetails();
  }, [PcCaseID, PcCaseType]);

  return (
    <Card className="py-4" style={{ width: "100%", height: "600px" }}>
      <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <Link href={`/estimate/${OrderID}`}>
            <Button color="primary" variant="ghost" size="sm">
              <FaEdit />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <Link href={`/mypage/${OrderID}`}>
        <CardBody className="overflow-visible py-2 items-center mt-4">
          <Image
            alt="Case Image"
            className="object-cover rounded-xl mb-4"
            src={
              caseImageUrl ||
              "https://spoidimage.s3.ap-northeast-2.amazonaws.com/test.jpeg"
            }
            width={160}
            height={160}
            style={{ width: "160px", height: "160px" }}
          />
          <ComponentTable
            order={order}
            style={{ width: "100%", height: "320px" }}
          />
        </CardBody>
      </Link>
    </Card>
  );
};

export default MyOrderCard;

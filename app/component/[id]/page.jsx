// app/component/[id]/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Checkbox, ScrollShadow, CircularProgress } from "@nextui-org/react";

import { HeartIcon } from "@/components/HeartIcon.jsx";
import { Image } from "@nextui-org/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import LineChart from "@/components/LineChart";
import { fetchComponentDetail } from "@/app/component/api";

const CardDetail = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const componentType = searchParams.get('componentType');

  const [componentDetail, setComponentDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && componentType) {
      const fetchData = async () => {
        try {
          const detail = await fetchComponentDetail(id, componentType);
          setComponentDetail(detail);
        } catch (err) {
          console.error('Error fetching component details:', err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id, componentType]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <CircularProgress size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!componentDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1>No component detail found</h1>
      </div>
    );
  }

  const data = [
    { date: "2024-06-01", price: 100 },
    { date: "2024-06-02", price: 110 },
    { date: "2024-06-03", price: 105 },
  ];

  return (
    <div className="relative flex flex-col items-center p-6 md:p-20 rounded-xl bg-white">
      <Checkbox
        className="absolute top-4 left-10 transform scale-125 font-semibold"
        icon={<HeartIcon />}
      >
        관심상품
      </Checkbox>
      <ScrollShadow hideScrollBar size={100} className="w-full h-[45rem]">
        <div className="items-center mt-5 mb-10 flex flex-col md:flex-row w-full max-w-4xl mb-4">
          <div className="flex-1 pr-0 md:pr-8 mb-4 md:mb-0">
            <div
              className="relative shadow-black/5 shadow-none rounded-xl"
              style={{ width: "100%", height: "auto" }}
            >
              <Image
                src={"https://spoidimage.s3.ap-northeast-2.amazonaws.com/test.jpeg"}
                alt="Detail Image"
                className="object-cover rounded-xl"
                style={{ width: "100%", height: 400, objectFit: "cover" }}
              />
            </div>
          </div>
          <div
            className="flex flex-col flex-1 pl-0 md:pl-8 relative overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            <Card className="bg-white mb-4">
              <CardHeader className="pb-2">
                <h2 className="font-bold text-xl md:text-2xl">
                  {componentDetail[0].Model}
                </h2>
              </CardHeader>
            </Card>
            <Table
              isStriped
              hideHeader
              aria-label="Component Table"
              className="w-full text-base md:text-lg mb-4"
            >
              <TableHeader>
                <TableColumn className="text-base md:text-lg">
                  COMPONENT
                </TableColumn>
                <TableColumn className="text-base md:text-lg">
                  DETAILS
                </TableColumn>
              </TableHeader>
              <TableBody>
                {Object.entries(componentDetail[0]).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="text-blue-700 font-semibold text-base md:text-lg">
                      {key}
                    </TableCell>
                    <TableCell className="text-base md:text-lg">
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="w-full max-w-4xl mt-2">
              <LineChart data={data} />
            </div>
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
};

export default CardDetail;

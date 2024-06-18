"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Checkbox, ScrollShadow } from "@nextui-org/react";

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
import priceData from "../../../data/priceData";
import LineChart from "@/components/LineChart";
import chartData from "@/data/chartData"; // Ensure this data has the correct format

const CardDetail = () => {
  const data = [
    { date: "2024-06-01", price: 100 },
    { date: "2024-06-02", price: 110 },
    { date: "2024-06-03", price: 105 },
  ];

  return (
    <div className="relative flex flex-col items-center p-6 md:p-20 rounded-xl bg-white ">
      <Checkbox
        className="absolute top-4 left-10 transform scale-125 font-semibold"
        icon={<HeartIcon />}
      >
        관심상품
      </Checkbox>
      <ScrollShadow hideScrollBar size={100} className="w-full h-[45rem]">
        <div className="mt-14 mb-10 flex flex-col md:flex-row w-full max-w-4xl mb-4">
          <div className="flex-1 pr-0 md:pr-8 mb-4 md:mb-0">
            <div
              className="relative shadow-black/5 shadow-none rounded-xl"
              style={{ width: "100%", height: "auto" }}
            >
              <Image
                src="https://nextui.org/images/hero-card-complete.jpeg"
                alt="Detail Image"
                className="object-cover rounded-xl"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
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
                  인텔 코어i5-14세대 14400F
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
                {priceData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-blue-400 font-semibold text-base md:text-lg">
                      {item.component}
                    </TableCell>
                    <TableCell className="text-base md:text-lg">
                      {item.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="w-full max-w-4xl mt-4">
              <LineChart data={data} />
            </div>
          </div>
        </div>
        <div className="mt-10 mb-10">
          <Card className="bg-white mb-4 w-full max-w-4xl">
            <CardHeader className="pb-2">
              <h2 className="font-bold text-lg md:text-xl">
                Detail Information
              </h2>
            </CardHeader>
            <CardBody className="pt-2">
              <p className="text-sm md:text-base">
                "인텔(소켓1700)/10nm(인텔7)/P6+E4코어/12+4스레드/기본
                클럭:2.5GHz/최대 클럭:4.7GHz/L2 캐시:9.5MB/L3 캐시:20MB"
              </p>
            </CardBody>
          </Card>
          <Card className="bg-white mb-4 w-full max-w-4xl">
            <CardHeader className="pb-2">
              <h2 className="font-bold text-lg md:text-xl">
                Detail Information
              </h2>
            </CardHeader>
            <CardBody className="pt-2">
              <p className="text-sm md:text-base">
                "인텔(소켓1700)/10nm(인텔7)/P6+E4코어/12+4스레드/기본
                클럭:2.5GHz/최대 클럭:4.7GHz/L2 캐시:9.5MB/L3 캐시:20MB"
              </p>
            </CardBody>
          </Card>
        </div>
      </ScrollShadow>
    </div>
  );
};

export default CardDetail;

"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import ComponentDetailCard from '@/components/ComponentDetailCard';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import priceData from "../../../data/priceData";
import LineChart from '@/components/LineChart';
import chartData from "../../../data/chartData";

const MypageDetail = () => {

  return (
    <div className="relative flex flex-col items-center justify-center p-8 rounded-xl bg-white">
      <div className="flex w-full max-w-4xl mb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="flex-1 pr-8">
          <div className="relative shadow-black/5 shadow-none rounded-xl" style={{ width: '500px', height: '500px' }}>
            <Image
              src="https://nextui.org/images/hero-card-complete.jpeg"
              alt="Detail Image"
              className="object-cover rounded-xl"
              style={{ width: '500px', height: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 pl-8 relative overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <Card className="bg-white mb-4">
            <CardHeader>
              <h2 className="font-bold text-2xl">인텔 코어i5-14세대 14400F</h2>
            </CardHeader>
          </Card>
          <Table
            isStriped
            hideHeader
            aria-label="Component Table"
            className="w-full text-lg mb-4" // text-lg for larger text size
            style={{ fontSize: '1.25rem' }} // 1.25rem = 20px
          >
            <TableHeader>
              <TableColumn className="text-lg">COMPONENT</TableColumn> {/* text-lg for larger text size */}
              <TableColumn className="text-lg">DETAILS</TableColumn> {/* text-lg for larger text size */}
            </TableHeader>
            <TableBody>
              {priceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-blue-400 font-semibold text-lg">
                    {item.component}
                  </TableCell>
                  <TableCell className="text-lg">{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Card className="bg-white">
            <CardHeader>
              <h2 className="font-bold text-xl">Detail Information</h2>
            </CardHeader>
            <CardBody>
              <p className="text-base">
                부품 상세 스펙
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MypageDetail;

'use client';
import Link from "next/link";
import { myCardData } from "@/data/myCardData";
import MypageCard from "@/components/MypageCard";
import { Button } from "@nextui-org/button";
import { title, subtitle } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyCard from "@/components/MyCard";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import alarmData from "@/data/alarmData";
const cardData = [
  { id: 1, title: "인텔 코어i5-14세대 14400F", description: "Description for card 1" },
  { id: 2, title: "AMD Ryzen 5 5600X", description: "Description for card 2" },
  { id: 3, title: "NVIDIA RTX 3080", description: "Description for card 3" },
  { id: 4, title: "인텔 코어i7-14세대 14700K", description: "Description for card 4" },
  { id: 5, title: "AMD Ryzen 7 5800X", description: "Description for card 5" },
  { id: 6, title: "NVIDIA RTX 3090", description: "Description for card 6" },
];

export default function Mypage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full w-full">
      <div className="flex items-center justify-end w-full max-w-lg space-x-4">
        <h1 className={`${title({ color: "" })}`}>
          마이페이지&nbsp;
        </h1>
        <Link href="/estimate">
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ml-4"
          >
            견적추가
          </Button>
        </Link>
      </div>
      <Tabs aria-label="Options">
        <Tab title="내 견적">
          <div
            className="grid gap-x-8 gap-y-4 grid-cols-3 mt-8 overflow-y-auto hide-scrollbar w-full"
            style={{ height: "calc(100vh - 16rem)" }}
          >
            {myCardData.map((card) => (
              <MypageCard
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                details={card.details}
              />
            ))}
          </div>
        </Tab>
        <Tab title="관심상품">
          <div className="grid gap-x-8 gap-y-4 grid-cols-3 mt-4 overflow-y-auto hide-scrollbar" style={{ height: 'calc(100vh - 16rem)' }}>
            {cardData.map((card) => (
              <MyCard key={card.id} id={card.id} title={card.title} description={card.description} />
            ))}
          </div>
        </Tab>
        <Tab title="알림내역">
          <div className="relative flex flex-col items-center justify-center p-8 rounded-xl bg-white">
            <Table
              isStriped
              aria-label="Component Table"
              className="w-full text-lg mb-4" // text-lg for larger text size
              style={{ fontSize: '1.25rem' }} // 1.25rem = 20px
            >
              <TableHeader>
                <TableColumn className="text-lg">부품/견적</TableColumn>
                <TableColumn className="text-lg">이름</TableColumn>
                <TableColumn className="text-lg">알림내역</TableColumn> 
                <TableColumn className="text-lg">날짜</TableColumn> 
              </TableHeader>
              <TableBody>
                {alarmData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-blue-400 font-semibold text-lg">
                      {item.type}
                    </TableCell>
                    <TableCell className=" font-semibold  text-lg">{item.name}</TableCell>
                    <TableCell className=" font-semibold text-lg">{item.details}</TableCell>
                    <TableCell className=" font-semibold text-lg">{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </section>
  );
}

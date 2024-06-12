"use client";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { ScrollShadow } from "@nextui-org/react";

import { GithubIcon } from "@/components/icons";
import MyCard from "@/components/MyCard";
const cardData = [
  {
    id: 1,
    title: "인텔 코어i5-14세대 14400F",
    description:
      "인텔(소켓1700)/10nm(인텔7)/P6+E4코어/12+4스레드/기본 클럭:2.5GHz/최대 클럭:4.7GHz/L2 캐시:9.5MB/L3 캐시:20MB1",
  },
  { id: 2, title: "AMD Ryzen 5 5600X", description: "Description for card 2" },
  { id: 3, title: "NVIDIA RTX 3080", description: "Description for card 3" },
  {
    id: 4,
    title: "인텔 코어i7-14세대 14700K",
    description: "Description for card 4",
  },
  { id: 5, title: "AMD Ryzen 7 5800X", description: "Description for card 5" },
  { id: 6, title: "NVIDIA RTX 3090", description: "Description for card 6" },
];

export default function Component() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title({ color: "" })}>PC 부품&nbsp;</h1>
      </div>
      <Tabs aria-label="Options">
        <Tab title="All"></Tab>
        <Tab title="CPU"></Tab>
        <Tab title="메인보드"></Tab>
        <Tab title="메모리"></Tab>
        <Tab title="그래픽카드"></Tab>
        <Tab title="쿨러"></Tab>
        <Tab title="SSD"></Tab>
        <Tab title="케이스"></Tab>
        <Tab title="파워"></Tab>
      </Tabs>
      <div
        className="grid gap-x-8 gap-y-4 grid-cols-3 mt-4 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(100vh - 16rem)" }}
      >
        {cardData.map((card) => (
          <MyCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

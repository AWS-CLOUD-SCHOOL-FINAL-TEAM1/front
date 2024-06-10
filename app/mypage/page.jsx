import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MypageCard from "@/components/MypageCard";
import { Button } from "@nextui-org/button";

const cardData = [
  {
    id: 1,
    title: "인텔 코어i5-14세대 14400F",
    description: "Description for card 1",
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

export default function Mypage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full w-full">
      <div className="flex items-center justify-center w-full max-w-lg relative">
        <h1 className={`${title({ color: "" })} absolute left-1/2 transform -translate-x-1/2`}>
          마이페이지&nbsp;
        </h1>
        <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ml-auto">
          견적추가
        </Button>
      </div>
      <div
        className="grid gap-x-8 gap-y-4 grid-cols-3 mt-8 overflow-y-auto hide-scrollbar w-full"
        style={{ height: "calc(100vh - 16rem)" }}
      >
        {cardData.map((card) => (
          <MypageCard
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

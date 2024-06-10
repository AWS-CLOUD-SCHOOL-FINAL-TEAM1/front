import Link from "next/link";
import { myCardData } from "@/data/myCardData";
import MypageCard from "@/components/MypageCard";
import { Button } from "@nextui-org/button";

export default function Mypage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full w-full">
      <div className="flex items-center justify-center w-full max-w-lg relative">
        <h1 className="absolute left-1/2 transform -translate-x-1/2">
          마이페이지&nbsp;
        </h1>
        <Link href="/estimate">
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ml-auto"
          >
            견적추가
          </Button>
        </Link>
      </div>
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
    </section>
  );
}

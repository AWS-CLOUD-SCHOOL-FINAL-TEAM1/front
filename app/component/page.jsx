import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MyCard from "@/components/MyCard";
const cardData = [
  { id: 1, title: "인텔 코어i5-14세대 14400F", description: "Description for card 1" },
  { id: 2, title: "AMD Ryzen 5 5600X", description: "Description for card 2" },
  { id: 3, title: "NVIDIA RTX 3080", description: "Description for card 3" },
  { id: 4, title: "인텔 코어i7-14세대 14700K", description: "Description for card 4" },
  { id: 5, title: "AMD Ryzen 7 5800X", description: "Description for card 5" },
  { id: 6, title: "NVIDIA RTX 3090", description: "Description for card 6" },
];

export default function Component() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title({ color: "" })}>PC 부품&nbsp;</h1>
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-3 mt-8 overflow-y-auto hide-scrollbar" style={{ height: 'calc(100vh - 16rem)' }}>
        {cardData.map((card) => (
          <MyCard key={card.id} id={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </section>
  );
}

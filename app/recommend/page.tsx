import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

import EstimateCard from "@/components/EstimateCard";
import { estimatecardData } from "@/data/estimatecardData";

export default function Recommend() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center ">
        <h1 className={title({})}>견적추천&nbsp;</h1>
      </div>
      <div
        className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(100vh - 16rem)" }}
      >
        {estimatecardData.map((card) => (
          <EstimateCard
            key={card.id}
            type={card.type}
            id={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

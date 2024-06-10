import { estimatecardData } from "@/data/estimatecardData";

export async function generateStaticParams() {
  return estimatecardData.map((card) => ({
    id: card.id.toString(),
  }));
}

import { notFound } from "next/navigation";
import { estimatecardData } from "@/data/estimatecardData"; // 데이터 파일 경로 설정
import Image from "next/image"; // Next.js의 Image 컴포넌트 사용

export async function generateStaticParams() {
  return estimatecardData.map((card) => ({
    id: card.id.toString(),
  }));
}

const EstimateCardDetail = ({ params }) => {
  const { id } = params;
  const card = estimatecardData.find((card) => card.id.toString() === id);

  if (!card) {
    notFound();
  }

  const { details, description } = card;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{card.title}</h1>
          <p className="text-lg text-gray-700 mt-2">{description}</p>
        </div>
      </div>
      <div className="flex w-full max-w-4xl">
        <div className="flex-1 pr-8">
          <img
            src="https://nextui.org/images/hero-card-complete.jpeg"
            alt="Detail Image"
            width={500}
            height={500}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 pl-8">
          <h2 className="text-2xl font-semibold mb-4">{description}</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(details).map(([key, value]) => (
              <div className="flex justify-between" key={key}>
                <span className="font-bold">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateCardDetail;

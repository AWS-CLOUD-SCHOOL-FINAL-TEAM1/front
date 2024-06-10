"use client";

import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { estimatecardData } from "@/data/estimatecardData"; // 데이터 파일 경로 설정
import Image from "next/image"; // Next.js의 Image 컴포넌트 사용

const EstimateCardDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const card = estimatecardData.find((card) => card.id.toString() === id);

  if (!card) {
    notFound();
  }

  const { details, description } = card;

  const handleAddToEstimate = () => {
    // myPage로 라우팅
    router.push("/mypage");
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8 rounded-xl bg-white">
      <div className="flex w-full max-w-4xl">
        <div className="flex-1 pr-8">
          <Image
            src="https://nextui.org/images/hero-card-complete.jpeg"
            alt="Detail Image"
            width={500}
            height={500}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col flex-1 pl-8 relative">
          <h1 className="text-3xl font-bold">{card.title}</h1>
          <h2 className="text-2xl font-semibold mb-4">{description}</h2>
          <table className="table-auto w-full mb-16">
            <tbody>
              {Object.entries(details).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="text-blue-400 font-semibold">{key}</td>
                  <td className="p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="absolute bottom-0 right-0 mb-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddToEstimate}
          >
            내 견적에 담기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimateCardDetail;

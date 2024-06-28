import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import HeartButton from "@/components/HeartButton";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // 추가

// MyCard 컴포넌트: 개별 컴포넌트를 카드 형식으로 렌더링
const MyCard = ({
  id,
  title,
  specs,
  componentType,
  price,
  avgPriceLast45Days,
  imageUrl,
  isFavorite,
  onAlarmClick,
}) => {
  // 하트 버튼 클릭 시 호출되는 함수
  const handleButtonClick = (e) => {
    e.preventDefault(); // 기본 동작 중지 (링크 클릭 중지)
    e.stopPropagation(); // 카드 클릭 이벤트가 실행되지 않도록 중지
    console.log("Heart button clicked"); // 로그 추가
    onAlarmClick(id, componentType, isFavorite); // 알람 모달 열기 함수 호출
  };

  const priceTrend = price < avgPriceLast45Days ? "down" : "up";
  const trendColor =
    priceTrend === "down" ? "text-green-500" : "text-orange-500";
  const TrendIcon = priceTrend === "down" ? FaArrowDown : FaArrowUp;

  // isFavorite을 제외한 스펙 필터링
  const filteredSpecs = specs.filter(
    (spec) =>
      !spec.toLowerCase().includes("isfavorite") &&
      !spec.toLowerCase().includes("color") &&
      !spec.toLowerCase().includes("graphic") &&
      !spec.toLowerCase().includes("l3cache") &&
      !spec.toLowerCase().includes("vrm") &&
      !spec.toLowerCase().includes("dram") &&
      !spec.toLowerCase().includes("l3cache")
  );

  return (
    <Link href={`/component/${id}?componentType=${componentType}`} passHref>
      <div className="relative">
        <Card
          className="p-3 cursor-pointer"
          style={{ width: "100%", height: "100%" }}
          onClick={() => console.log("Card clicked")} // 로그 추가
        >
          <div className="flex justify-between">
            <h4 className="font-bold">{title}</h4>
            <HeartButton isFavorite={isFavorite} onClick={handleButtonClick} />
          </div>

          <CardBody className="pt-2">
            <Image src={imageUrl} alt={title} className="rounded-xl" />
            <div className="mt-4">
              <div className="flex items-center">
                <p className="mt-2 font-bold text-blue-600">{price}₩</p>
                <TrendIcon className={`ml-2 ${trendColor}`} />
                <p className={`ml-2 ${trendColor}`}>({avgPriceLast45Days}₩)</p>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                45일 평균 가격: {avgPriceLast45Days}₩
              </p>
              <table className="w-full table-auto text-left border-collapse mt-2">
                <tbody>
                  {filteredSpecs.map((spec, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-200 font-medium bg-gray-100">
                        {spec.split(": ")[0]}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {spec.split(": ")[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default MyCard;

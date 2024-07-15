import React from "react";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import HeartButton from "@/components/HeartButton";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import CustomImage from "@/components/CustomImage"; // 새로운 이미지 컴포넌트 임포트

const MyFavCard = ({
  id,
  title,
  componentType,
  price,
  avgPriceLast45Days,
  imageUrl,
  isFavorite,
  onAlarmClick,
}) => {
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAlarmClick(id, componentType, isFavorite);
  };

  // Convert price and avgPriceLast45Days to numbers if they are strings
  const numericPrice = parseFloat(price);
  const numericAvgPriceLast45Days = parseFloat(avgPriceLast45Days);

  const priceTrend = numericPrice < numericAvgPriceLast45Days ? "down" : "up";
  const trendColor =
    priceTrend === "down" ? "text-green-500" : "text-orange-500";
  const TrendIcon = priceTrend === "down" ? FaArrowDown : FaArrowUp;

  const priceDifference = Math.abs(
    numericPrice - numericAvgPriceLast45Days
  ).toLocaleString();

  const displayPrice =
    numericPrice === 0 ? "재입고 예정" : `${numericPrice.toLocaleString()}₩`;
  const encodedId = encodeURIComponent(id);

  return (
    <Link
      href={`/component/${encodedId}?componentType=${componentType}`}
      passHref
    >
      <div className="relative">
        <Card
          className="p-3 cursor-pointer"
          style={{ width: "100%", height: "100%" }}
        >
          <div className="flex justify-between">
            <h4 className="font-bold">{title}</h4>
            <HeartButton isFavorite={isFavorite} onClick={handleButtonClick} />
          </div>

          <CardBody className="pt-2">
            <div className="flex justify-center">
              <CustomImage
                src={imageUrl}
                alt={title}
                className="rounded-xl"
                style={{ width: "150px", height: "150px" }} // 이미지 크기 조정
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-center">
                <p className="mt-2 font-bold text-blue-600">{displayPrice}</p>
                {numericPrice !== 0 && (
                  <>
                    <TrendIcon className={`ml-2 ${trendColor}`} />
                    <p className={`ml-2 ${trendColor}`}>({priceDifference}₩)</p>
                  </>
                )}
              </div>
              {numericPrice !== 0 && (
                <p className="text-gray-500 text-sm text-center mt-1">
                  45일 평균 가격: {numericAvgPriceLast45Days.toLocaleString()}₩
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default MyFavCard;

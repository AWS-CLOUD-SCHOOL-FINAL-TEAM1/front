import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import HeartButton from "@/components/HeartButton";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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

  const priceTrend = price < avgPriceLast45Days ? "down" : "up";
  const trendColor =
    priceTrend === "down" ? "text-green-500" : "text-orange-500";
  const TrendIcon = priceTrend === "down" ? FaArrowDown : FaArrowUp;

  const priceDifference = Math.abs(price - avgPriceLast45Days).toLocaleString();

  return (
    <Link href={`/component/${id}?componentType=${componentType}`} passHref>
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
              <Image
                src={imageUrl}
                alt={title}
                className="rounded-xl"
                style={{ width: "150px", height: "150px" }} // 이미지 크기 조정
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-center">
                <p className="mt-2 font-bold text-blue-600">
                  {price.toLocaleString()}₩
                </p>
                <TrendIcon className={`ml-2 ${trendColor}`} />
                <p className={`ml-2 ${trendColor}`}>({priceDifference}₩)</p>
              </div>
              <p className="text-gray-500 text-sm text-center mt-1">
                45일 평균 가격: {avgPriceLast45Days.toLocaleString()}₩
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default MyFavCard;

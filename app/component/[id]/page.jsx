"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import LineChart from "@/components/LineChart"; // LineChart component import
import { fetchComponentDetail } from "../api";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react"; // NextUI Table components
import Title from "@/components/Title"; // Title 컴포넌트 임포트

const placeholderImage =
  "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg";

const CardDetail = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const componentType = searchParams.get("componentType");

  const [componentDetail, setComponentDetail] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [priceChartData, setPriceChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && componentType) {
      const fetchData = async () => {
        try {
          const decodedId = decodeURIComponent(id);
          // 로그 출력
          console.log("Fetching data with:", { id: decodedId, componentType });

          const { component_data, price_data } = await fetchComponentDetail(
            decodedId,
            componentType
          );
          if (!component_data || component_data.length === 0) {
            throw new Error("No component detail found");
          }
          console.log("Component Data:", component_data);
          console.log("Price Data:", price_data);

          setComponentDetail(component_data);

          const sanitizeJSON = (str) => {
            try {
              return str
                .replace(/'/g, '"')
                .replace(/,\s*}/g, "}")
                .replace(/,\s*]/g, "]");
            } catch (e) {
              console.error("Error sanitizing JSON:", e);
              return null;
            }
          };

          const shops = component_data[0]?.Shop
            ? JSON.parse(sanitizeJSON(component_data[0].Shop))
            : [];
          const prices = component_data[0]?.Price
            ? JSON.parse(sanitizeJSON(component_data[0].Price))
            : [];
          const urls = component_data[0]?.URL
            ? JSON.parse(sanitizeJSON(component_data[0].URL))
            : [];
          const priceArray = shops.map((shop, index) => ({
            Shop: shop,
            Price: parseFloat(prices[index]),
            URL: urls[index],
          }));

          // Sort priceArray by Price
          priceArray.sort((a, b) => a.Price - b.Price);

          setPriceData(priceArray);

          // Set price chart data
          const chartData = [
            { date: "Day 1", price: parseFloat(price_data[0]?.day1 || 0) },
            { date: "Day 2", price: parseFloat(price_data[0]?.day2 || 0) },
            { date: "Day 3", price: parseFloat(price_data[0]?.day3 || 0) },
            { date: "Day 4", price: parseFloat(price_data[0]?.day4 || 0) },
            { date: "Day 5", price: parseFloat(price_data[0]?.day5 || 0) },
            { date: "Day 6", price: parseFloat(price_data[0]?.day6 || 0) },
            { date: "Day 7", price: parseFloat(price_data[0]?.day7 || 0) },
          ];
          setPriceChartData(chartData);
        } catch (err) {
          console.error("Error fetching component details:", err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id, componentType]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <CircularProgress size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!componentDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1>No component detail found</h1>
      </div>
    );
  }

  const excludedKeys = [
    "ComponentID",
    "Type",
    "AvgPriceLast45Days",
    "Price",
    "URL",
    "LowestPrice",
    "LowestShop",
    "LowestURL",
    "Shop",
    "Date",
    "ImageURL",
  ];

  const detailedInfo = Object.entries(componentDetail[0])
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([key, value]) => (
      <TableRow key={key}>
        <TableCell className="font-semibold">{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    ));

  return (
    <div className="container mx-auto p-4 ">
      <Title>부품 상세</Title>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="w-full md:w-1/2 p-4">
          <Image
            src={componentDetail[0].ImageURL || placeholderImage}
            alt="Detail Image"
            className="object-cover rounded-xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <Card className="bg-white mb-4">
            <CardHeader className="pb-2">
              <h2 className="font-bold text-xl md:text-2xl">
                {componentDetail[0].Model}
              </h2>
            </CardHeader>
          </Card>
          <Table
            aria-label="Shop Prices"
            className="w-full text-base md:text-lg mb-4"
          >
            <TableHeader>
              <TableColumn className="font-semibold">SHOP</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>상품 링크</TableColumn>
            </TableHeader>
            <TableBody>
              {priceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-blue-400 font-semibold text-base md:text-lg">
                    {item.Shop}
                  </TableCell>
                  <TableCell className="text-base md:text-lg">
                    {item.Price === 0
                      ? "재입고 예정"
                      : `₩${item.Price.toLocaleString()}`}
                  </TableCell>
                  <TableCell>
                    <a
                      href={item.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      ▶ 상품 보러 가기
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table
            aria-label="Component Specs"
            className="w-full text-base md:text-lg mb-4"
          >
            <TableHeader>
              <TableColumn className="font-semibold">SPEC</TableColumn>
              <TableColumn>DETAIL</TableColumn>
            </TableHeader>
            <TableBody>{detailedInfo}</TableBody>
          </Table>
        </div>
      </div>
      <div className="max-w-4xl rounded-xl mx-auto mt-8 bg-white">
        <LineChart data={priceChartData} />
      </div>
    </div>
  );
};

export default CardDetail;

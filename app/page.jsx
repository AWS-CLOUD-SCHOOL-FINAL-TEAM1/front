"use client";
import { useEffect } from "react";
import { Image } from "@nextui-org/image";
import { title } from "@/components/primitives";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  FaBell,
  FaShoppingCart,
  FaLaptop,
  FaMemory,
  FaHdd,
  FaFan,
  FaBatteryFull,
  FaMicrochip,
} from "react-icons/fa";

Chart.register(...registerables);

const sampleData = [
  {
    type: "CPU",
    name: "Ryzen 5 3600",
    seller: "다나와",
    price: 199000,
    prices: [
      199000, 202000, 198000, 195000, 200000, 199000, 202000, 198000, 195000,
      199000, 202000, 198000, 195000,
    ],
    icon: <FaMicrochip color="white" />,
  },
  {
    type: "GPU",
    name: "RTX 3080",
    seller: "컴퓨존",
    price: 899000,
    prices: [
      899000, 900000, 895000, 899000, 910000, 900000, 899000, 910000, 899000,
      910000,
    ],
    icon: <FaLaptop color="white" />,
  },
  {
    type: "Memory",
    name: "16GB DDR4",
    seller: "컴마왕",
    price: 79000,
    prices: [
      79000, 78000, 80000, 79000, 79500, 80000, 80000, 79000, 80000, 79000,
    ],
    icon: <FaMemory color="#cffafe" />,
  },
  {
    type: "Storage",
    name: "1TB SSD",
    seller: "다나와",
    price: 129000,
    prices: [
      129000, 130000, 128000, 127000, 129000, 130000, 128000, 130000, 128000,
    ],
    icon: <FaHdd color="#bae6fd" />,
  },
  {
    type: "Cooler",
    name: "Cooler Master",
    seller: "컴퓨존",
    price: 69000,
    prices: [69000, 70000, 68000, 69000, 69500, 70000],
    icon: <FaFan color="#7dd3fc" />,
  },
  {
    type: "Power",
    name: "750W PSU",
    seller: "컴마왕",
    price: 109000,
    prices: [
      129000, 130000, 128000, 127000, 129000, 130000, 128000, 130000, 128000,
    ],
    icon: <FaBatteryFull color="#38bdf8" />,
  },
  {
    type: "Case",
    name: "NZXT H510",
    seller: "다나와",
    price: 89000,
    prices: [89000, 88000, 90000, 89000, 89500, 90000],
    icon: <FaShoppingCart color="#3b82f6" />,
  },
];

const getLineColor = (prices) => {
  return prices[prices.length - 1] > prices[0] ? "green" : "orange";
};

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-fade");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          section.classList.add("fadeInUp");
        } else {
          section.classList.remove("fadeInUp");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10  text-white">
      <div className="inline-block max-w-lg text-center mt-8 scroll-fade">
        <h1 className="text-xl md:text-2xl font-semibold  bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent pb-2">
          최저가로, 최적의 성능만.
        </h1>
      </div>
      <Image
        src="/spoid_logo.png"
        alt="SPOID Logo"
        width={500}
        height={500}
        className="scroll-fade"
      />

      <div className="w-3/5 mt-6 py-8 flex justify-center">
        <div className="w-full max-w-5xl h-full aspect-[2/1]">
          <table className="w-full h-full text-white bg-gradient-to-b from-gray-700 to-black shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">제품명</th>
                <th className="px-4 py-2">판매사</th>
                <th className="px-4 py-2">현재 가격</th>
                <th className="px-4 py-2">가격 추이</th>
              </tr>
            </thead>
            <tbody className="m-5">
              {sampleData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-center">{item.icon}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.seller}</td>
                  <td
                    className="px-4 py-2"
                    style={{ color: getLineColor(item.prices) }}
                  >
                    {item.price.toLocaleString()}원
                  </td>
                  <td className="w-[100px] h-[50px]">
                    <Line
                      data={{
                        labels: item.prices.map((_, i) => i + 1),
                        datasets: [
                          {
                            data: item.prices,
                            borderColor: getLineColor(item.prices),
                            borderWidth: 2,
                            fill: false,
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          x: { display: false },
                          y: {
                            display: false,
                            min: Math.min(...item.prices) - 1000,
                            max: Math.max(...item.prices) + 1000,
                          },
                        },
                        elements: {
                          line: { tension: 0.4 },
                          point: { radius: 0 },
                        },
                      }}
                      height={50}
                      width={100}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 py-16 md:py-20">
        <section className="scroll-fade flex flex-col md:flex-row items-center justify-center gap-8 py-8 md:py-10 animate-floating">
          <Image
            src="/minprice.png"
            alt="시장 최저가 추적"
            width={600}
            height={300}
            className="rounded-lg"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold">시장 최저가 추적</h2>
            <p className="max-w-2xl text-center md:text-left text-lg md:text-xl">
              사용자가 다나와, 컴퓨존, 컴마왕의 최저가를 매일 추적해서 실제
              시장의 최저가를 한눈에 알려주는 유일한 사이트입니다.
            </p>
          </div>
        </section>

        <section className="scroll-fade flex flex-col md:flex-row-reverse items-center justify-center gap-8 py-8 md:py-10 animate-floating">
          <Image
            src="/alarmmodal.png"
            alt="가격 하락 알람"
            width={200}
            height={300}
            className="rounded-lg"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold">가격 하락 알람</h2>
            <p className="max-w-2xl text-center md:text-left text-lg md:text-xl">
              내가 관심 있는 부품에 알람 버튼을 클릭하면, 지난 45일 평균 가격의
              10% 이상 가격 하락 시 사용자에게 알람을 보냅니다.
            </p>
          </div>
        </section>

        <section className="scroll-fade flex flex-col md:flex-row items-center justify-center gap-8 py-8 md:py-10 animate-floating">
          <Image
            src="/alarm.png"
            alt="관심상품 모아보기"
            width={600}
            height={300}
            className="rounded-lg"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold">
              관심상품 모아보기
            </h2>
            <p className="max-w-2xl text-center md:text-left text-lg md:text-xl">
              나만의 관심상품을 모아서 한눈에 볼 수 있습니다.
            </p>
          </div>
        </section>

        <section className="scroll-fade flex flex-col md:flex-row-reverse items-center justify-center gap-8 py-8 md:py-10 animate-floating">
          <Image
            src="/custom.png"
            alt="나만의 견적 내기"
            width={600}
            height={300}
            className="rounded-lg"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold">나만의 견적 내기</h2>
            <p className="max-w-2xl text-center md:text-left text-lg md:text-xl">
              나만의 견적을 쉽게 낼 수 있으며, 상세 비교도 가능합니다.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}

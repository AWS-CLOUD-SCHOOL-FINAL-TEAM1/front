"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
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
import { fetchLandingPageData } from "./api";

Chart.register(...registerables);

const getIcon = (type) => {
  switch (type) {
    case "Cpu":
      return <FaMicrochip color="white" />;
    case "Gpu":
      return <FaLaptop color="white" />;
    case "Memory":
      return <FaMemory color="#cffafe" />;
    case "Storage":
      return <FaHdd color="#bae6fd" />;
    case "Cooler":
      return <FaFan color="#7dd3fc" />;
    case "Power":
      return <FaBatteryFull color="#38bdf8" />;
    case "PcCase":
      return <FaShoppingCart color="#3b82f6" />;
    default:
      return <FaBell color="white" />;
  }
};

const getLineColor = (prices) => {
  return prices[prices.length - 1] > prices[0] ? "green" : "orange";
};

const sanitizeJSON = (str) => {
  try {
    return str.replace(/'/g, '"').replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
  } catch (e) {
    console.error("Error sanitizing JSON:", e);
    return null;
  }
};

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLandingPageData();
        setData(response);
      } catch (error) {
        console.error("Error fetching landing page data:", error.message);
      }
    };

    fetchData();
  }, []);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  const components = [
    "CPU",
    "GPU",
    "MEMORY",
    "STORAGE",
    "COOLER",
    "POWER",
    "PcCase",
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-white">
      <div className="inline-block max-w-lg text-center mt-8 scroll-fade">
        <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent pb-2">
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
              {components.map((type) =>
                data[type].map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-center">{getIcon(type)}</td>
                    <td className="px-4 py-2">{item.Model}</td>
                    <td className="px-4 py-2">{item.LowestShop}</td>
                    <td
                      className="px-4 py-2"
                      style={{
                        color: getLineColor(
                          JSON.parse(sanitizeJSON(item.Price))
                        ),
                      }}
                    >
                      {item.LowestPrice.toLocaleString()}원
                    </td>
                    <td className="w-[50px] h-[30px]">
                      <Line
                        data={{
                          labels: JSON.parse(sanitizeJSON(item.Date)),
                          datasets: [
                            {
                              data: JSON.parse(sanitizeJSON(item.Price)),
                              borderColor: getLineColor(
                                JSON.parse(sanitizeJSON(item.Price))
                              ),
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
                              min:
                                Math.min(
                                  ...JSON.parse(sanitizeJSON(item.Price))
                                ) - 1000,
                              max:
                                Math.max(
                                  ...JSON.parse(sanitizeJSON(item.Price))
                                ) + 1000,
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
                ))
              )}
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

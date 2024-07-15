"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { getFavoriteComponents, createHeart, deleteHeart } from "./api";
import MyFavCard from "@/components/MyFavCard"; // 수정된 컴포넌트 이름
import { CircularProgress } from "@nextui-org/react";
import { title } from "@/components/primitives";
import AlarmModal from "@/components/AlarmModal";
import Title from "@/components/Title"; // Title 컴포넌트 임포트
import { Button } from "@nextui-org/button";
import { IoHappyOutline } from "react-icons/io5";
const placeholderImage =
  "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg";

export default function HeartPage() {
  const [favoriteComponents, setFavoriteComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [currentComponentId, setCurrentComponentId] = useState(null);
  const [currentComponentType, setCurrentComponentType] = useState(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const router = useRouter();

  const excludedKeys = [
    "Model",
    "Company",
    "Type",
    "ImageURL",
    "URL",
    "ComponentID",
    "Shop",
    "Date",
    "Price",
    "LowestPrice",
    "LowestShop",
    "LowestURL",
    "IsFavorite",
    "Color",
    "AvgPriceLast45Days",
  ];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.userId) {
          const userIdWithPrefix = `google_${user.userId}`;
          setUserId(userIdWithPrefix);
          const data = await getFavoriteComponents(userIdWithPrefix);
          setFavoriteComponents(data);
        }
      } catch (error) {
        console.error("Error fetching favorite components:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleAlarmClick = (componentId, componentType, isFavorite) => {
    console.log("Button clicked:", componentId, componentType, isFavorite); // 로그 추가
    setCurrentComponentId(componentId);
    setCurrentComponentType(componentType);
    setIsAlarmEnabled(isFavorite);
    setIsAlarmModalOpen(true);
  };

  const handleConfirmAlarm = async () => {
    try {
      if (isAlarmEnabled) {
        await deleteHeart({
          user_id: userId,
          component_id: currentComponentId,
          component_type: currentComponentType,
        });
      } else {
        await createHeart({
          user_id: userId,
          component_id: currentComponentId,
          component_type: currentComponentType,
        });
      }
      const updatedFavorites = await getFavoriteComponents(userId);
      setFavoriteComponents(updatedFavorites);
    } catch (error) {
      console.error("Error toggling alarm:", error.message);
    } finally {
      setIsAlarmModalOpen(false);
    }
  };

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
        <h1 className={title({ color: "" })}>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!favoriteComponents || favoriteComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center mb-4">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 className=" text-2xl text-white font-bold">
            아직 관심 부품이 등록되지 않았어요
          </h1>
          <IoHappyOutline className="text-4xl text-white ml-4" />
        </div>
        <Button
          className="m-12"
          onClick={() => router.push("/component")}
          style={{
            background: "#d269fd",
            background:
              "-webkit-linear-gradient(219deg, #d269fd 0%, #399ad1 100%)",
            background: "linear-gradient(219deg, #d269fd 0%, #399ad1 100%)",
            color: "white",
          }}
        >
          관심 부품 찾으러 가기
        </Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6 h-full">
      <Title>내 관심 상품</Title>

      <div className="inline-block max-w-lg text-center"></div>
      <div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-2 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(90vh - 16rem)" }}
      >
        {favoriteComponents.map((component) => (
          <MyFavCard
            key={component.ComponentID}
            id={component.ComponentID}
            title={component.Model}
            componentType={component.Type}
            price={component.Price}
            avgPriceLast45Days={component.AvgPriceLast45Days}
            imageUrl={component.ImageURL || placeholderImage}
            isFavorite={true} // 관심 부품이므로 항상 true
            onAlarmClick={handleAlarmClick}
            data={component} // 컴포넌트 데이터를 전부 넘김
            excludedKeys={excludedKeys} // 제외할 키값들
          />
        ))}
      </div>
      <AlarmModal
        isOpen={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        onConfirm={handleConfirmAlarm}
        isAlarmEnabled={isAlarmEnabled}
      />
    </section>
  );
}

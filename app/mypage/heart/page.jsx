"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/auth";
import { getFavoriteComponents, createHeart, deleteHeart } from "../api";
import MyCard from "@/components/MyFavCard";
import { CircularProgress } from "@nextui-org/react";
import { title } from "@/components/primitives";
import AlarmModal from "@/components/AlarmModal";

export default function HeartPage() {
  const [favoriteComponents, setFavoriteComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [currentComponentId, setCurrentComponentId] = useState(null);
  const [currentComponentType, setCurrentComponentType] = useState(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

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
        <h1 className={title({ color: "" })}>No favorite components found</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title({ color: "", className: "my-2" })}>
          관심 부품 목록
        </h1>
      </div>
      <div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-2 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(90vh - 16rem)" }}
      >
        {favoriteComponents.map((component) => (
          <MyCard
            key={component.ComponentID}
            id={component.ComponentID}
            title={component.Model}
            specs={component.specs}
            componentType={component.Type}
            price={component.Price}
            imageUrl={component.ImageURL}
            isFavorite={true} // 관심 부품이므로 항상 true
            onAlarmClick={handleAlarmClick} // 알람 클릭 핸들러 추가
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

"use client";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/auth";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyCard from "@/components/MyCard";
import { CircularProgress } from "@nextui-org/react";
import AlarmModal from "@/components/AlarmModal";
import { ComponentAPI, createHeart, deleteHeart } from "./api";
import { useRouter } from "next/navigation"; // useRouter 추가
import Title from "@/components/Title"; // Title 컴포넌트 임포트

export default function Component() {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Cpu");
  const [userId, setUserId] = useState("");
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [currentComponentId, setCurrentComponentId] = useState(null);
  const [currentComponentType, setCurrentComponentType] = useState(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const router = useRouter(); // useRouter 초기화

  const fetchData = async (componentType, userId) => {
    console.log(
      `Fetching data for component type: ${componentType} and user: ${userId}`
    );
    try {
      const data = await ComponentAPI(componentType, userId);
      console.log("Fetched data:", data);
      setComponents(data);
      setFilteredComponents(data);
    } catch (error) {
      console.error("Error fetching components:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user ? `google_${user.userId}` : "");
        await fetchData("CPU", user ? `google_${user.userId}` : "");
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const filterComponents = () => {
      if (selectedTab === "All") {
        setFilteredComponents(components);
      } else {
        setFilteredComponents(
          components.filter(
            (component) =>
              component.Type.toLowerCase() === selectedTab.toLowerCase()
          )
        );
      }
    };

    filterComponents();
  }, [selectedTab, components]);

  const handleTabChange = async (key) => {
    setIsLoading(true);
    setSelectedTab(key);
    await fetchData(key === "All" ? "CPU" : key, userId);
  };

  const handleAlarmClick = (componentId, componentType, isFavorite) => {
    if (!userId) {
      // 비로그인 상태인 경우 로그인 페이지로 리다이렉트
      router.push("/login");
      return;
    }

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
      fetchData(selectedTab, userId);
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
        <h2 className={title({ color: "" })}>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!filteredComponents || filteredComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className={title({ color: "foreground", size: "sm" })}>
          No components found
        </h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6 h-full">
      <Title>PC 부품</Title>
      <div className="inline-block max-w-lg text-center"></div>
      <div className="w-full flex justify-center">
        <div className="p-4 rounded-lg w-full sm:w-auto">
          <Tabs
            aria-label="Options"
            selectedKey={selectedTab}
            onSelectionChange={handleTabChange}
            variant="bordered"
            className="flex flex-wrap  justify-center m-5 space-x-2"
          >
            <Tab
              title="CPU"
              key="CPU"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="GPU"
              key="GPU"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="MAINBOARD"
              key="MAINBOARD"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="MEMORY"
              key="MEMORY"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="STORAGE"
              key="STORAGE"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="CASE"
              key="PcCase"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="POWER"
              key="POWER"
              className="px-4 py-2 hover:bg-gray-100"
            />
            <Tab
              title="COOLER"
              key="COOLER"
              className="px-4 py-2 hover:bg-gray-100"
            />
          </Tabs>
        </div>
      </div>
      <div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mt-2 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(90vh - 16rem)" }}
      >
        {filteredComponents.map((component) => {
          const specs = Object.keys(component)
            .filter(
              (key) =>
                ![
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
                  "AvgPriceLast45Days", // 추가
                ].includes(key)
            )
            .map((key) => `${key}: ${component[key]}`);
          return (
            <MyCard
              key={component.ComponentID}
              id={component.ComponentID}
              title={component.Model}
              specs={specs}
              componentType={component.Type}
              price={component.LowestPrice}
              avgPriceLast45Days={component.AvgPriceLast45Days} // 추가
              imageUrl={component.ImageURL}
              isFavorite={component.IsFavorite}
              onAlarmClick={handleAlarmClick}
            />
          );
        })}
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

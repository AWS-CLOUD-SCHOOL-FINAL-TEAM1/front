"use client";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/auth";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyCard from "@/components/MyCard";
import { CircularProgress } from "@nextui-org/react";
import { Pagination } from "@nextui-org/pagination";
import AlarmModal from "@/components/AlarmModal";
import { ComponentAPI, createHeart, deleteHeart } from "./api";

export default function Component() {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Cpu");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [userId, setUserId] = useState("");
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [currentComponentId, setCurrentComponentId] = useState(null);
  const [currentComponentType, setCurrentComponentType] = useState(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

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
        await fetchData("Cpu", user ? `google_${user.userId}` : "");
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
    setCurrentPage(1);
    await fetchData(key === "All" ? "Cpu" : key, userId);
  };

  const handlePageChange = async (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    await fetchData(selectedTab === "All" ? "Cpu" : selectedTab, userId);
  };

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
        <h1 className={title({ color: "" })}>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!filteredComponents || filteredComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className={title({ color: "" })}>No components found</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title({ color: "", className: "my-2" })}>
          PC 부품&nbsp;
        </h1>
      </div>
      <Tabs
        aria-label="Options"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab title="CPU" key="Cpu"></Tab>
        <Tab title="GPU" key="Gpu"></Tab>
        <Tab title="MAINBOARD" key="Mainboard"></Tab>
        <Tab title="MEMORY" key="Memory"></Tab>
        <Tab title="STORAGE" key="Storage"></Tab>
        <Tab title="CASE" key="PcCase"></Tab>
        <Tab title="POWER" key="Power"></Tab>
        <Tab title="COOLER" key="Cooler"></Tab>
      </Tabs>
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
              imageUrl={component.ImageURL}
              isFavorite={component.IsFavorite}
              onAlarmClick={handleAlarmClick}
            />
          );
        })}
      </div>
      <Pagination
        isCompact
        showControls
        total={Math.ceil(filteredComponents.length / itemsPerPage)}
        initialPage={1}
        page={currentPage}
        onChange={handlePageChange}
      />
      <AlarmModal
        isOpen={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        onConfirm={handleConfirmAlarm}
        isAlarmEnabled={isAlarmEnabled}
      />
    </section>
  );
}

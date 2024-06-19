'use client';
import React, { useState, useEffect } from 'react';
import { ComponentAPI } from "./api";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyCard from "@/components/MyCard";
import { CircularProgress } from "@nextui-org/react";
import { Pagination } from "@nextui-org/pagination";

export default function Component() {
  const [components, setComponents] = useState({
    Cpu: [],
    Gpu: [],
    Cooler: [],
    Mainboard: [],
    Memory: [],
    Storage: [],
    PcCase: [],
    Power: []
  });
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 아이템 수를 10으로 설정

  const fetchData = async (index = 0) => {
    try {
      const { cpuData, gpuData, mainboardData, memoryData, storageData, powerData, coolerData, pcCaseData } = await ComponentAPI(index);
      setComponents({
        Cpu: cpuData,
        Gpu: gpuData,
        Cooler: coolerData,
        Mainboard: mainboardData,
        Memory: memoryData,
        Storage: storageData,
        PcCase: pcCaseData,
        Power: powerData,
      });
      setFilteredComponents([...cpuData, ...gpuData, ...mainboardData, ...memoryData, ...storageData, ...powerData, ...coolerData, ...pcCaseData]); // Initially show all components
    } catch (error) {
      console.error('Error fetching components:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterComponents = () => {
      const { Cpu, Gpu, Cooler, Mainboard, Memory, Storage, PcCase, Power } = components;
      let key = selectedTab.toLowerCase();
      switch (key) {
        case "cpu":
          key = "Cpu";
          break;
        case "gpu":
          key = "Gpu";
          break;
        case "mainboard":
          key = "Mainboard";
          break;
        case "memory":
          key = "Memory";
          break;
        case "storage":
          key = "Storage";
          break;
        case "case":
          key = "PcCase";
          break;
        case "power":
          key = "Power";
          break;
        case "cooler":
          key = "Cooler";
          break;
        default:
          key = "All";
          break;
      }

      if (selectedTab === "All") {
        setFilteredComponents([...Cpu, ...Gpu, ...Mainboard, ...Memory, ...Storage, ...Power, ...Cooler, ...PcCase]);
      } else {
        setFilteredComponents(components[key] || []);
      }
    };

    filterComponents();
  }, [selectedTab, components]);

  const handleTabChange = (key) => {
    setSelectedTab(key);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const handlePageChange = async (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    await fetchData(page);
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
        <h1 className={title({ color: "", className: "my-2" })}>PC 부품&nbsp;</h1>
      </div>
      <Tabs aria-label="Options" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
        <Tab title="All" key="All"></Tab>
        <Tab title="CPU" key="CPU"></Tab>
        <Tab title="GPU" key="GPU"></Tab>
        <Tab title="MAINBOARD" key="MAINBOARD"></Tab>
        <Tab title="MEMORY" key="MEMORY"></Tab>
        <Tab title="STORAGE" key="STORAGE"></Tab>
        <Tab title="CASE" key="CASE"></Tab>
        <Tab title="POWER" key="POWER"></Tab>
        <Tab title="COOLER" key="COOLER"></Tab>
      </Tabs>
      <div
        className="grid gap-x-8 gap-y-4 grid-cols-3 mt-2 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(90vh - 16rem)" }}
      >
        {filteredComponents.map((component) => (
          <MyCard
            key={component.ComponentID}
            id={component.ComponentID}
            title={component.Model}
            description={component.Company}
            imageUrl={component.ImageURL}
          />
        ))}
      </div>
      <Pagination
        isCompact
        showControls
        total={Math.ceil(filteredComponents.length / itemsPerPage)}
        initialPage={1}
        page={currentPage}
        onChange={handlePageChange}
      />
    </section>
  );
}

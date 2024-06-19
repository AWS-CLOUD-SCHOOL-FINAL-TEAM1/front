<<<<<<< HEAD
"use client";
import React, { useState, useEffect } from "react";
=======
'use client';
import React, { useState, useEffect } from 'react';
>>>>>>> b3e6bef92c8bec4c049baffd677c55b5eaf02613
import { ComponentAPI } from "./api";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyCard from "@/components/MyCard";
import { CircularProgress } from "@nextui-org/react";
import { Pagination } from "@nextui-org/pagination";

export default function Component() {
  const [components, setComponents] = useState({
    cpu: [],
    gpu: [],
    cooler: [],
    mainboard: [],
    memory: [],
    storage: [],
    case: [],
<<<<<<< HEAD
    power: [],
=======
    power: []
>>>>>>> b3e6bef92c8bec4c049baffd677c55b5eaf02613
  });
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 아이템 수를 10으로 설정

  const fetchData = async (index = 0) => {
    try {
<<<<<<< HEAD
      const {
        cpuData,
        gpuData,
        mainboardData,
        memoryData,
        storageData,
        powerData,
        coolerData,
        caseData,
      } = await ComponentAPI(index);
=======
      const { cpuData, gpuData, mainboardData, memoryData, storageData, powerData, coolerData, caseData } = await ComponentAPI(index);
>>>>>>> b3e6bef92c8bec4c049baffd677c55b5eaf02613
      setComponents({
        cpu: cpuData,
        gpu: gpuData,
        cooler: coolerData,
        mainboard: mainboardData,
        memory: memoryData,
        storage: storageData,
        case: caseData,
        power: powerData,
      });
<<<<<<< HEAD
      setFilteredComponents([
        ...cpuData,
        ...gpuData,
        ...mainboardData,
        ...memoryData,
        ...storageData,
        ...powerData,
        ...coolerData,
        ...caseData,
      ]); // Initially show all components
    } catch (error) {
      console.error("Error fetching components:", error.message);
=======
      setFilteredComponents([...cpuData, ...gpuData, ...mainboardData, ...memoryData, ...storageData, ...powerData, ...coolerData, ...caseData]); // Initially show all components
    } catch (error) {
      console.error('Error fetching components:', error.message);
>>>>>>> b3e6bef92c8bec4c049baffd677c55b5eaf02613
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
<<<<<<< HEAD
      const {
        cpu,
        gpu,
        cooler,
        mainboard,
        memory,
        storage,
        case: pcCase,
        power,
      } = components;
      if (selectedTab === "All") {
        setFilteredComponents([
          ...cpu,
          ...gpu,
          ...mainboard,
          ...memory,
          ...storage,
          ...power,
          ...cooler,
          ...pcCase,
        ]);
=======
      const { cpu, gpu, cooler, mainboard, memory, storage, case: pcCase, power } = components;
      if (selectedTab === "All") {
        setFilteredComponents([...cpu, ...gpu, ...mainboard, ...memory, ...storage, ...power, ...cooler, ...pcCase]);
>>>>>>> b3e6bef92c8bec4c049baffd677c55b5eaf02613
      } else {
        setFilteredComponents(components[selectedTab.toLowerCase()]);
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
    const index = (page - 1) * itemsPerPage;
    await fetchData(index);
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

  if (!filteredComponents.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className={title({ color: "" })}>No components found</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6 h-full">
      <div className="inline-block max-w-lg text-center">
<<<<<<< HEAD
        <h1 className={title({ color: "", className: "my-2" })}>
          PC 부품&nbsp;
        </h1>
=======
        <h1 className={title({ color: "", className: "my-2" })}>PC 부품&nbsp;</h1>
>>>>>>> b3e6bef92c8bec4c049baffd677c55b5eaf02613
      </div>
      <Tabs
        aria-label="Options"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
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
            key={component[`${selectedTab.toLowerCase()}_id`]}
            id={component[`${selectedTab.toLowerCase()}_id`]}
            title={component.model}
            description={component.company}
            imageUrl={component.image_url}
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

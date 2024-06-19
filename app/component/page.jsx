"use client";
import React, { useState, useEffect } from 'react';
import { ComponentAPI } from "./api";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyCard from "@/components/MyCard";
import { CircularProgress } from "@nextui-org/react";

export default function Component() {
  const [cpuComponents, setCpuComponents] = useState([]);
  const [gpuComponents, setGpuComponents] = useState([]);
  const [coolerComponents, setCoolerComponents] = useState([]);
  const [mainboardComponents, setMainboardComponents] = useState([]);
  const [memoryComponents, setMemoryComponents] = useState([]);
  const [storageComponents, setStorageComponents] = useState([]);
  const [caseComponents, setCaseComponents] = useState([]);
  const [powerComponents, setPowerComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { cpuData, gpuData, mainboardData, memoryData, storageData, powerData, coolerData, caseData } = await ComponentAPI();
        setCpuComponents(cpuData);
        setGpuComponents(gpuData);
        setMainboardComponents(mainboardData);
        setMemoryComponents(memoryData);
        setStorageComponents(storageData);
        setPowerComponents(powerData);
        setCoolerComponents(coolerData);
        setCaseComponents(caseData);
        setFilteredComponents([...cpuData, ...gpuData, ...mainboardData, ...memoryData, ...storageData, ...powerData, ...coolerData, ...caseData]); // Initially show all components
      } catch (error) {
        console.error('Error fetching components:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTab === "All") {
      setFilteredComponents([...cpuComponents, ...gpuComponents, ...mainboardComponents, ...memoryComponents, ...storageComponents, ...powerComponents, ...coolerComponents, ...caseComponents]);
    } else if (selectedTab === "CPU") {
      setFilteredComponents(cpuComponents);
    } else if (selectedTab === "GPU") {
      setFilteredComponents(gpuComponents);
    } else if (selectedTab === "MAINBOARD") {
      setFilteredComponents(mainboardComponents);
    } else if (selectedTab === "STORAGE") {
      setFilteredComponents(storageComponents);
    } else if (selectedTab === "MEMORY") {
      setFilteredComponents(memoryComponents);
    } else if (selectedTab === "CASE") {
      setFilteredComponents(caseComponents);
    } else if (selectedTab === "POWER") {
      setFilteredComponents(powerComponents);
    } else if (selectedTab === "COOLER") {
      setFilteredComponents(coolerComponents);
    }

  }, [selectedTab, cpuComponents, gpuComponents, mainboardComponents, storageComponents, memoryComponents, caseComponents, powerComponents, coolerComponents]);

  const handleTabChange = (key) => {
    setSelectedTab(key);
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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title({ color: "" })}>PC Components&nbsp;</h1>
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
        className="grid gap-x-8 gap-y-4 grid-cols-3 mt-4 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(100vh - 16rem)" }}
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
    </section>
  );
}

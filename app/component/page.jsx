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
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { cpuData, gpuData } = await ComponentAPI();
        setCpuComponents(cpuData);
        setGpuComponents(gpuData);
        setFilteredComponents([...cpuData, ...gpuData]); // Initially show all components
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
      setFilteredComponents([...cpuComponents, ...gpuComponents]);
    } else if (selectedTab === "CPU") {
      setFilteredComponents(cpuComponents);
    } else if (selectedTab === "GPU") {
      setFilteredComponents(gpuComponents);
    }
  }, [selectedTab, cpuComponents, gpuComponents]);

  const handleTabChange = (index, title) => {
    setSelectedTab(title);
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
        <h1 className={title({ color: "" })}>PC 부품&nbsp;</h1>
      </div>
      <Tabs aria-label="Options" onChange={handleTabChange}>
        <Tab title="All"></Tab>
        <Tab title="CPU"></Tab>
        <Tab title="GPU"></Tab>
        {/* 다른 탭을 추가하고 싶다면 여기에 추가 */}
      </Tabs>
      <div
        className="grid gap-x-8 gap-y-4 grid-cols-3 mt-4 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(100vh - 16rem)" }}
      >
        {filteredComponents.map((component) => (
          <MyCard
            key={component.ComponentID}
            id={component.ComponentID}
            title={component.name}
            description={component.specs}
          />
        ))}
      </div>
    </section>
  );
}

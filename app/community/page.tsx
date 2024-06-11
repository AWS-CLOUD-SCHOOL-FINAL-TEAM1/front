"use client";
import React from "react";
import { title } from "@/components/primitives";
import CommunityCard from "@/components/CommunityCard"; // Ensure the path is correct
import { CommunityCardData } from "@/data/CommunityCardData"; // Ensure the path is correct

export default function Community() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title({})}>커뮤니티&nbsp;</h1>
      </div>
      <div
        className="grid gap-x-8 gap-y-4 grid-cols-3 mt-8 overflow-y-auto hide-scrollbar"
        style={{ height: "calc(100vh - 16rem)" }}
      >
        {CommunityCardData.map((card) => (
          <CommunityCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

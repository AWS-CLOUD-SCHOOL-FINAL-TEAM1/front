"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    description: `QuickCatch는 실시간 홈쇼핑 방송과 상품 정보, 그리고 해당 상품의 인터넷 최저가를
      제공합니다. 또한, 알찬 리뷰 요약과 할인율 순위를 통해 최적의 쇼핑 환경을 제공합니다.`,
    logo: "/quick.png",
    name: "퀵 캐치",
    url: "https://quickcatch.store",
  },
  {
    description: `InterviewMaster는 AI 기술을 활용하여 구직자들의 면접 준비를 돕는
      혁신적인 서비스를 제공합니다. 개인 맞춤형 피드백과 실전 같은 모의 면접 경험을 제공하여,
      당신의 면접 실력을 한 단계 끌어올리는 데 도움을 드립니다.`,
    logo: "/interview.png",
    name: "INTERVIEW MASTER",
    url: "http://www.interviewmaster.store",
  },
  {
    description: `1인 가구를 위한 스마트 요리 비서 My Little Recipe Book! 쉽고 빠른 레시피 검색,
      인기 유튜브 요리 영상, 영양 정보, 냉장고 커스터마이징으로 유통기한 관리까지,
      마리레와 함께 혼자서도 두렵지 않은 즐거운 요리를 경험하세요!`,
    logo: "/cook.png",
    name: "마이리틀 레시피북",
    url: "https://book.mylittle.recipes",
  },
  {
    description: `약속 코스를 생각하기 힘든 적, 놀러 가고 싶은 지역의 혼잡도가 궁금한 적이 있으셨나요? PlaceHolder는 매주 업데이트되는 인기 가게들로 AI가 혼잡도를 고려한 약속 코스를
      만들어 드립니다! 원하는 지역과 테마를 선택해 코스를 자동으로 생성하고 혼잡도를
      실시간으로 확인해보세요.`,
    logo: "/place.png",
    name: "플레이스홀더",
    url: "https://placeholder-web.shop",
  },
  {
    description: `네고에 지친 당신, DAPANDA에서 최적의 중고 거래를 경험해보세요.
      경매의 재미와 다양한 물품 거래로 스트레스 없이 할 수 있는 중고거래,
      Welcome to DAPANDA!`,
    logo: "/dapanda.png",
    name: "DAPANDA",
    url: "https://awscloudschool.online",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Partners</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center mb-6">
                <Image
                  alt={partner.name}
                  className="object-contain"
                  height={150}
                  src={partner.logo}
                  width={150}
                />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">
                {partner.name}
              </h2>
              <p className="text-gray-700 text-center mb-6">
                {partner.description}
              </p>
              <div className="flex justify-center">
                <Link href={partner.url} passHref>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Visit Website
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

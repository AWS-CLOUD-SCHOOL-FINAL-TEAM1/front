import React from "react";
import { Button } from "@nextui-org/button";
import { FaBell, FaBellSlash } from "react-icons/fa"; // react-icons에서 아이콘 가져오기

// HeartButton 컴포넌트: 좋아요/알람 버튼
const HeartButton = ({ isFavorite, onClick }) => {
  // 버튼 클릭 시 호출되는 함수
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 중지 (링크 클릭 중지)
    e.stopPropagation(); // 클릭 이벤트가 부모 컴포넌트로 전파되지 않도록 중지
    console.log("HeartButton clicked:", isFavorite); // 로그 추가
    if (onClick) {
      onClick(e); // 전달된 onClick 함수 실행
    } else {
      console.error("onClick handler is not provided");
    }
  };

  return (
    <Button
      color={isFavorite ? "success" : "default"}
      auto
      ghost={!isFavorite}
      onClick={handleClick} // 클릭 이벤트 핸들러
      size="sm" // 버튼 크기 작게 설정
    >
      {isFavorite ? <FaBell /> : <FaBellSlash />} {/* 아이콘으로 변경 */}
    </Button>
  );
};

export default HeartButton;

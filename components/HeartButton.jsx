import React from "react";
import { Button } from "@nextui-org/button";

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
      css={{ position: "absolute", top: "10px", right: "10px" }}
    >
      {isFavorite ? "알람 중" : "알람 받기"}
    </Button>
  );
};

export default HeartButton;

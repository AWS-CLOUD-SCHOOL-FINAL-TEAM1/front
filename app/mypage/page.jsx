"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import MyOrderCard from "@/components/myPage/MyOrderCard";
import { getCurrentUser } from "@/auth";
import { OrderResponse } from "./api";
import Title from "@/components/Title"; // Title 컴포넌트 임포트

const Mypage = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        const userIdWithPrefix = `google_${user.userId}`;
        const data = await OrderResponse(userIdWithPrefix);
        setOrderData(data.order_data);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex  flex-col items-center justify-center h-96">
        <div className="spinner"></div>
        <style>{`
          .spinner {
            position: relative;
            width: 28.8px;
            height: 28.8px;
          }

          .spinner::before,
          .spinner::after {
            content: "";
            width: 100%;
            height: 100%;
            display: block;
            animation:
              spinner-b4c8mmlg 0.6s backwards,
              spinner-49opz7lg 1.5s 0.6s infinite ease;
            border: 7.2px solid #4244f0;
            border-radius: 50%;
            box-shadow: 0 -43.2px 0 -7.2px #4244f0;
            position: absolute;
          }

          .spinner::after {
            animation-delay: 0s, 1.5s;
          }

          @keyframes spinner-b4c8mmlg {
            from {
              box-shadow: 0 0 0 -7.2px #4244f0;
            }
          }

          @keyframes spinner-49opz7lg {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-start gap-4 py-8 md:py-10 h-full w-full">
      <Title>내 견적</Title>

      <div className="flex items-center justify-center w-full max-w-lg space-x-4">
        <Link href="/estimate">
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ml-4"
          >
            견적추가
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mt-2 overflow-y-auto hide-scrollbar">
        {orderData && orderData.length > 0 ? (
          orderData.map((order) => (
            <MyOrderCard key={order.OrderID} order={order} />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </div>
    </section>
  );
};

export default Mypage;

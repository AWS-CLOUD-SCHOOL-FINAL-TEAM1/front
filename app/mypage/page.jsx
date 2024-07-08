"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import MyOrderCard from "@/components/myPage/MyOrderCard";
import { getCurrentUser } from "@/auth";
import { OrderResponse } from "./api";
import Title from "@/components/Title"; // Title 컴포넌트 임포트

export default function Mypage() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        const userIdWithPrefix = `google_${user.userId}`;
        const data = await OrderResponse(userIdWithPrefix);
        setOrderData(data.order_data);
      }
    };

    fetchOrders();
  }, []);

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
}

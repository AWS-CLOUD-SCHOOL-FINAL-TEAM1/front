"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyOrderCard from "@/components/myPage/MyOrderCard";
import { getCurrentUser } from "@/auth";
import { OrderResponse } from "./api";

export default function Mypage() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        const userIdWithPrefix = `google_${user.userId}`;
        const data = await OrderResponse(userIdWithPrefix);
        setOrderData(data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full w-full">
      <div className="flex items-center justify-center w-full max-w-lg space-x-4">
        <h1 className={`${title({ color: "" })}`}>마이페이지&nbsp;</h1>
        <Link href="/estimate">
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ml-4"
          >
            견적추가
          </Button>
        </Link>
      </div>
      <Tabs
        aria-label="Options"
        className="w-full items-center justify-center"
        variant="bordered"
      >
        <Tab title={<Link href="/mypage#orders">내 견적</Link>}>
          <div
            id="orders"
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 overflow-y-auto w-full"
            style={{ height: "calc(100vh - 16rem)" }}
          >
            {orderData && orderData.length > 0 ? (
              orderData.map((order) => (
                <MyOrderCard key={order.OrderID} order={order} />
              ))
            ) : (
              <p className="text-center text-gray-500">No orders found</p>
            )}
          </div>
        </Tab>
        <Tab title={<Link href="/mypage/heart">관심상품</Link>}>
          <div
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 overflow-y-auto w-full"
            style={{ height: "calc(100vh - 16rem)" }}
          >
            {/* 관심상품 컨텐츠 */}
          </div>
        </Tab>
        <Tab title={<Link href="/notifications">알림내역</Link>}>
          <div className="relative flex flex-col items-center justify-center p-8 rounded-xl bg-white w-full">
            {/* 알림내역 컨텐츠 */}
          </div>
        </Tab>
      </Tabs>
    </section>
  );
}

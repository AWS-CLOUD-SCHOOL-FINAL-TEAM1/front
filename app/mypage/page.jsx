"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import MyOrderCard from "@/components/myPage/MyOrderCard";
import { getCurrentUser } from "@/auth";
import axios from "axios";

export default function Mypage() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        try {
          const orderResponse = await axios.post(
            "http://127.0.0.1:8000/get_order_list/",
            { user_id: user.userId }
          );
          setOrderData(orderResponse.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
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
      <Tabs aria-label="Options" className="w-full items-center justify-center">
        <Tab title="내 견적">
          <div
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 overflow-y-auto hide-scrollbar w-full"
            style={{ height: "calc(100vh - 16rem)" }}
          >
            {orderData.map((order) => (
              <MyOrderCard key={order.OrderID} order={order} />
            ))}
          </div>
        </Tab>
        <Tab title="관심상품" isDisabled>
          <div
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 overflow-y-auto hide-scrollbar w-full"
            style={{ height: "calc(100vh - 16rem)" }}
          ></div>
        </Tab>
        <Tab title="알림내역" isDisabled>
          <div className="relative flex flex-col items-center justify-center p-8 rounded-xl bg-white"></div>
        </Tab>
      </Tabs>
    </section>
  );
}

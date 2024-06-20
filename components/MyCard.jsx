import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { HeartIcon } from "@/components/HeartIcon.jsx";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "next/link";

const MyCard = ({ id, title, specs, componentType, price, imageUrl }) => {
  return (
    <Link href={`/component/${id}?componentType=${componentType}`} passHref>
      <Card className="py-4 cursor-pointer" style={{ width: "360px", height: "550px" }}>
        <Checkbox
          className=" transform scale-125 font-semibold ml-2"
          icon={<HeartIcon />}
        ></Checkbox>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={"https://spoidimage.s3.ap-northeast-2.amazonaws.com/test.jpeg"}
            width={160}
            height={160}
            style={{ width: "160px", height: "160px" }}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <h4 className="font-bold text-large mb-2">{title}</h4>
          <h2 className="font-bold text-large mb-2">최저가:&nbsp;₩{price}</h2>
          <Card className="mt-5 bg-white w-full">
            <CardHeader className="pb-0">
              <h2 className="font-bold text-xl">부품 상세 스펙</h2>
            </CardHeader>
            <CardBody className="pt-2">
              <p className="text-base">
                {specs.join(' / ')}
              </p>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </Link>
  );
};

export default MyCard;

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import { HeartIcon } from "@/components/HeartIcon.jsx";
import { Checkbox } from "@nextui-org/checkbox";

const MyCard = ({ id, title, description }) => {
  return (
    <Card
      className="py-4 max-w-sm md:max-w-md lg:max-w-lg"
      style={{ height: "auto" }}
    >
      <div className="relative">
        <Checkbox
          className="absolute top-2 left-2 transform scale-125 font-semibold"
          icon={<HeartIcon />}
        />
        <NextLink href={`/component/${id}`} passHref>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center cursor-pointer">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={160}
              height={160}
              style={{ width: "160px", height: "160px" }}
            />
          </CardHeader>
        </NextLink>
      </div>
      <NextLink href={`/component/${id}`} passHref>
        <CardBody className="overflow-visible py-2 items-center cursor-pointer">
          <h4 className="font-bold text-large mb-2">{title}</h4>
          <h2 className="font-bold text-large mb-2">최저가: ₩312,200</h2>
          <Card className="bg-white ">
            <CardHeader className="pb-0">
              <h2 className="font-bold text-xl">부품 상세 스펙</h2>
            </CardHeader>
            <CardBody className="pt-2">
              <p className="text-base">{description}</p>
            </CardBody>
          </Card>
        </CardBody>
      </NextLink>
    </Card>
  );
};

export default MyCard;

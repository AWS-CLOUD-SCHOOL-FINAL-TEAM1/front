import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import { HeartIcon } from '@/components/HeartIcon.jsx';
import { Checkbox } from "@nextui-org/checkbox";

const MyCard = ({ id, title, description }) => {
  const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <Card className="py-4" style={{ width: "360px", height: "460px" }}>
      <Checkbox className=" transform scale-125 font-semibold ml-2" icon={<HeartIcon />}>
      </Checkbox>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <NextLink href={`/component/${formattedTitle}`} passHref>
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://spoidimage.s3.ap-northeast-2.amazonaws.com/test.jpeg"
            width={160}
            height={160}
            style={{ width: "160px", height: "160px" }}
          />
        </NextLink>
      </CardHeader>
      <NextLink href={`/component/${formattedTitle}`} passHref>
        <CardBody className="overflow-visible py-2 items-center">
          <h4 className="font-bold text-large mb-2">{title}</h4>
          <Card>
          </Card>
          <h2 className="font-bold text-large mb-2">최저가:&nbsp;₩312,200</h2>
          <Card className="bg-white ">
            <CardHeader className="pb-0">
              <h2 className="font-bold text-xl">부품 상세 스펙</h2>
            </CardHeader>
            <CardBody className="pt-2">
              <p className="text-base">
                {description}
              </p>
            </CardBody>
          </Card>
        </CardBody>
      </NextLink>
    </Card>
  );
};

export default MyCard;

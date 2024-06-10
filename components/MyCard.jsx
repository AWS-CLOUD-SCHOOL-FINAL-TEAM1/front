import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";

const MyCard = ({ id, title, description }) => {
  return (
    <NextLink href={`/component/${id}`} passHref>
      <Card as="a" className="py-4" style={{ width: "360px", height: "560px" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={160}
            height={160}
            style={{ width: "160px", height: "160px" }}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <p className="text-tiny uppercase font-bold mt-4">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">{title}</h4>
        </CardBody>
      </Card>
    </NextLink>
  );
};

export default MyCard;

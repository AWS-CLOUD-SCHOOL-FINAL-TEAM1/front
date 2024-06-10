import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

import  ComponentTable  from "@/components/componenttable";
const MypageCard = ({id, title, description}) => {
  return (
    <NextLink href={`/mypage/${id}`} passHref>
      <Card as="a" className="py-4" style={{ width: '360px', height: '560px' }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <ComponentTable/>
        </CardBody>
      </Card>
    </NextLink>
  );
};

export default MypageCard;
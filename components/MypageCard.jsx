import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import ComponentTable from "@/components/ComponentTable";
import NextLink from "next/link";

const MypageCard = ({ id, title, description }) => {
    return (

        <Card className="py-4" style={{ width: '360px', height: '460px' }}>
            <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
                <h4 className="font-bold text-large">{title}</h4>
                <Button color="primary" variant="ghost">
                    공유하기
                </Button>
            </CardHeader>
            <NextLink href={`/mypage/${id}`} >
                <CardBody className="overflow-visible py-2 items-center">
                    <ComponentTable style={{ width: '320px', height: '320px' }} />
                </CardBody>
            </NextLink>

        </Card>
    );
};

export default MypageCard;